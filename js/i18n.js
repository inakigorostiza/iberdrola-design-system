/* ==========================================================================
   Iberdrola demo — lightweight bilingual (ES/EN) engine
   --------------------------------------------------------------------------
   Load in <head> (before paint) on every bilingual page:
     <script src="{depth}js/i18n.js"></script>

   Two translation mechanisms:
   1) Inline, per-element (static page copy — self-contained, no dictionary):
        <h1 data-i18n-es="Una marca." data-i18n-en="One brand."></h1>
        <input data-i18n-es-placeholder="Escribe…" data-i18n-en-placeholder="Type…">
        <p data-i18n-html data-i18n-es="a <b>b</b>" data-i18n-en="a <b>b</b>"></p>
        <title data-i18n-es="…" data-i18n-en="…"></title>
        <meta name="description" data-i18n-es-content="…" data-i18n-en-content="…">
      Attribute form is data-i18n-{es|en}-{attr} (placeholder, aria-label, title, alt, content, value).
   2) Key-based dictionary (for JS-rendered strings in personalize.js / chatbot.js):
        window.t('chat.placeholder')  ->  IB_I18N[lang]['chat.placeholder']

   Source of truth: window.IB_LANG (localStorage 'ib_lang', default 'es').
   Switching language persists it and reloads (so JS-rendered UI re-renders cleanly).
   ========================================================================== */
(function (w) {
  "use strict";
  var LANG = "es";
  try { LANG = w.localStorage.getItem("ib_lang") || "es"; } catch (e) {}
  if (LANG !== "en" && LANG !== "es") LANG = "es";
  w.IB_LANG = LANG;

  var d = w.document;
  d.documentElement.setAttribute("lang", LANG);

  // Anti-flash: hide body until translations are applied (a page authored in one
  // language would otherwise flash before switching to the active one).
  d.documentElement.classList.add("i18n-boot");
  var guard = d.createElement("style");
  guard.textContent =
    "html.i18n-boot body{visibility:hidden !important}" +
    /* shared language-toggle look, usable on any page */
    ".ib-lang{display:inline-flex;align-items:center;gap:2px;border:1px solid var(--ib-border-strong,#c9d2cd);" +
    "border-radius:var(--ib-radius-pill,999px);padding:2px;background:var(--ib-bg-surface,#fff);line-height:1;vertical-align:middle}" +
    ".ib-lang button{appearance:none;border:0;background:transparent;cursor:pointer;font:inherit;font-size:var(--ib-text-caption,.78rem);" +
    "font-weight:var(--ib-weight-semibold,600);color:var(--ib-text-muted,#5b6b63);padding:.28em .6em;border-radius:var(--ib-radius-pill,999px);transition:.15s}" +
    ".ib-lang button:hover{color:var(--ib-color-primary,#00A443)}" +
    ".ib-lang button[aria-pressed='true']{background:var(--ib-color-primary,#00A443);color:#fff}" +
    ".ib-lang--on-dark{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.08)}" +
    ".ib-lang--on-dark button{color:rgba(255,255,255,.85)}" +
    ".ib-lang--on-dark button[aria-pressed='true']{background:#fff;color:var(--ib-green-800,#004A2F)}";
  (d.head || d.documentElement).appendChild(guard);

  /* ---------- key-based dictionary (JS-rendered strings) ---------- */
  w.IB_I18N = w.IB_I18N || { es: {}, en: {} };
  w.t = function (key, fallback) {
    var tbl = w.IB_I18N[w.IB_LANG] || {};
    if (tbl[key] != null) return tbl[key];
    if (w.IB_I18N.es && w.IB_I18N.es[key] != null) return w.IB_I18N.es[key];
    return fallback != null ? fallback : key;
  };
  // Merge additional dictionary entries (called by js/i18n-strings.js etc.)
  w.IB_addI18n = function (obj) {
    ["es", "en"].forEach(function (l) {
      if (!obj[l]) return;
      w.IB_I18N[l] = w.IB_I18N[l] || {};
      Object.keys(obj[l]).forEach(function (k) { w.IB_I18N[l][k] = obj[l][k]; });
    });
  };

  /* ---------- inline per-element application ---------- */
  var SEL = ["", "-html", "-placeholder", "-aria-label", "-title", "-alt", "-content", "-value"]
    .reduce(function (acc, s) { acc.push("[data-i18n-es" + s + "]", "[data-i18n-en" + s + "]"); return acc; }, [])
    .join(",");

  function applyEl(el) {
    var L = w.IB_LANG;
    var txt = el.getAttribute("data-i18n-" + L);
    if (txt != null) {
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = txt;
      else el.textContent = txt;
    }
    var attrs = el.attributes, i, a, m;
    for (i = 0; i < attrs.length; i++) {
      a = attrs[i];
      m = /^data-i18n-(es|en)-(.+)$/.exec(a.name);
      if (m && m[1] === L && m[2] !== "html") el.setAttribute(m[2], a.value);
    }
  }

  function applyI18n(root) {
    var nodes = (root || d).querySelectorAll(SEL);
    for (var i = 0; i < nodes.length; i++) applyEl(nodes[i]);
    var titleEl = d.querySelector("title[data-i18n-es],title[data-i18n-en]");
    if (titleEl) {
      var t = titleEl.getAttribute("data-i18n-" + w.IB_LANG);
      if (t) d.title = t;
    }
    var btns = (root || d).querySelectorAll("[data-set-lang]");
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-set-lang") === w.IB_LANG ? "true" : "false");
    }
  }
  w.IB_applyI18n = applyI18n;

  function boot() {
    applyI18n(d);
    d.documentElement.classList.remove("i18n-boot");
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* ---------- language toggle (event-delegated) ---------- */
  w.IB_setLang = function (l) {
    if (l !== "en" && l !== "es") return;
    try { w.localStorage.setItem("ib_lang", l); } catch (e) {}
    w.location.reload();
  };
  d.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-lang]");
    if (!b) return;
    e.preventDefault();
    w.IB_setLang(b.getAttribute("data-set-lang"));
  });
})(window);
