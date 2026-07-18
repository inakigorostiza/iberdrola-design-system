/* ==========================================================================
   Iberdrola — "Aura" assistant (client-side retrieval chatbot)
   Grounded in window.IB_KB. Persona-aware via sessionStorage.ib_user + IB_PROFILES.
   No backend: answer(query, ctx) is the seam an LLM/RAG could later replace.
   ========================================================================== */
(function () {
  "use strict";
  var KB = window.IB_KB;
  if (!KB) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- persona context ---------- */
  function ctx() {
    var key = null; try { key = sessionStorage.getItem("ib_user"); } catch (e) {}
    var p = key && window.IB_PROFILES ? window.IB_PROFILES[key] : null;
    return p ? { key: p.key, name: p.name, segment: p.segment, segmentLabel: p.segmentLabel } : { key: null, name: null, segment: null, segmentLabel: null };
  }
  var convo = []; // running conversation history for the LLM

  /* ---------- retrieval engine ---------- */
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim(); }
  var STOP = { "de": 1, "la": 1, "el": 1, "los": 1, "las": 1, "un": 1, "una": 1, "y": 1, "o": 1, "que": 1, "es": 1, "mi": 1, "me": 1, "por": 1, "para": 1, "con": 1, "en": 1, "a": 1, "cual": 1, "como": 1, "cuanto": 1, "tengo": 1, "hay": 1, "del": 1, "al": 1, "tu": 1, "su": 1 };
  function toks(s) { return norm(s).split(" ").filter(function (t) { return t.length > 2 && !STOP[t]; }); }

  function answer(query, c) {
    var nq = norm(query), qt = toks(query);
    var best = null, bestScore = 0;
    KB.entries.forEach(function (e) {
      var score = 0;
      e.q.forEach(function (phrase) {
        var np = norm(phrase);
        if (np && nq.indexOf(np) >= 0) score += 6 + np.length / 8;          // phrase contained
        var pt = toks(phrase), overlap = 0;
        pt.forEach(function (t) { if (qt.indexOf(t) >= 0) overlap++; });
        if (pt.length) score += (overlap / pt.length) * 3 + overlap * 0.6;   // token overlap
      });
      if (c && c.segment && e.tags && e.tags.indexOf(c.segment) >= 0) score += 1.2; // segment boost
      if (score > bestScore) { bestScore = score; best = e; }
    });
    if (!best || bestScore < 2.2) return { fallback: true };
    return { entry: best };
  }

  /* ---------- CSS ---------- */
  var CSS = "\
  .aura-fab{position:fixed;right:20px;bottom:20px;z-index:var(--ib-z-sticky);display:inline-flex;align-items:center;gap:10px;\
    background:var(--ib-color-primary);color:#fff;border:none;border-radius:var(--ib-radius-pill);padding:.85em 1.25em;font:inherit;\
    font-weight:var(--ib-weight-semibold);cursor:pointer;box-shadow:var(--ib-shadow-lg);transition:var(--ib-transition-base)}\
  .aura-fab:hover{background:var(--ib-color-primary-hover);transform:translateY(-2px)}\
  .aura-fab svg{width:22px;height:22px}\
  .aura-fab .dot{position:absolute;top:-3px;right:-3px;width:12px;height:12px;border-radius:50%;background:var(--ib-orange-500);border:2px solid #fff}\
  .aura-panel{position:fixed;right:20px;bottom:20px;z-index:var(--ib-z-modal);width:390px;max-width:calc(100vw - 32px);height:640px;max-height:calc(100vh - 40px);\
    background:var(--ib-bg-surface);border-radius:var(--ib-radius-xl);box-shadow:var(--ib-shadow-lg);display:none;flex-direction:column;overflow:hidden;border:1px solid var(--ib-border)}\
  .aura-panel.open{display:flex;animation:auraIn .32s var(--ib-ease-decelerate)}\
  @keyframes auraIn{from{opacity:0;transform:translateY(24px) scale(.98)}}\
  .aura-head{background:var(--ib-gradient-forest);color:#fff;padding:var(--ib-space-5);display:flex;align-items:center;gap:12px;position:relative}\
  .aura-head .av{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.16);display:grid;place-items:center;flex-shrink:0}\
  .aura-head .av svg{width:24px;height:24px}\
  .aura-head b{display:block;font-size:var(--ib-text-body-lg);line-height:1.1}\
  .aura-head small{color:#cfe8db;font-size:var(--ib-text-caption);display:flex;align-items:center;gap:5px}\
  .aura-head small::before{content:'';width:7px;height:7px;border-radius:50%;background:#5fe39a;display:inline-block}\
  .aura-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.15);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;display:grid;place-items:center}\
  .aura-close:hover{background:rgba(255,255,255,.28)}\
  .aura-body{flex:1;overflow-y:auto;padding:var(--ib-space-5);display:flex;flex-direction:column;gap:var(--ib-space-4);background:var(--ib-bg-subtle)}\
  .aura-msg{max-width:85%;padding:.7em 1em;border-radius:16px;font-size:var(--ib-text-body-sm);line-height:1.5;animation:msgIn .3s var(--ib-ease-decelerate)}\
  @keyframes msgIn{from{opacity:0;transform:translateY(8px)}}\
  .aura-msg.bot{align-self:flex-start;background:var(--ib-bg-surface);border:1px solid var(--ib-border);border-bottom-left-radius:5px;color:var(--ib-text-body)}\
  .aura-msg.user{align-self:flex-end;background:var(--ib-color-primary);color:#fff;border-bottom-right-radius:5px}\
  .aura-msg strong{font-weight:var(--ib-weight-semibold);color:inherit}\
  .aura-msg .ib-btn{margin-top:10px}\
  .aura-chips{display:flex;flex-wrap:wrap;gap:8px}\
  .aura-chip{border:1px solid var(--ib-border-strong);background:var(--ib-bg-surface);color:var(--ib-green-800);border-radius:var(--ib-radius-pill);\
    padding:.5em .9em;font:inherit;font-size:var(--ib-text-caption);font-weight:var(--ib-weight-medium);cursor:pointer;transition:var(--ib-transition-base);text-align:left}\
  .aura-chip:hover{border-color:var(--ib-color-primary);background:var(--ib-green-50)}\
  .aura-ideas-label{font-size:var(--ib-text-caption);font-weight:var(--ib-weight-semibold);color:var(--ib-text-muted);margin-top:2px}\
  .aura-typing{align-self:flex-start;display:inline-flex;gap:4px;padding:.9em 1em;background:var(--ib-bg-surface);border:1px solid var(--ib-border);border-radius:16px;border-bottom-left-radius:5px}\
  .aura-typing i{width:7px;height:7px;border-radius:50%;background:var(--ib-neutral-400);animation:auraBlink 1.2s infinite}\
  .aura-typing i:nth-child(2){animation-delay:.2s}.aura-typing i:nth-child(3){animation-delay:.4s}\
  @keyframes auraBlink{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}\
  .aura-foot{border-top:1px solid var(--ib-border);padding:var(--ib-space-3);display:flex;gap:8px;background:var(--ib-bg-surface)}\
  .aura-foot input{flex:1;border:1.5px solid var(--ib-border-strong);border-radius:var(--ib-radius-pill);padding:.65em 1em;font:inherit;font-size:var(--ib-text-body-sm);color:var(--ib-text-body)}\
  .aura-foot input:focus{outline:none;border-color:var(--ib-color-primary);box-shadow:0 0 0 3px var(--ib-green-100)}\
  .aura-send{flex-shrink:0;width:44px;height:44px;border-radius:50%;border:none;background:var(--ib-color-primary);color:#fff;cursor:pointer;display:grid;place-items:center}\
  .aura-send:hover{background:var(--ib-color-primary-hover)}\
  .aura-send svg{width:20px;height:20px}\
  .aura-disc{font-size:.62rem;color:var(--ib-text-muted);text-align:center;padding:0 var(--ib-space-4) var(--ib-space-2);background:var(--ib-bg-surface)}\
  @media(max-width:520px){.aura-panel{right:0;bottom:0;width:100vw;height:100vh;max-height:100vh;border-radius:0}.aura-fab{right:14px;bottom:14px}}\
  @media(prefers-reduced-motion:reduce){.aura-panel.open,.aura-msg,.aura-typing i{animation:none}}\
  ";

  /* ---------- build UI ---------- */
  var panel, body, input;
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function fmt(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>"); }
  var ICON_BOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4M8 3h8"/><circle cx="9" cy="13" r="1.2" fill="currentColor"/><circle cx="15" cy="13" r="1.2" fill="currentColor"/></svg>';

  function scrollDown() { body.scrollTo({ top: body.scrollHeight, behavior: reduce ? "auto" : "smooth" }); }
  // Bring the top of a message to the top of the chat area so long answers are read from the start.
  function scrollToTop(m) {
    var delta = m.getBoundingClientRect().top - body.getBoundingClientRect().top;
    body.scrollTo({ top: body.scrollTop + delta - 12, behavior: reduce ? "auto" : "smooth" });
  }
  function addUser(text) { var m = el("div", "aura-msg user", fmt(text)); body.appendChild(m); scrollDown(); return m; }
  function addBot(html) { var m = el("div", "aura-msg bot"); m.innerHTML = html; body.appendChild(m); scrollToTop(m); return m; }
  function addChips(list, labelText) {
    if (labelText) body.appendChild(el("div", "aura-ideas-label", labelText));
    var wrap = el("div", "aura-chips");
    list.forEach(function (c) { var b = el("button", "aura-chip", fmt(c)); b.addEventListener("click", function () { handle(c); }); wrap.appendChild(b); });
    body.appendChild(wrap);
  }
  function typing() { var t = el("div", "aura-typing", "<i></i><i></i><i></i>"); body.appendChild(t); scrollDown(); return t; }

  // Offline fallback: the local retrieval engine, used when the LLM endpoint is unavailable.
  function localAnswer(query, c) {
    var r = answer(query, c);
    if (r.fallback) {
      addBot(fmt("No estoy segura de eso 🤔, pero puedo ayudarte con planes de luz y gas, solar, movilidad o servicios. También puedes llamar al **900 225 235**."));
      addChips(KB.welcome.chips);
      return;
    }
    var e = r.entry, html = fmt(e.a);
    if (e.cta) html += '<a class="ib-btn ib-btn--sm" href="' + e.cta.href + '" data-aura-cta>' + e.cta.label + "</a>";
    addBot(html);
    if (e.chips && e.chips.length) addChips(e.chips);
  }

  function respond(query) {
    var c = ctx();
    convo.push({ role: "user", content: query });
    var t = typing();
    var persona = c.name ? { name: c.name, segment: c.segment, segmentLabel: c.segmentLabel } : null;

    fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: convo.slice(-12), persona: persona }),
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
      .then(function (data) {
        t.remove();
        var text = (data && data.text) || "";
        if (!text) throw new Error("empty");
        convo.push({ role: "assistant", content: text });
        addBot(fmt(text));
      })
      .catch(function () {
        // API unavailable (no key yet, offline, or error) → deterministic KB retrieval.
        t.remove();
        localAnswer(query, c);
      });
  }

  function handle(text) { text = (text || "").trim(); if (!text) return; addUser(text); respond(text); }

  function greet() {
    var c = ctx();
    if (c.name) {
      addBot(fmt("¡Hola, **" + c.name + "**! 👋 Soy **Aura**, tu asistente. He preparado algunas ideas para ti, o pregúntame lo que quieras."));
      var ideas = KB.ideas[c.key];
      if (ideas) addChips(ideas, "💡 Ideas para ti");
      else addChips(KB.welcome.chips);
    } else {
      addBot(fmt(KB.welcome.generic));
      addChips(KB.welcome.chips);
    }
  }

  var opened = false, launcher;
  function open() {
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false");
    launcher.style.display = "none";
    if (!opened) { opened = true; greet(); }
    setTimeout(function () { input.focus(); }, 60);
  }
  function close() { panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); launcher.style.display = "inline-flex"; launcher.focus(); }

  function build() {
    var style = el("style"); style.textContent = CSS; document.head.appendChild(style);

    launcher = el("button", "aura-fab");
    launcher.setAttribute("aria-label", "Abrir asistente Aura");
    launcher.innerHTML = ICON_BOT + "<span>Pregúntale a Aura</span><span class='dot'></span>";
    launcher.addEventListener("click", open);

    panel = el("div", "aura-panel");
    panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Asistente Aura de Iberdrola"); panel.setAttribute("aria-hidden", "true");
    panel.innerHTML =
      '<div class="aura-head"><span class="av">' + ICON_BOT + "</span><div><b>Aura</b><small>Asistente de Iberdrola · en línea</small></div>" +
      '<button class="aura-close" aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="aura-body" role="log" aria-live="polite"></div>' +
      '<p class="aura-disc">Aura usa IA y puede cometer errores. Precios orientativos 2026.</p>' +
      '<form class="aura-foot"><input type="text" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta" autocomplete="off"><button class="aura-send" type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button></form>';
    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    body = panel.querySelector(".aura-body");
    input = panel.querySelector("input");
    panel.querySelector(".aura-close").addEventListener("click", close);
    panel.querySelector(".aura-foot").addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; handle(v); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
