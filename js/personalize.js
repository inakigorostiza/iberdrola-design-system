/* ==========================================================================
   Iberdrola — hyper-personalization engine (client-side DEMO)
   Reads sessionStorage.ib_user → rewrites the home for that persona.
   Rules from iberdola_audience.md §6; surfaces from §7.2. No backend.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- i18n (es / en) ---------- */
  var STR = {
    es: {
      hi: "Hola,",
      logout: "Salir",
      why_see: "✦ ¿Por qué veo esto?",
      engine: "Motor de personalización",
      active_profile: "Perfil activo:",
      no_flags: "— sin flags —",
      supp_active: "suppression activa → sin upsell",
      sim_incident: "Simular incidencia abierta",
      switch_profile: "Cambiar de perfil",
      close_session: "Cerrar sesión",
      rule_promo: "promo_end_date − hoy ≤ 60 días",
      rule_solar: "owner && roof && >4000 kWh && consumo diurno",
      rule_ev: "ev_owner && sin servicio de recarga",
      rule_surplus: "autoconsumo && saldo Nube Solar > 0",
      rule_tariff: "forma de tarifa ≠ horario del negocio",
      rule_subsidy: "subvención elegible && votación pendiente",
      rule_re100: "RE100 && sin PPA activo",
      for_you: "Para ti,",
      recommended: "Recomendado",
      financing_3_10: "Financiación de 3 a 10 años",
      eur_month: "€/mes",
      price_changes_on: "Tu precio cambia el",
      marta_sub: "Tu promoción de bienvenida termina pronto. Sin permanencia: elige tu mejor opción y evita el salto de precio.",
      countdown: "Cuenta atrás",
      days_to_change: "días para el cambio",
      est_increase_month: "subida estimada / mes",
      rate_from: "Tu tarifa pasaría de",
      to_word: "a",
      when_promo_ends: "al terminar la promoción.",
      now: "Ahora",
      after: "Después",
      lock_price_today: "Bloquea tu precio hoy",
      estable_12: "Plan Estable · 12 meses",
      fixed_price_no_surprises: "Precio fijo garantizado, sin sorpresas.",
      lock_price: "Bloquear precio ",
      online_3: "Plan Online 3 Periodos",
      night_consume: "Consumes de noche → paga menos en horas valle.",
      see_night_savings: "Ver ahorro nocturno",
      roof_could_generate: "Tu tejado podría generar ~",
      kwh_year: " kWh/año",
      javier_sub: "Una instalación Smart Solar a medida para tu vivienda, con financiación y gestión de subvenciones incluidas.",
      simulation: "Simulación",
      est_gen_year: "generación estimada / año",
      est_savings_year: "ahorro estimado / año",
      smart_solar_turnkey: "Smart Solar, llave en mano",
      feat_survey: "Estudio, instalación y permisos gestionados",
      feat_handle_subsidies: "Tramitamos tus subvenciones",
      feat_surplus_cloud: "Excedentes en tu Nube Solar",
      simulate_install: "Simular mi instalación",
      also_for_car: "Además, para tu coche",
      charge_ev_night: "Carga tu VE por la noche y ahorra hasta un 40%",
      ev_detected: "Detectamos que tienes vehículo eléctrico. Con Plan Online y la app de Recarga Pública acumulas saldo en Mi Iberdrola.",
      activate_ev: "Activar recarga VE",
      your_panel: "Tu panel,",
      solar_cloud_realtime: "Tu Nube Solar en tiempo real",
      diego_sub: "Tu excedente solar ya vale dinero. Sigue tu generación de hoy y optimiza la carga de tu coche.",
      solar_cloud_balance: "Saldo Nube Solar",
      accrued_deducted: "acumulado este mes · se descuenta de tu factura",
      gen_today_peak: "Generación de hoy (kW) · pico a las 14:00",
      energy_optimized: "Tu energía, optimizada",
      smart_ev_charge: "Carga inteligente del VE",
      scheduled_surplus: "Programada para tus horas de excedente y valle.",
      realtime_alerts: "Alertas en tiempo real",
      notify_consume: "Te avisamos cuando conviene consumir.",
      refer_earn: "Recomienda y gana",
      invite_both_earn: "Invita a un amigo y ganáis saldo los dos.",
      open_panel: "Abrir mi panel",
      invite_friend: "Invitar a un amigo",
      for_your_business: "Para tu negocio,",
      tariff_no_match: "Tu tarifa no encaja con tus horas",
      carmen_sub: "Tu restaurante trabaja de tarde y noche, pero tu plan es plano. Ajústalo y protege tu operación.",
      hourly_consumption: "Tu consumo por hora",
      peak_hours_caption: "00h → 24h · tu pico es de 18:00 a 23:00",
      current: "Actual",
      switch_plan_noche: "Cambia a Plan Noche y protégete",
      carmen_price_desc: "Precio más bajo cuando tú produces, y 5 años de precio garantizado sin permanencia.",
      urgencias_desc: "Una avería en cámara u horno = stock perdido. Asistencia en menos de 3 h.",
      switch_to_noche: "Cambiar a Plan Noche",
      services_peace: "Servicios para tu tranquilidad",
      svc_pagos_desc: "Cobertura hasta 4.000 € si un cliente no te paga. Con MetLife.",
      svc_info_desc: "Soporte técnico para tu TPV y equipos. Sin downtime.",
      svc_smart_desc: "Gestiona tu energía y servicios desde un solo sitio.",
      for_your_community: "Para tu comunidad,",
      community_subsidy: "Podéis optar a subvención solar",
      ana_sub_pre: "Tu edificio de",
      ana_sub_post: " viviendas cumple los requisitos. Calcula el ahorro y prepara la propuesta para la junta.",
      estimate_community: "Estimación para tu comunidad",
      est_subsidy: "subvención estimada",
      savings_resident_year: "ahorro / vecino / año",
      dwellings: "viviendas",
      roof_facing: "cubierta orientación ",
      interest_charging: "¿Interés en puntos de recarga?",
      votes_yes: "18 de 30 plazas ya han votado que sí.",
      handle_turnkey: "Lo gestionamos por ti, llave en mano",
      subsidy_handle_pre: "Tramitamos la subvención (",
      feat_shared_roof: "Instalación en cubierta común",
      feat_savings_shared: "Reparto del ahorro entre vecinos",
      prepare_proposal: "Preparar propuesta para la junta",
      download_dossier: "Descargar dossier",
      proposal_for: "Propuesta para",
      ppa_scope2: "Un PPA como palanca de tu Scope 2",
      cso_sub: "Energía 100% renovable certificada, a precio estable a largo plazo. Iberdrola es líder europeo en venta de PPA a largo plazo.",
      wind_solar_proposed: "eólica + solar propuestos",
      stable_price: "precio estable",
      years: "años",
      renewable_guarantee: "renovable con garantía de origen",
      est_annual_consumption: "consumo anual estimado",
      already_trust: "Ya confían en nosotros",
      dedicated_team: "Tu equipo dedicado",
      kam_desc: "Acompañamiento humano, revisiones trimestrales (QBR) y reporting para tu memoria ESG.",
      charging_infra: "Infraestructura de recarga a gran escala",
      charging_infra_desc: "Suministro, instalación y operación de miles de puntos (caso Mercadona: hasta 3.500 puntos en 800 tiendas).",
      talk_kam: "Hablar con tu KAM",
      we_with_you: "Estamos contigo,",
      open_incident: "Tenemos una incidencia abierta",
      support_sub: "Estamos trabajando en tu caso. Aquí no hay ofertas — solo la ayuda que necesitas.",
      priority_support: "Atención prioritaria",
      incident_status: "Estado de tu incidencia",
      under_review: "En revisión · te avisaremos por la app.",
      talk_agent: "Habla con un agente",
      chat_mi_ib: "Chat en Mi Iberdrola.",
      call_now: "Llamar ahora",
      see_incident: "Ver mi incidencia"
    },
    en: {
      hi: "Hi,",
      logout: "Log out",
      why_see: "✦ Why am I seeing this?",
      engine: "Personalization engine",
      active_profile: "Active profile:",
      no_flags: "— no flags —",
      supp_active: "suppression active → no upsell",
      sim_incident: "Simulate open incident",
      switch_profile: "Switch profile",
      close_session: "Log out",
      rule_promo: "promo_end_date − today ≤ 60 days",
      rule_solar: "owner && roof && >4000 kWh && daytime consumption",
      rule_ev: "ev_owner && no charging service",
      rule_surplus: "self-consumption && Solar Cloud balance > 0",
      rule_tariff: "tariff shape ≠ business hours",
      rule_subsidy: "subsidy eligible && vote pending",
      rule_re100: "RE100 && no active PPA",
      for_you: "For you,",
      recommended: "Recommended",
      financing_3_10: "Financing from 3 to 10 years",
      eur_month: "€/month",
      price_changes_on: "Your price changes on",
      marta_sub: "Your welcome promotion ends soon. No commitment: choose your best option and avoid the price jump.",
      countdown: "Countdown",
      days_to_change: "days until the change",
      est_increase_month: "estimated increase / month",
      rate_from: "Your rate would go from",
      to_word: "to",
      when_promo_ends: "when the promotion ends.",
      now: "Now",
      after: "After",
      lock_price_today: "Lock your price today",
      estable_12: "Plan Estable · 12 months",
      fixed_price_no_surprises: "Guaranteed fixed price, no surprises.",
      lock_price: "Lock in price ",
      online_3: "Plan Online 3 Periods",
      night_consume: "You consume at night → pay less during off-peak hours.",
      see_night_savings: "See night-time savings",
      roof_could_generate: "Your roof could generate ~",
      kwh_year: " kWh/year",
      javier_sub: "A tailor-made Smart Solar installation for your home, with financing and subsidy management included.",
      simulation: "Simulation",
      est_gen_year: "estimated generation / year",
      est_savings_year: "estimated savings / year",
      smart_solar_turnkey: "Smart Solar, turnkey",
      feat_survey: "Survey, installation and permits handled",
      feat_handle_subsidies: "We handle your subsidies",
      feat_surplus_cloud: "Surplus in your Solar Cloud",
      simulate_install: "Simulate my installation",
      also_for_car: "Also, for your car",
      charge_ev_night: "Charge your EV at night and save up to 40%",
      ev_detected: "We detected you have an electric vehicle. With Plan Online and the Public Charging app you build up balance in Mi Iberdrola.",
      activate_ev: "Activate EV charging",
      your_panel: "Your dashboard,",
      solar_cloud_realtime: "Your Solar Cloud in real time",
      diego_sub: "Your solar surplus is already worth money. Track today's generation and optimize your car charging.",
      solar_cloud_balance: "Solar Cloud balance",
      accrued_deducted: "accrued this month · deducted from your bill",
      gen_today_peak: "Today's generation (kW) · peak at 14:00",
      energy_optimized: "Your energy, optimized",
      smart_ev_charge: "Smart EV charging",
      scheduled_surplus: "Scheduled for your surplus and off-peak hours.",
      realtime_alerts: "Real-time alerts",
      notify_consume: "We notify you when it's best to consume.",
      refer_earn: "Refer and earn",
      invite_both_earn: "Invite a friend and you both earn balance.",
      open_panel: "Open my dashboard",
      invite_friend: "Invite a friend",
      for_your_business: "For your business,",
      tariff_no_match: "Your tariff doesn't match your hours",
      carmen_sub: "Your restaurant runs afternoons and nights, but your plan is flat. Adjust it and protect your operation.",
      hourly_consumption: "Your hourly consumption",
      peak_hours_caption: "00h → 24h · your peak is from 18:00 to 23:00",
      current: "Current",
      switch_plan_noche: "Switch to Plan Noche and protect yourself",
      carmen_price_desc: "Lower price when you produce, and 5 years of guaranteed price with no commitment.",
      urgencias_desc: "A breakdown in a fridge or oven = lost stock. Assistance in under 3 h.",
      switch_to_noche: "Switch to Plan Noche",
      services_peace: "Services for your peace of mind",
      svc_pagos_desc: "Coverage up to 4.000 € if a client doesn't pay you. With MetLife.",
      svc_info_desc: "Technical support for your POS and devices. No downtime.",
      svc_smart_desc: "Manage your energy and services from a single place.",
      for_your_community: "For your community,",
      community_subsidy: "You may qualify for a solar subsidy",
      ana_sub_pre: "Your building of",
      ana_sub_post: " dwellings meets the requirements. Calculate the savings and prepare the proposal for the board.",
      estimate_community: "Estimate for your community",
      est_subsidy: "estimated subsidy",
      savings_resident_year: "savings / resident / year",
      dwellings: "dwellings",
      roof_facing: "roof facing ",
      interest_charging: "Interested in charging points?",
      votes_yes: "18 of 30 parking spaces have already voted yes.",
      handle_turnkey: "We handle it for you, turnkey",
      subsidy_handle_pre: "We handle the subsidy (",
      feat_shared_roof: "Installation on the shared roof",
      feat_savings_shared: "Savings shared among residents",
      prepare_proposal: "Prepare proposal for the board",
      download_dossier: "Download dossier",
      proposal_for: "Proposal for",
      ppa_scope2: "A PPA as a lever for your Scope 2",
      cso_sub: "Certified 100% renewable energy, at a stable long-term price. Iberdrola is the European leader in long-term PPA sales.",
      wind_solar_proposed: "wind + solar proposed",
      stable_price: "stable price",
      years: "years",
      renewable_guarantee: "renewable with guarantee of origin",
      est_annual_consumption: "estimated annual consumption",
      already_trust: "Already trust us",
      dedicated_team: "Your dedicated team",
      kam_desc: "Human support, quarterly business reviews (QBR) and reporting for your ESG report.",
      charging_infra: "Large-scale charging infrastructure",
      charging_infra_desc: "Supply, installation and operation of thousands of points (Mercadona case: up to 3.500 points across 800 stores).",
      talk_kam: "Talk to your KAM",
      we_with_you: "We're with you,",
      open_incident: "You have an open incident",
      support_sub: "We're working on your case. No offers here — just the help you need.",
      priority_support: "Priority support",
      incident_status: "Your incident status",
      under_review: "Under review · we'll notify you via the app.",
      talk_agent: "Talk to an agent",
      chat_mi_ib: "Chat in Mi Iberdrola.",
      call_now: "Call now",
      see_incident: "See my incident"
    }
  };
  function T(k) { var L = (window.IB_LANG === "en") ? "en" : "es"; var t = STR[L] && STR[L][k]; return (t != null) ? t : (STR.es[k] != null ? STR.es[k] : k); }
  function segLabel(p) { return (window.IB_LANG === "en" && p.segmentLabel_en) ? p.segmentLabel_en : p.segmentLabel; }

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
  function fmtDate(d) { var m = (window.IB_LANG === "en") ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] : ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]; var x = new Date(d + "T00:00:00"); return x.getDate() + " " + m[x.getMonth()]; }
  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function countUp(el, to, dec) { if (!el) return; var s = null, d = 900; function step(t) { if (!s) s = t; var p = Math.min((t - s) / d, 1); var v = p * to; el.textContent = dec ? v.toFixed(dec).replace(".", ",") : Math.round(v); if (p < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- rules engine (§6) ---------- */
  function deriveFlags(pr) {
    var f = [], c = pr.profile;
    if (c.contract && c.contract.promo_end_date && daysUntil(c.contract.promo_end_date) <= 60)
      f.push({ id: "promo_expiring_soon", rule: T("rule_promo") });
    if (c.property && c.property.ownership === "owner" && c.property.has_roof_rights && c.consumption && c.consumption.annual_kwh > 4000 && c.consumption.load_curve_shape === "day")
      f.push({ id: "solar_candidate", rule: T("rule_solar") });
    if (c.assets && c.assets.ev_owner_flag && (c.services_owned || []).indexOf("ev_charging") < 0)
      f.push({ id: "ev_charging_gap", rule: T("rule_ev") });
    if (c.assets && c.assets.self_consumption_flag && c.assets.solar_cloud_balance_eur > 0)
      f.push({ id: "solar_surplus_active", rule: T("rule_surplus") });
    if (c.firmographic && c.contract && c.contract.plan_shape && c.firmographic.opening_hours_profile &&
        !((c.contract.plan_shape === "noche" && c.firmographic.opening_hours_profile === "evening") || c.contract.plan_shape === c.firmographic.opening_hours_profile))
      f.push({ id: "tariff_shape_mismatch", rule: T("rule_tariff") });
    if (c.community && c.community.subsidy_eligible && c.community.vote_status === "pending")
      f.push({ id: "subsidy_window", rule: T("rule_subsidy") });
    if (c.sustainability && c.sustainability.esg_commitment === "RE100" && c.contract && c.contract.ppa_status !== "active")
      f.push({ id: "re100_electrify", rule: T("rule_re100") });
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
    if (window.IB_LANG === "en" && pr.hero_en) { h = Object.assign({}, pr.hero, pr.hero_en, { cta: Object.assign({}, pr.hero.cta, pr.hero_en.cta), cta2: Object.assign({}, pr.hero.cta2, pr.hero_en.cta2) }); }
    var media = $(".home-hero__media"); if (media) media.innerHTML = heroMedia(h);
    var inner = $(".home-hero__inner"); if (!inner) return;
    var flagChips = flags.length ? '<div class="px-hero-flags">' + flags.map(function (f) { return "<span>" + f.id + "</span>"; }).join("") + "</div>" : "";
    inner.innerHTML =
      '<div class="ib-stack-4" style="visibility:visible">' +
        '<span class="ib-badge ib-badge--solid">' + segLabel(pr) + " · " + T("hi") + " " + pr.name + "</span>" +
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
    span.innerHTML = '<span class="av">' + pr.initials + "</span> " + T("hi") + " " + pr.name + ' <button class="px-logout" data-px-logout>' + T("logout") + "</button>";
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
        head(T("for_you") + " " + pr.name, T("price_changes_on") + " " + fmtDate(d), T("marta_sub")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad">' +
            '<span class="px-eyebrow">' + T("countdown") + "</span>" +
            '<div class="px-cd"><div><b data-cd>' + days + '</b><small>' + T("days_to_change") + "</small></div>" +
              '<div><b>+' + '9' + ' €</b><small>' + T("est_increase_month") + "</small></div></div>" +
            '<p class="ib-body-sm ib-text-muted">' + T("rate_from") + ' <b>~0,124</b> ' + T("to_word") + ' <b>~0,155 €/kWh</b> ' + T("when_promo_ends") + "</p>" +
            '<div class="px-pricebars">' +
              '<div class="px-pb now"><span class="bv">0,124</span><i style="height:0" data-h="62"></i><span class="bl ib-caption">' + T("now") + "</span></div>" +
              '<div class="px-pb after"><span class="bv">0,155</span><i style="height:0" data-h="100"></i><span class="bl ib-caption">' + T("after") + "</span></div>" +
            "</div>" +
          "</div>" +
          '<div class="px-pad px-forest">' +
            "<h4>" + T("lock_price_today") + "</h4>" +
            '<div class="px-optiongrid" style="grid-template-columns:1fr;margin-top:var(--ib-space-4)">' +
              '<div class="px-opt px-opt--reco" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)">' +
                '<span class="ib-badge ib-badge--solid">' + T("recommended") + "</span>" +
                '<h5 style="color:#fff;margin:8px 0 4px">' + T("estable_12") + "</h5>" +
                '<p class="ib-body-sm" style="color:#e7f1ec">' + T("fixed_price_no_surprises") + "</p>" +
                '<a class="ib-btn ib-btn--on-dark" style="margin-top:10px" href="#">' + T("lock_price") + ARR + "</a></div>" +
              '<div class="px-opt" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.2)">' +
                '<h5 style="color:#fff;margin:0 0 4px">' + T("online_3") + "</h5>" +
                '<p class="ib-body-sm" style="color:#e7f1ec">' + T("night_consume") + "</p>" +
                '<a class="ib-btn ib-btn--on-dark-outline" style="margin-top:10px" href="#">' + T("see_night_savings") + "</a></div>" +
            "</div>" +
          "</div>" +
        "</div>", "px-first"
      );
    },

    javier: function (pr) {
      var kwh = pr.profile.consumption.annual_kwh;
      return sec(
        head(T("for_you") + " " + pr.name, T("roof_could_generate") + kwh.toLocaleString("es-ES") + T("kwh_year"), T("javier_sub")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest" style="display:flex;gap:var(--ib-space-5);align-items:center">' +
            ringSVG(0.72) +
            '<div><span class="px-eyebrow" style="color:var(--ib-blue-300)">' + T("simulation") + "</span>" +
              '<div class="px-metric"><b><span data-cu="' + kwh + '">0</span> kWh</b><small style="color:#d9e5de">' + T("est_gen_year") + "</small></div>" +
              '<div class="px-metric" style="margin-top:12px"><b><span data-cu="820">0</span> €</b><small style="color:#d9e5de">' + T("est_savings_year") + "</small></div>" +
            "</div>" +
          "</div>" +
          '<div class="px-pad">' +
            "<h4>" + T("smart_solar_turnkey") + "</h4>" +
            '<ul class="ib-plan__features" style="margin-top:var(--ib-space-3)">' +
              li(T("feat_survey")) + li(T("financing_3_10")) + li(T("feat_handle_subsidies")) + li(T("feat_surplus_cloud")) +
            "</ul>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">' + T("simulate_install") + "</a></div>" +
          "</div>" +
        "</div>" +
        // EV combine-signal module
        '<div class="px-panelcard px-pad" style="margin-top:var(--ib-space-5);display:flex;gap:var(--ib-space-5);align-items:center;flex-wrap:wrap">' +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17V9l2-4h8l2 4v8"/><path d="M4 17h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/></svg></span>' +
          '<div><span class="ib-badge">' + T("also_for_car") + '</span><h4 style="margin:6px 0 2px">' + T("charge_ev_night") + "</h4>" +
          '<p class="ib-body-sm ib-text-muted">' + T("ev_detected") + "</p></div></div>" +
          '<a class="ib-btn ib-btn--outline" href="#" style="margin-left:auto">' + T("activate_ev") + "</a>" +
        "</div>", "px-first"
      );
    },

    diego: function (pr) {
      var bal = pr.profile.assets.solar_cloud_balance_eur;
      return sec(
        head(T("your_panel") + " " + pr.name, T("solar_cloud_realtime"), T("diego_sub")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">' + T("solar_cloud_balance") + "</span>" +
            '<div class="px-count"><span data-cu="' + bal + '" data-dec="0">0</span> €</div>' +
            '<p class="ib-body-sm" style="color:#d9e5de">' + T("accrued_deducted") + "</p>" +
            '<div class="px-hours" style="margin-top:var(--ib-space-5)">' +
              [8,20,40,70,95,80,55,45,60,85,100,70,50,30].map(function (h, i) { return '<i data-h="' + h + '" style="height:0' + (h > 90 ? ';" class="hot' : '') + '"></i>'; }).join("") +
            "</div><p class='ib-caption' style='color:#c9ded3;margin-top:8px'>" + T("gen_today_peak") + "</p>" +
          "</div>" +
          '<div class="px-pad">' +
            "<h4>" + T("energy_optimized") + "</h4>" +
            '<div class="ib-stack-4" style="margin-top:var(--ib-space-3)">' +
              '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg></span><div><b>' + T("smart_ev_charge") + '</b><p class="ib-body-sm ib-text-muted">' + T("scheduled_surplus") + "</p></div></div>" +
              '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/></svg></span><div><b>' + T("realtime_alerts") + '</b><p class="ib-body-sm ib-text-muted">' + T("notify_consume") + "</p></div></div>" +
              '<div class="px-svc"><span class="ic">' + CHK + '</span><div><b>' + T("refer_earn") + '</b><p class="ib-body-sm ib-text-muted">' + T("invite_both_earn") + "</p></div></div>" +
            "</div>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn" href="#">' + T("open_panel") + '</a><a class="ib-btn ib-btn--ghost" href="#">' + T("invite_friend") + "</a></div>" +
          "</div>" +
        "</div>", "px-first"
      );
    },

    carmen: function (pr) {
      return sec(
        head(T("for_your_business") + " " + pr.name, T("tariff_no_match"), T("carmen_sub")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">' + T("hourly_consumption") + "</span>" +
            '<div class="px-hours" style="margin-top:var(--ib-space-3)">' +
              [10,8,6,5,5,6,10,18,22,20,18,25,30,28,25,30,45,70,90,100,95,80,55,25].map(function (h) { return '<i data-h="' + h + '"' + (h >= 70 ? ' class="hot"' : '') + ' style="height:0"></i>'; }).join("") +
            "</div><p class='ib-caption' style='color:#c9ded3;margin-top:8px'>" + T("peak_hours_caption") + "</p>" +
            '<div class="px-optiongrid" style="grid-template-columns:1fr 1fr;margin-top:var(--ib-space-5)">' +
              '<div class="px-opt" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.2)"><small style="color:#c9ded3">' + T("current") + '</small><h5 style="color:#fff;margin:2px 0">Plan Estable</h5></div>' +
              '<div class="px-opt px-opt--reco" style="background:rgba(255,255,255,.1);border-color:#fff"><small style="color:#c9ded3">' + T("recommended") + '</small><h5 style="color:#fff;margin:2px 0">Plan Noche</h5></div>' +
            "</div>" +
          "</div>" +
          '<div class="px-pad">' +
            "<h4>" + T("switch_plan_noche") + "</h4>" +
            '<p class="ib-body-sm ib-text-muted">' + T("carmen_price_desc") + "</p>" +
            '<div class="px-svc" style="margin-top:var(--ib-space-4)"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-2 1-3 2-4 0 1 1 2 2 2 0-3 1-5 1-7z"/></svg></span><div><b>Urgencias Eléctricas Negocios <span class="px-price-tag">6,95 ' + T("eur_month") + '</span></b><p class="ib-body-sm ib-text-muted">' + T("urgencias_desc") + "</p></div></div>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">' + T("switch_to_noche") + "</a></div>" +
          "</div>" +
        "</div>" +
        '<div style="margin-top:var(--ib-space-6)"><h4 style="margin-bottom:var(--ib-space-4)">' + T("services_peace") + '</h4><div class="px-cards3">' +
          svcCard("Protección de Pagos Autónomos", T("svc_pagos_desc"), "3,95 " + T("eur_month")) +
          svcCard("Asistencia Informática", T("svc_info_desc"), "2,95 " + T("eur_month")) +
          svcCard("Asistente Smart Empresas", T("svc_smart_desc"), "2,95 " + T("eur_month")) +
        "</div></div>", "px-first"
      );
    },

    ana: function (pr) {
      var c = pr.profile.community;
      return sec(
        head(T("for_your_community") + " " + pr.name, T("community_subsidy"), T("ana_sub_pre") + " " + c.num_dwellings + T("ana_sub_post")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="px-eyebrow" style="color:var(--ib-blue-300)">' + T("estimate_community") + "</span>" +
            '<div class="ib-grid" style="grid-template-columns:1fr 1fr;gap:var(--ib-space-5);margin-top:var(--ib-space-3)">' +
              '<div class="px-metric"><b><span data-cu="8600">0</span> €</b><small style="color:#d9e5de">' + T("est_subsidy") + "</small></div>" +
              '<div class="px-metric"><b><span data-cu="180">0</span> €</b><small style="color:#d9e5de">' + T("savings_resident_year") + "</small></div>" +
              '<div class="px-metric"><b><span data-cu="' + c.num_dwellings + '">0</span></b><small style="color:#d9e5de">' + T("dwellings") + "</small></div>" +
              '<div class="px-metric"><b><span data-cu="' + c.roof_area_m2 + '">0</span> m²</b><small style="color:#d9e5de">' + T("roof_facing") + c.roof_orientation + "</small></div>" +
            "</div>" +
            '<div style="margin-top:var(--ib-space-5);background:rgba(255,255,255,.08);border-radius:var(--ib-radius-md);padding:var(--ib-space-4)"><b style="color:#fff">' + T("interest_charging") + '</b><p class="ib-body-sm" style="color:#d9e5de;margin-top:4px">' + T("votes_yes") + "</p></div>" +
          "</div>" +
          '<div class="px-pad">' +
            "<h4>" + T("handle_turnkey") + "</h4>" +
            '<ul class="ib-plan__features" style="margin-top:var(--ib-space-3)">' +
              li(T("subsidy_handle_pre") + c.subsidy_zone + ")") + li(T("feat_shared_roof")) + li(T("feat_savings_shared")) + li(T("financing_3_10")) +
            "</ul>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">' + T("prepare_proposal") + '</a><a class="ib-btn ib-btn--ghost" href="#">' + T("download_dossier") + "</a></div>" +
          "</div>" +
        "</div>", "px-first"
      );
    },

    cso: function (pr) {
      var s = pr.profile.sustainability;
      return sec(
        head(T("proposal_for") + " " + pr.fullName.split(" ")[0], T("ppa_scope2"), T("cso_sub")) +
        '<div class="px-panelcard px-split">' +
          '<div class="px-pad px-forest">' +
            '<span class="ib-badge ib-badge--solid">' + s.esg_commitment + " · Scope 2 " + s.scope2_target_year + "</span>" +
            '<div class="ib-grid" style="grid-template-columns:1fr 1fr;gap:var(--ib-space-5);margin-top:var(--ib-space-4)">' +
              '<div class="px-metric"><b><span data-cu="300">0</span> MW</b><small style="color:#d9e5de">' + T("wind_solar_proposed") + "</small></div>" +
              '<div class="px-metric"><b><span data-cu="10">0</span> ' + T("years") + '</b><small style="color:#d9e5de">' + T("stable_price") + "</small></div>" +
              '<div class="px-metric"><b>100%</b><small style="color:#d9e5de">' + T("renewable_guarantee") + "</small></div>" +
              '<div class="px-metric"><b><span data-cu="450">0</span> GWh</b><small style="color:#d9e5de">' + T("est_annual_consumption") + "</small></div>" +
            "</div>" +
            '<p class="ib-caption" style="color:#c9ded3;margin-top:var(--ib-space-5)">' + T("already_trust") + "</p>" +
            '<div class="px-logos"><span>Mercadona</span><span>Microsoft</span><span>Amazon</span><span>Telefónica</span></div>' +
          "</div>" +
          '<div class="px-pad">' +
            "<h4>" + T("dedicated_team") + "</h4>" +
            '<div class="px-kam" style="margin-top:var(--ib-space-3)"><span class="av">KA</span><div><b>Key Account Manager</b><p class="ib-body-sm ib-text-muted">' + T("kam_desc") + "</p></div></div>" +
            '<div class="px-svc" style="margin-top:var(--ib-space-5)"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17V9l2-4h8l2 4v8"/><path d="M4 17h16"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/></svg></span><div><b>' + T("charging_infra") + '</b><p class="ib-body-sm ib-text-muted">' + T("charging_infra_desc") + "</p></div></div>" +
            '<div class="ib-cluster" style="margin-top:var(--ib-space-5)"><a class="ib-btn ib-btn--lg" href="#">' + T("talk_kam") + "</a></div>" +
          "</div>" +
        "</div>", "px-first"
      );
    }
  };

  /* ---------- support-first (suppression) ---------- */
  function supportModule(pr) {
    return sec(
      head(T("we_with_you") + " " + pr.name, T("open_incident"), T("support_sub")) +
      '<div class="px-panelcard px-pad px-support">' +
        '<div class="ib-grid ib-grid-3">' +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1v-4h3zM3 19a2 2 0 002 2h1v-4H3z"/></svg></span><div><b>' + T("priority_support") + '</b><p class="ib-body-sm ib-text-muted">900 225 235 · 24/7</p></div></div>' +
          '<div class="px-svc"><span class="ic">' + CHK + '</span><div><b>' + T("incident_status") + '</b><p class="ib-body-sm ib-text-muted">' + T("under_review") + "</p></div></div>" +
          '<div class="px-svc"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span><div><b>' + T("talk_agent") + '</b><p class="ib-body-sm ib-text-muted">' + T("chat_mi_ib") + "</p></div></div>" +
        "</div>" +
        '<div class="ib-cluster" style="margin-top:var(--ib-space-6)"><a class="ib-btn ib-btn--lg" href="tel:900225235">' + T("call_now") + '</a><a class="ib-btn ib-btn--outline" href="#">' + T("see_incident") + "</a></div>" +
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
    chip.className = "px-chip"; chip.innerHTML = T("why_see");
    var panel = document.createElement("div");
    panel.className = "px-panel";
    var opts = Object.keys(P).map(function (k) { return '<option value="' + k + '"' + (k === pr.key ? " selected" : "") + ">" + P[k].name + " · " + segLabel(P[k]) + "</option>"; }).join("");
    panel.innerHTML =
      "<h5>" + T("engine") + "</h5>" +
      '<p class="ib-body-sm ib-text-muted" style="margin-bottom:8px">' + T("active_profile") + " <b>" + pr.fullName + "</b> (" + segLabel(pr) + ")</p>" +
      (flags.length ? flags.map(function (f) { return '<div class="fl">' + f.id + '<br><small>' + f.rule + "</small></div>"; }).join("") : '<div class="fl">' + T("no_flags") + "</div>") +
      (suppressed ? '<div class="fl" style="background:#FDECEA;color:#7A1A12">' + T("supp_active") + "</div>" : "") +
      '<label class="ib-check" style="margin-top:12px"><input type="checkbox" data-px-supp' + (suppressed ? " checked" : "") + "> " + T("sim_incident") + "</label>" +
      '<label class="ib-label" style="margin-top:12px;display:block">' + T("switch_profile") + '</label><select class="ib-select" data-px-switch>' + opts + "</select>" +
      '<button class="ib-btn ib-btn--outline ib-btn--block" style="margin-top:12px" data-px-logout>' + T("close_session") + "</button>";
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
