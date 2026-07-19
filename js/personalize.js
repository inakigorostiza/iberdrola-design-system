/* ==========================================================================
   Iberdrola — hyper-personalization engine (client-side DEMO)
   Reads sessionStorage.ib_user → rewrites the home for that persona.
   Rules from iberdola_audience.md §6; surfaces from §7.2. No backend.
   ========================================================================== */
(function () {
  "use strict";
  var P = window.IB_PROFILES || {};
  var KEY = sessionStorage.getItem("ib_user");
  var root = document.documentElement;
  if (!KEY || !P[KEY]) { root.classList.remove("px-active"); return; }
  var profile = P[KEY];
  if (window.IB_identify) window.IB_identify(profile); // send identity + attributes to PostHog
  var SUPPRESS = sessionStorage.getItem("ib_suppress") === "1";

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function daysUntil(d) { var ms = new Date(d + "T00:00:00") - new Date(); return Math.max(0, Math.round(ms / 86400000)); }
  function fmtDate(d) { var m = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]; var x = new Date(d + "T00:00:00"); return x.getDate() + " " + m[x.getMonth()]; }
  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function countUp(el, to, dec) { if (!el) return; var s = null, d = 900; function step(t) { if (!s) s = t; var p = Math.min((t - s) / d, 1); var v = p * to; el.textContent = dec ? v.toFixed(dec).replace(".", ",") : Math.round(v); if (p < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- rules engine (§6) ---------- */
  function deriveFlags(pr) {
    var f = [], c = pr.profile;
    if (c.contract && c.contract.promo_end_date && daysUntil(c.contract.promo_end_date) <= 60)
      f.push({ id: "promo_expiring_soon", rule: "promo_end_date − hoy ≤ 60 días" });
    if (c.property && c.property.ownership === "owner" && c.property.has_roof_rights && c.consumption && c.consumption.annual_kwh > 4000 && c.consumption.load_curve_shape === "day")
      f.push({ id: "solar_candidate", rule: "owner && roof && >4000 kWh && consumo diurno" });
    if (c.assets && c.assets.ev_owner_flag && (c.services_owned || []).indexOf("ev_charging") < 0)
      f.push({ id: "ev_charging_gap", rule: "ev_owner && sin servicio de recarga" });
    if (c.assets && c.assets.self_consumption_flag && c.assets.solar_cloud_balance_eur > 0)
      f.push({ id: "solar_surplus_active", rule: "autoconsumo && saldo Nube Solar > 0" });
    if (c.firmographic && c.contract && c.contract.plan_shape && c.firmographic.opening_hours_profile &&
        !((c.contract.plan_shape === "noche" && c.firmographic.opening_hours_profile === "evening") || c.contract.plan_shape === c.firmographic.opening_hours_profile))
      f.push({ id: "tariff_shape_mismatch", rule: "forma de tarifa ≠ horario del negocio" });
    if (c.community && c.community.subsidy_eligible && c.community.vote_status === "pending")
      f.push({ id: "subsidy_window", rule: "subvención elegible && votación pendiente" });
    if (c.sustainability && c.sustainability.esg_commitment === "RE100" && c.contract && c.contract.ppa_status !== "active")
      f.push({ id: "re100_electrify", rule: "RE100 && sin PPA activo" });
    var supp = (c.engagement && (c.engagement.open_complaints > 0 || c.engagement.sentiment === "detractor")) || SUPPRESS;
    return { flags: f, suppressed: supp };
  }

  /* ---------- module CSS (injected once) ---------- */
  var CSS = "\
  html.px-active .home-hero__inner .ib-stack-4{visibility:hidden}\
  .home-hero__media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}\
  .px-kb{animation:pxkb 22s ease-in-out infinite alternate}\
  @keyframes pxkb{from{transform:scale(1.02)}to{transform:scale(1.14)}}\
  .px-eyebrow{font-size:var(--ib-text-overline);font-weight:var(--ib-weight-semibold);letter-spacing:var(--ib-tracking-overline);text-transform:uppercase;color:var(--ib-color-primary)}\
  .px-lead{display:flex;flex-direction:column;gap:var(--ib-space-3)}\
  .px-hero-flags{display:flex;flex-wrap:wrap;gap:6px;margin-top:var(--ib-space-2)}\
  .px-hero-flags span{font-size:var(--ib-text-caption);font-weight:600;color:#eafff2;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);padding:.3em .8em;border-radius:var(--ib-radius-pill)}\
  .px-panelcard{background:var(--ib-bg-surface);border:1px solid var(--ib-border);border-radius:var(--ib-radius-xl);box-shadow:var(--ib-shadow-md);overflow:hidden}\
  .px-split{display:grid;grid-template-columns:1.05fr .95fr}\
  @media(max-width:820px){.px-split{grid-template-columns:1fr}}\
  .px-pad{padding:clamp(1.5rem,1rem + 2vw,2.5rem)}\
  .px-forest{background:var(--ib-gradient-forest);color:#fff;position:relative;overflow:hidden}\
  .px-forest :is(h2,h3,h4){color:#fff}\
  .px-forest::after{content:'';position:absolute;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(13,169,255,.4),transparent 70%);top:-80px;right:-60px}\
  .px-forest > *{position:relative;z-index:1}\
  .px-count{font-size:clamp(2.4rem,1.6rem + 3vw,3.6rem);font-weight:var(--ib-weight-bold);line-height:1;letter-spacing:var(--ib-tracking-tight)}\
  .px-cd{display:flex;gap:var(--ib-space-4);margin:var(--ib-space-2) 0}\
  .px-cd b{font-size:clamp(2.2rem,1.5rem + 2.5vw,3.2rem);font-weight:var(--ib-weight-bold);line-height:1;color:var(--ib-color-accent)}\
  .px-cd small{display:block;font-size:var(--ib-text-caption);color:var(--ib-text-muted)}\
  .px-pricebars{display:flex;gap:var(--ib-space-4);align-items:flex-end;height:130px;margin-top:var(--ib-space-3)}\
  .px-pb{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:100%}\
  .px-pb i{width:100%;max-width:70px;border-radius:8px 8px 0 0;transition:height .8s var(--ib-ease-standard)}\
  .px-pb.now i{background:var(--ib-neutral-300)}\
  .px-pb.after i{background:linear-gradient(180deg,#FFC170,#FF9C1A)}\
  .px-optiongrid{display:grid;grid-template-columns:1fr 1fr;gap:var(--ib-space-4);margin-top:var(--ib-space-5)}\
  @media(max-width:640px){.px-optiongrid{grid-template-columns:1fr}}\
  .px-opt{border:1.5px solid var(--ib-border);border-radius:var(--ib-radius-lg);padding:var(--ib-space-5);transition:var(--ib-transition-base)}\
  .px-opt:hover{border-color:var(--ib-color-primary);box-shadow:var(--ib-shadow-sm);transform:translateY(-3px)}\
  .px-opt--reco{border-color:var(--ib-color-primary);background:var(--ib-green-50)}\
  .px-ring{width:150px;height:150px;flex-shrink:0}\
  .px-ring circle.v{stroke-dasharray:427;stroke-dashoffset:427;animation:pxring 1.6s var(--ib-ease-standard) .3s forwards}\
  @keyframes pxring{to{stroke-dashoffset:var(--pxoff,120)}}\
  .px-hours{display:flex;gap:3px;align-items:flex-end;height:110px;margin-top:var(--ib-space-3)}\
  .px-hours i{flex:1;background:rgba(255,255,255,.25);border-radius:3px 3px 0 0;transition:height .7s var(--ib-ease-standard)}\
  .px-hours i.hot{background:linear-gradient(180deg,#FFC170,#FF9C1A)}\
  .px-metric{display:flex;flex-direction:column;gap:2px}\
  .px-metric b{font-size:var(--ib-text-h3);color:var(--ib-color-primary);line-height:1}\
  .px-forest .px-metric b{color:#fff}\
  .px-cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--ib-space-4)}\
  @media(max-width:820px){.px-cards3{grid-template-columns:1fr}}\
  .px-svc{display:flex;gap:var(--ib-space-3);align-items:flex-start}\
  .px-svc .ic{width:44px;height:44px;border-radius:var(--ib-radius-md);background:var(--ib-green-50);color:var(--ib-color-primary);display:grid;place-items:center;flex-shrink:0}\
  .px-svc .ic svg{width:22px;height:22px}\
  .px-price-tag{font-weight:var(--ib-weight-bold);color:var(--ib-color-primary)}\
  .px-logos{display:flex;flex-wrap:wrap;gap:var(--ib-space-3);align-items:center}\
  .px-logos span{font-weight:var(--ib-weight-bold);color:#fff;opacity:.85;font-size:var(--ib-text-body-lg)}\
  .px-kam{display:flex;gap:var(--ib-space-4);align-items:center;background:var(--ib-bg-surface);border-radius:var(--ib-radius-lg);padding:var(--ib-space-4)}\
  .px-kam .av{width:56px;height:56px;border-radius:50%;background:var(--ib-gradient-tricolor);display:grid;place-items:center;color:#fff;font-weight:700;flex-shrink:0}\
  .px-account{display:inline-flex;align-items:center;gap:8px;font-weight:var(--ib-weight-medium);color:var(--ib-color-primary)}\
  .px-account .av{width:26px;height:26px;border-radius:50%;background:var(--ib-color-primary);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:700}\
  .px-logout{border:none;background:none;color:var(--ib-text-muted);cursor:pointer;font:inherit;font-size:var(--ib-text-body-sm);text-decoration:underline;text-underline-offset:3px}\
  .px-chip{position:fixed;left:16px;bottom:16px;z-index:var(--ib-z-toast);display:inline-flex;align-items:center;gap:8px;background:var(--ib-neutral-900);color:#fff;border:none;border-radius:var(--ib-radius-pill);padding:.7em 1.1em;font:inherit;font-size:var(--ib-text-body-sm);font-weight:600;cursor:pointer;box-shadow:var(--ib-shadow-lg)}\
  .px-panel{position:fixed;left:16px;bottom:70px;z-index:var(--ib-z-toast);width:320px;max-width:calc(100vw - 32px);background:var(--ib-bg-surface);border:1px solid var(--ib-border);border-radius:var(--ib-radius-lg);box-shadow:var(--ib-shadow-lg);padding:var(--ib-space-5);display:none}\
  .px-panel.open{display:block}\
  .px-panel h5{margin-bottom:var(--ib-space-2)}\
  .px-panel .fl{font-family:var(--ib-font-mono);font-size:.72rem;background:var(--ib-green-50);color:var(--ib-green-900);border-radius:8px;padding:6px 8px;margin-bottom:4px}\
  .px-panel .fl small{color:var(--ib-neutral-500);font-family:var(--ib-font-brand)}\
  .px-panel select{width:100%;margin-top:6px}\
  .px-support{background:var(--ib-tint-sky)}\
  ";

  function injectCSS() { var s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); }

  /* ---------- hero ---------- */
  function heroMedia(h) {
    if (h.media.type === "video")
      return '<video autoplay muted loop playsinline poster="' + h.media.poster + '"><source src="' + h.media.src + '" type="video/mp4"><img src="' + h.media.poster + '" alt=""></video>';
    return '<img class="' + (h.media.kenburns ? "px-kb" : "") + '" src="' + h.media.src + '" alt="">';
  }
  function renderHero(pr, flags) {
    var h = pr.hero;
    var media = $(".home-hero__media"); if (media) media.innerHTML = heroMedia(h);
    var inner = $(".home-hero__inner"); if (!inner) return;
    var flagChips = flags.length ? '<div class="px-hero-flags">' + flags.map(function (f) { return "<span>" + f.id + "</span>"; }).join("") + "</div>" : "";
    inner.innerHTML =
      '<div class="ib-stack-4" style="visibility:visible">' +
        '<span class="ib-badge ib-badge--solid">' + (pr.segmentLabel) + " · Hola, " + pr.name + "</span>" +
        "<h1>" + h.headline + "</h1>" +
        '<p class="ib-lead">' + h.sub + "</p>" +
        '<div class="ib-cluster">' +
          '<a class="ib-btn ib-btn--on-dark ib-btn--lg" href="' + h.cta.href + '">' + h.cta.label + "</a>" +
          (h.cta2 ? '<a class="ib-btn ib-btn--on-dark-outline ib-btn--lg" href="' + h.cta2.href + '">' + h.cta2.label + "</a>" : "") +
        "</div>" + flagChips +
      "</div>";
  }

  /* ---------- nav ---------- */
  function renderNav(pr) {
    var acc = $("#ib-account"); if (!acc) return;
    var span = document.createElement("span");
    span.className = "px-account";
    span.innerHTML = '<span class="av">' + pr.initials + "</span> Hola, " + pr.name + ' <button class="px-logout" data-px-logout>Salir</button>';
    acc.replaceWith(span);
  }

  /* ---------- section visibility ---------- */
  function applySections(pr) {
    var hideBySeg = {
      negocios: ["#promo", "#planes", "#tarjeta", "#mi-iberdrola"],
      comunidades: ["#promo", "#planes", "#tarjeta", "#mi-iberdrola", "#blog"],
      empresas: ["#promo", "#planes", "#tarjeta", "#mi-iberdrola", "#blog", "#app"]
    };
    (hideBySeg[pr.segment] || []).forEach(function (sel) { var el = $(sel); if (el) el.style.display = "none"; });
    // tariff explorer default plan (hogares)
    if (pr.segment === "hogares") {
      setTimeout(function () { var t = document.querySelectorAll(".planx__tab"); if (t[pr.tariffDefault]) t[pr.tariffDefault].click(); }, 60);
    }
  }

  /* ---------- bespoke "Para ti" modules ---------- */
  var M = {
    marta: function (pr) {
      var d = pr.profile.contract.promo_end_date, days = daysUntil(d);
      return sec(
        head("Para ti, " + pr.name, "Tu precio cambia el " + fmtDate(d), "Tu promoción de bienvenida termina pronto. Sin permanencia: elige tu mejor opción y evita el salto de precio.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad">' +
            '<span class="px-eyebrow">Cuenta atrás</span>' +
            '<div class="px-cd"><div><b data-cd>' + days + '</b><small>días para el cambio</small></div>' +
              '<div><b>+' + '9' + ' €</b><small>subida estimada / mes</small></div></div>' +
            '<p class="ib-body-sm ib-text-muted">Tu tarifa pasaría de <b>~0,124</b> a <b>~0,155 €/kWh</b> al terminar la promoción.</p>' +
            '<div class="px-pricebars">' +
              '<div class="px-pb now"><span class="bv">0,124</span><i style="height:0" data-h="62"></i><span class="bl ib-caption">Ahora</span></div>' +
              '<div class="px-pb after"><span class="bv">0,155</span><i style="height:0" data-h="100"></i><span class="bl ib-caption">Después</span></div>' +
            "</div>" +
          "</div>" +
          '<div class="px-pad px-forest">' +
            "<h4>Bloquea tu precio hoy</h4>" +
            '<div class="px-optiongrid" style="grid-template-columns:1fr;margin-top:var(--ib-space-4)">' +
              '<div class="px-opt px-opt--reco" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)">' +
                '<span class="ib-badge ib-badge--solid">Recomendado</span>' +
                '<h5 style="color:#fff;margin:8px 0 4px">Plan Estable · 12 meses</h5>' +
                '<p class="ib-body-sm" style="color:#e7f1ec">Precio fijo garantizado, sin sorpresas.</p>' +
                '<a class="ib-btn ib-btn--on-dark" style="margin-top:10px" href="#">Bloquear precio ' + ARR + "</a></div>" +
              '<div class="px-opt" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.2)">' +
                '<h5 style="color:#fff;margin:0 0 4px">Plan Online 3 Periodos</h5>' +
                '<p class="ib-body-sm" style="color:#e7f1ec">Consumes de noche → paga menos en horas valle.</p>' +
                '<a class="ib-btn ib-btn--on-dark-outline" style="margin-top:10px" href="#">Ver ahorro nocturno</a></div>' +
            "</div>" +
          "</div>" +
        "</div>", "px-first"
      );
    },

    javier: function (pr) {
      var kwh = pr.profile.consumption.annual_kwh;
      return sec(
        head("Para ti, " + pr.name, "Tu tejado podría generar ~" + kwh.toLocaleString("es-ES") + " kWh/año", "Una instalación Smart Solar a medida para tu vivienda, con financiación y gestión de subvenciones incluidas.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest" style="display:flex;gap:var(--ib-space-5);align-items:center">' +
            ringSVG(0.72) +
            '<div><span class="px-eyebrow" style="color:var(--ib-blue-300)">Simulación</span>' +
              '<div class="px-metric"><b><span data-cu="' + kwh + '">0</span> kWh</b><small style="color:#d9e5de">generación estimada / año</small></div>' +
              '<div class="px-metric" style="margin-top:12px"><b><span data-cu="820">0</span> €</b><small style="color:#d9e5de">ahorro estimado / año</small></div>' +
            "</div>" +
          "</div>" +
          '<div class="px-pad">' +
            '<h4>Smart Solar, llave en mano</h4>' +
            '<ul class="ib-plan__features" style="margin-top:var(--ib-space-3)">' +
              li("Estudio, instalación y permisos gestionados") + li("Financiación de 3 a 10 años") + li("Tramitamos tus subvenciones") + li("Excedentes en tu Nube Solar") +
            "</ul>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">Simular mi instalación</a></div>' +
          "</div>" +
        "</div>" +
        // EV combine-signal module
        '<div class="px-panelcard px-pad" style="margin-top:var(--ib-space-5);display:flex;gap:var(--ib-space-5);align-items:center;flex-wrap:wrap">' +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17V9l2-4h8l2 4v8"/><path d="M4 17h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/></svg></span>' +
          '<div><span class="ib-badge">Además, para tu coche</span><h4 style="margin:6px 0 2px">Carga tu VE por la noche y ahorra hasta un 40%</h4>' +
          '<p class="ib-body-sm ib-text-muted">Detectamos que tienes vehículo eléctrico. Con Plan Online y la app de Recarga Pública acumulas saldo en Mi Iberdrola.</p></div></div>' +
          '<a class="ib-btn ib-btn--outline" href="#" style="margin-left:auto">Activar recarga VE</a>' +
        "</div>", "px-first"
      );
    },

    diego: function (pr) {
      var bal = pr.profile.assets.solar_cloud_balance_eur;
      return sec(
        head("Tu panel, " + pr.name, "Tu Nube Solar en tiempo real", "Tu excedente solar ya vale dinero. Sigue tu generación de hoy y optimiza la carga de tu coche.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">Saldo Nube Solar</span>' +
            '<div class="px-count"><span data-cu="' + bal + '" data-dec="0">0</span> €</div>' +
            '<p class="ib-body-sm" style="color:#d9e5de">acumulado este mes · se descuenta de tu factura</p>' +
            '<div class="px-hours" style="margin-top:var(--ib-space-5)">' +
              [8,20,40,70,95,80,55,45,60,85,100,70,50,30].map(function (h, i) { return '<i data-h="' + h + '" style="height:0' + (h > 90 ? ';" class="hot' : '') + '"></i>'; }).join("") +
            "</div><p class='ib-caption' style='color:#c9ded3;margin-top:8px'>Generación de hoy (kW) · pico a las 14:00</p>" +
          "</div>" +
          '<div class="px-pad">' +
            '<h4>Tu energía, optimizada</h4>' +
            '<div class="ib-stack-4" style="margin-top:var(--ib-space-3)">' +
              '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg></span><div><b>Carga inteligente del VE</b><p class="ib-body-sm ib-text-muted">Programada para tus horas de excedente y valle.</p></div></div>' +
              '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/></svg></span><div><b>Alertas en tiempo real</b><p class="ib-body-sm ib-text-muted">Te avisamos cuando conviene consumir.</p></div></div>' +
              '<div class="px-svc"><span class="ic">' + CHK + '</span><div><b>Recomienda y gana</b><p class="ib-body-sm ib-text-muted">Invita a un amigo y ganáis saldo los dos.</p></div></div>' +
            "</div>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn" href="#">Abrir mi panel</a><a class="ib-btn ib-btn--ghost" href="#">Invitar a un amigo</a></div>' +
          "</div>" +
        "</div>", "px-first"
      );
    },

    carmen: function (pr) {
      return sec(
        head("Para tu negocio, " + pr.name, "Tu tarifa no encaja con tus horas", "Tu restaurante trabaja de tarde y noche, pero tu plan es plano. Ajústalo y protege tu operación.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">Tu consumo por hora</span>' +
            '<div class="px-hours" style="margin-top:var(--ib-space-3)">' +
              [10,8,6,5,5,6,10,18,22,20,18,25,30,28,25,30,45,70,90,100,95,80,55,25].map(function (h) { return '<i data-h="' + h + '"' + (h >= 70 ? ' class="hot"' : '') + ' style="height:0"></i>'; }).join("") +
            "</div><p class='ib-caption' style='color:#c9ded3;margin-top:8px'>00h → 24h · tu pico es de 18:00 a 23:00</p>" +
            '<div class="px-optiongrid" style="grid-template-columns:1fr 1fr;margin-top:var(--ib-space-5)">' +
              '<div class="px-opt" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.2)"><small style="color:#c9ded3">Actual</small><h5 style="color:#fff;margin:2px 0">Plan Estable</h5></div>' +
              '<div class="px-opt px-opt--reco" style="background:rgba(255,255,255,.1);border-color:#fff"><small style="color:#c9ded3">Recomendado</small><h5 style="color:#fff;margin:2px 0">Plan Noche</h5></div>' +
            "</div>" +
          "</div>" +
          '<div class="px-pad">' +
            '<h4>Cambia a Plan Noche y protégete</h4>' +
            '<p class="ib-body-sm ib-text-muted">Precio más bajo cuando tú produces, y 5 años de precio garantizado sin permanencia.</p>' +
            '<div class="px-svc" style="margin-top:var(--ib-space-4)"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-2 1-3 2-4 0 1 1 2 2 2 0-3 1-5 1-7z"/></svg></span><div><b>Urgencias Eléctricas Negocios <span class="px-price-tag">6,95 €/mes</span></b><p class="ib-body-sm ib-text-muted">Una avería en cámara u horno = stock perdido. Asistencia en menos de 3 h.</p></div></div>' +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">Cambiar a Plan Noche</a></div>' +
          "</div>" +
        "</div>" +
        '<div style="margin-top:var(--ib-space-6)"><h4 style="margin-bottom:var(--ib-space-4)">Servicios para tu tranquilidad</h4><div class="px-cards3">' +
          svcCard("Protección de Pagos Autónomos", "Cobertura hasta 4.000 € si un cliente no te paga. Con MetLife.", "3,95 €/mes") +
          svcCard("Asistencia Informática", "Soporte técnico para tu TPV y equipos. Sin downtime.", "2,95 €/mes") +
          svcCard("Asistente Smart Empresas", "Gestiona tu energía y servicios desde un solo sitio.", "2,95 €/mes") +
        "</div></div>", "px-first"
      );
    },

    ana: function (pr) {
      var c = pr.profile.community;
      return sec(
        head("Para tu comunidad, " + pr.name, "Podéis optar a subvención solar", "Tu edificio de " + c.num_dwellings + " viviendas cumple los requisitos. Calcula el ahorro y prepara la propuesta para la junta.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">Estimación para tu comunidad</span>' +
            '<div class="ib-grid" style="grid-template-columns:1fr 1fr;gap:var(--ib-space-5);margin-top:var(--ib-space-3)">' +
              '<div class="px-metric"><b><span data-cu="8600">0</span> €</b><small style="color:#d9e5de">subvención estimada</small></div>' +
              '<div class="px-metric"><b><span data-cu="180">0</span> €</b><small style="color:#d9e5de">ahorro / vecino / año</small></div>' +
              '<div class="px-metric"><b><span data-cu="' + c.num_dwellings + '">0</span></b><small style="color:#d9e5de">viviendas</small></div>' +
              '<div class="px-metric"><b><span data-cu="' + c.roof_area_m2 + '">0</span> m²</b><small style="color:#d9e5de">cubierta orientación ' + c.roof_orientation + '</small></div>' +
            "</div>" +
            '<div style="margin-top:var(--ib-space-5);background:rgba(255,255,255,.08);border-radius:var(--ib-radius-md);padding:var(--ib-space-4)"><b style="color:#fff">¿Interés en puntos de recarga?</b><p class="ib-body-sm" style="color:#d9e5de;margin-top:4px">18 de 30 plazas ya han votado que sí.</p></div>' +
          "</div>" +
          '<div class="px-pad">' +
            '<h4>Lo gestionamos por ti, llave en mano</h4>' +
            '<ul class="ib-plan__features" style="margin-top:var(--ib-space-3)">' +
              li("Tramitamos la subvención (" + c.subsidy_zone + ")") + li("Instalación en cubierta común") + li("Reparto del ahorro entre vecinos") + li("Financiación de 3 a 10 años") +
            "</ul>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">Preparar propuesta para la junta</a><a class="ib-btn ib-btn--ghost" href="#">Descargar dossier</a></div>' +
          "</div>" +
        "</div>", "px-first"
      );
    },

    cso: function (pr) {
      var s = pr.profile.sustainability;
      return sec(
        head("Propuesta para " + pr.fullName.split(" ")[0], "Un PPA como palanca de tu Scope 2", "Energía 100% renovable certificada, a precio estable a largo plazo. Iberdrola es líder europeo en venta de PPA a largo plazo.") +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="ib-badge ib-badge--solid">' + s.esg_commitment + " · Scope 2 " + s.scope2_target_year + "</span>" +
            '<div class="ib-grid" style="grid-template-columns:1fr 1fr;gap:var(--ib-space-5);margin-top:var(--ib-space-4)">' +
              '<div class="px-metric"><b><span data-cu="300">0</span> MW</b><small style="color:#d9e5de">eólica + solar propuestos</small></div>' +
              '<div class="px-metric"><b><span data-cu="10">0</span> años</b><small style="color:#d9e5de">precio estable</small></div>' +
              '<div class="px-metric"><b>100%</b><small style="color:#d9e5de">renovable con garantía de origen</small></div>' +
              '<div class="px-metric"><b><span data-cu="450">0</span> GWh</b><small style="color:#d9e5de">consumo anual estimado</small></div>' +
            "</div>" +
            '<p class="ib-caption" style="color:#c9ded3;margin-top:var(--ib-space-5)">Ya confían en nosotros</p>' +
            '<div class="px-logos"><span>Mercadona</span><span>Microsoft</span><span>Amazon</span><span>Telefónica</span></div>' +
          "</div>" +
          '<div class="px-pad">' +
            '<h4>Tu equipo dedicado</h4>' +
            '<div class="px-kam" style="margin-top:var(--ib-space-3)"><span class="av">KA</span><div><b>Key Account Manager</b><p class="ib-body-sm ib-text-muted">Acompañamiento humano, revisiones trimestrales (QBR) y reporting para tu memoria ESG.</p></div></div>' +
            '<div class="px-svc" style="margin-top:var(--ib-space-5)"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17V9l2-4h8l2 4v8"/><path d="M4 17h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/></svg></span><div><b>Infraestructura de recarga a gran escala</b><p class="ib-body-sm ib-text-muted">Suministro, instalación y operación de miles de puntos (caso Mercadona: hasta 3.500 puntos en 800 tiendas).</p></div></div>' +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">Hablar con tu KAM</a></div>' +
          "</div>" +
        "</div>", "px-first"
      );
    }
  };

  /* ---------- support-first (suppression) ---------- */
  function supportModule(pr) {
    return sec(
      head("Estamos contigo, " + pr.name, "Tenemos una incidencia abierta", "Estamos trabajando en tu caso. Aquí no hay ofertas — solo la ayuda que necesitas.") +
      '<div class="px-panelcard px-pad px-support">' +
        '<div class="ib-grid ib-grid-3">' +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1v-4h3zM3 19a2 2 0 002 2h1v-4H3z"/></svg></span><div><b>Atención prioritaria</b><p class="ib-body-sm ib-text-muted">900 225 235 · 24/7</p></div></div>' +
          '<div class="px-svc"><span class="ic">' + CHK + '</span><div><b>Estado de tu incidencia</b><p class="ib-body-sm ib-text-muted">En revisión · te avisaremos por la app.</p></div></div>' +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span><div><b>Habla con un agente</b><p class="ib-body-sm ib-text-muted">Chat en Mi Iberdrola.</p></div></div>' +
        "</div>" +
        '<div class="ib-cluster" style="margin-top:var(--ib-space-6)"><a class="ib-btn ib-btn--lg" href="tel:900225235">Llamar ahora</a><a class="ib-btn ib-btn--outline" href="#">Ver mi incidencia</a></div>' +
      "</div>", "px-first"
    );
  }

  /* ---------- small builders ---------- */
  function sec(inner, cls) { return '<section class="ib-section ' + (cls || "") + '"><div class="ib-container">' + inner + "</div></section>"; }
  function head(eyebrow, h2, sub) { return '<div class="ib-section-head" style="text-align:left;max-width:60ch;margin-inline:0"><span class="ib-overline">' + eyebrow + "</span><h2>" + h2 + "</h2>" + (sub ? '<p class="ib-text-muted">' + sub + "</p>" : "") + "</div>"; }
  function li(t) { return "<li>" + CHK + " " + t + "</li>"; }
  function svcCard(title, desc, price) { return '<div class="ib-card"><div class="px-svc"><span class="ic">' + CHK + '</span><div><b>' + title + "</b><p class='ib-body-sm ib-text-muted' style='margin:4px 0 6px'>" + desc + '</p><span class="px-price-tag">' + price + "</span></div></div></div>"; }
  function ringSVG(pct) {
    var off = 427 - 427 * pct;
    return '<svg class="px-ring" viewBox="0 0 160 160" style="--pxoff:' + off + '"><circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="12"/><circle class="v" cx="80" cy="80" r="68" fill="none" stroke="url(#pxg)" stroke-width="12" stroke-linecap="round" transform="rotate(-90 80 80)"/><text x="80" y="88" text-anchor="middle" font-size="30" fill="#fff" font-weight="700">' + Math.round(pct * 100) + '%</text><defs><linearGradient id="pxg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fd08a"/><stop offset="1" stop-color="#0DA9FF"/></linearGradient></defs></svg>';
  }

  /* ---------- animations after mount ---------- */
  function animate(slot) {
    slot.querySelectorAll("[data-cu]").forEach(function (el) { countUp(el, +el.getAttribute("data-cu"), el.hasAttribute("data-dec") ? 0 : 0); });
    var grow = function () { slot.querySelectorAll("[data-h]").forEach(function (el) { el.style.height = el.getAttribute("data-h") + "%"; }); };
    if (reduce) grow(); else requestAnimationFrame(function () { requestAnimationFrame(grow); });
  }

  /* ---------- debug chip ---------- */
  function debugChip(pr, flags, suppressed) {
    var chip = document.createElement("button");
    chip.className = "px-chip"; chip.innerHTML = "✦ ¿Por qué veo esto?";
    var panel = document.createElement("div");
    panel.className = "px-panel";
    var opts = Object.keys(P).map(function (k) { return '<option value="' + k + '"' + (k === pr.key ? " selected" : "") + ">" + P[k].name + " · " + P[k].segmentLabel + "</option>"; }).join("");
    panel.innerHTML =
      "<h5>Motor de personalización</h5>" +
      '<p class="ib-body-sm ib-text-muted" style="margin-bottom:8px">Perfil activo: <b>' + pr.fullName + "</b> (" + pr.segmentLabel + ")</p>" +
      (flags.length ? flags.map(function (f) { return '<div class="fl">' + f.id + '<br><small>' + f.rule + "</small></div>"; }).join("") : '<div class="fl">— sin flags —</div>') +
      (suppressed ? '<div class="fl" style="background:#FDECEA;color:#7A1A12">suppression activa → sin upsell</div>' : "") +
      '<label class="ib-check" style="margin-top:12px"><input type="checkbox" data-px-supp' + (suppressed ? " checked" : "") + "> Simular incidencia abierta</label>" +
      '<label class="ib-label" style="margin-top:12px;display:block">Cambiar de perfil</label><select class="ib-select" data-px-switch>' + opts + "</select>" +
      '<button class="ib-btn ib-btn--outline ib-btn--block" style="margin-top:12px" data-px-logout>Cerrar sesión</button>';
    document.body.appendChild(chip); document.body.appendChild(panel);
    chip.addEventListener("click", function () { panel.classList.toggle("open"); });
    panel.querySelector("[data-px-switch]").addEventListener("change", function (e) { sessionStorage.setItem("ib_user", e.target.value); location.reload(); });
    panel.querySelector("[data-px-supp]").addEventListener("change", function (e) { sessionStorage.setItem("ib_suppress", e.target.checked ? "1" : "0"); location.reload(); });
  }

  /* ---------- logout (delegated) ---------- */
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-px-logout]")) { e.preventDefault(); sessionStorage.removeItem("ib_user"); sessionStorage.removeItem("ib_suppress"); if (window.posthog) window.posthog.reset(); location.reload(); }
  });

  /* ---------- run ---------- */
  function run() {
    injectCSS();
    root.classList.add("px-active");
    var res = deriveFlags(profile);
    renderNav(profile);
    renderHero(profile, res.flags);
    applySections(profile);
    var slot = $("#px-slot");
    if (slot) {
      slot.innerHTML = res.suppressed ? supportModule(profile) : (M[profile.key] ? M[profile.key](profile) : "");
      animate(slot);
    }
    debugChip(profile, res.flags, res.suppressed);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
