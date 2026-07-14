/* ==========================================================================
   Iberdrola Design System — behaviour for interactive components.
   Progressive-enhancement, zero dependencies. Include with `defer`:
     <script src="js/iberdrola.js" defer></script>
   Wires: [data-ib-tabs], [data-ib-accordion], [data-ib-nav-toggle],
          [data-ib-carousel], [data-ib-reveal].
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Tabs ---------------------------------------------------------- */
  document.querySelectorAll("[data-ib-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected);
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var next;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { next.focus(); select(next); e.preventDefault(); }
      });
    });
  });

  /* ---- Accordion ----------------------------------------------------- */
  document.querySelectorAll("[data-ib-accordion]").forEach(function (root) {
    var single = root.getAttribute("data-ib-accordion") === "single";
    root.querySelectorAll(".ib-accordion__trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        if (single) {
          root.querySelectorAll(".ib-accordion__trigger").forEach(function (t) {
            t.setAttribute("aria-expanded", "false");
            document.getElementById(t.getAttribute("aria-controls")).hidden = true;
          });
        }
        trigger.setAttribute("aria-expanded", String(!expanded));
        document.getElementById(trigger.getAttribute("aria-controls")).hidden = expanded;
      });
    });
  });

  /* ---- Mobile nav toggle -------------------------------------------- */
  document.querySelectorAll("[data-ib-nav-toggle]").forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (target) target.classList.toggle("is-open", !open);
    });
  });

  /* ---- Carousel dots ------------------------------------------------- */
  document.querySelectorAll("[data-ib-carousel]").forEach(function (root) {
    var track = root.querySelector(".ib-carousel__track");
    var dots = Array.prototype.slice.call(root.querySelectorAll(".ib-dot"));
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    if (!track) return;
    root.querySelectorAll("[data-ib-carousel-prev]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" }); });
    });
    root.querySelectorAll("[data-ib-carousel-next]").forEach(function (b) {
      b.addEventListener("click", function () { track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" }); });
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        if (slides[i]) slides[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
    });
    if (dots.length && slides.length) {
      track.addEventListener("scroll", function () {
        var idx = Math.round(track.scrollLeft / (slides[0].offsetWidth + 24));
        dots.forEach(function (d, i) { d.setAttribute("aria-current", String(i === idx)); });
      }, { passive: true });
    }
  });

  /* ---- Scroll reveal ------------------------------------------------- */
  var reveals = document.querySelectorAll("[data-ib-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
