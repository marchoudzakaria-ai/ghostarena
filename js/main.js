/* ===================================================================
   GHOST ARENA — interactions
   =================================================================== */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Shared nav model (single source of truth) ---- */
  var NAV = [
    { href: "ghost-arena.html",    label: "Ghost Arena",     key: "ghost-arena" },
    { href: "coachs.html",         label: "Coachs",          key: "coachs" },
    { href: "planning-tarifs.html",label: "Planning & Tarifs",key: "planning-tarifs" },
    { href: "fight-acces.html",    label: "Fight Access",    key: "fight-acces" },
    { href: "only-ladies.html",    label: "Only Ladies",     key: "only-ladies" },
    { href: "evenements.html",     label: "Evenements",      key: "evenements" }
  ];

  var IG = "https://www.instagram.com/ghost.arena_/";
  var FB = "https://www.facebook.com/people/Ghost-Arena/61586192936143/";
  var TEL = "0478905283";
  var MAIL = "contact.ghostarena@gmail.com";

  var svgIG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  var svgFB = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z"/></svg>';

  /* ---- Build header ---- */
  function buildHeader() {
    var current = document.body.getAttribute("data-page") || "";
    var links = NAV.map(function (n) {
      var aria = n.key === current ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + aria + ">" + n.label + "</a>";
    }).join("");

    var html =
      '<a class="skip-link" href="#main">Aller au contenu</a>' +
      '<div class="container"><nav class="nav" aria-label="Navigation principale">' +
        '<a class="brand" href="index.html" aria-label="Ghost Arena — accueil">' +
          '<img src="assets/img/logo.png" alt="Logo Ghost Arena" width="120" height="120">' +
        "</a>" +
        '<ul class="nav-links" id="navlinks">' +
          links +
          '<li class="nav-cta"><a class="btn btn-primary" href="contact.html"><span>Essai gratuit</span></a></li>' +
        "</ul>" +
        '<button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="navlinks">' +
          "<span></span><span></span><span></span></button>" +
      "</nav></div>";

    // nav-links currently a UL but our links are <a>; wrap each in li for semantics
    var header = document.querySelector(".site-header");
    if (!header) return;
    header.innerHTML = html;

    // Convert flat <a> to list items for accessibility
    var ul = header.querySelector("#navlinks");
    var anchors = Array.prototype.slice.call(ul.children).filter(function (c) { return c.tagName === "A"; });
    anchors.forEach(function (a) {
      var li = document.createElement("li");
      ul.insertBefore(li, a);
      li.appendChild(a);
    });

    /* burger toggle */
    var burger = header.querySelector("#burger");
    burger.addEventListener("click", function () {
      var open = ul.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = open && window.innerWidth <= 1024 ? "hidden" : "";
    });
    ul.addEventListener("click", function (e) {
      if (e.target.closest("a") && ul.classList.contains("open")) {
        ul.classList.remove("open"); burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
      }
    });

    /* scrolled state */
    function onScroll() { header.classList.toggle("scrolled", window.scrollY > 30); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Build footer ---- */
  function buildFooter() {
    var footer = document.querySelector(".site-footer");
    if (!footer) return;
    var year = new Date().getFullYear();
    var navCols = NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + "</a>"; }).join("");
    footer.innerHTML =
      '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<img src="assets/img/logo.png" alt="Ghost Arena" width="120" height="120">' +
          "<p>Salle de sport &amp; centre de combat à Genas (69). MMA, Jiu-Jitsu Brésilien, grappling, lutte, boxe et fitness — accessible 7j/7.</p>" +
          '<div class="socials">' +
            '<a href="' + IG + '" target="_blank" rel="noopener" aria-label="Instagram">' + svgIG + "</a>" +
            '<a href="' + FB + '" target="_blank" rel="noopener" aria-label="Facebook">' + svgFB + "</a>" +
          "</div>" +
        "</div>" +
        '<div class="footer-col"><h4>Naviguer</h4>' + navCols + '<a href="contact.html">Contact</a></div>' +
        '<div class="footer-col"><h4>Disciplines</h4>' +
          '<p>MMA</p><p>Jiu-Jitsu Brésilien</p><p>Grappling &amp; Lutte</p><p>Boxe &amp; Cross-Training</p><p>Only Ladies</p>' +
        "</div>" +
        '<div class="footer-col"><h4>Nous trouver</h4>' +
          '<a href="https://maps.google.com/?q=2+Rte+de+Lyon+69740+Genas" target="_blank" rel="noopener">2 Rte de Lyon<br>69740 Genas</a>' +
          '<a href="tel:+33' + TEL.substring(1) + '">04 78 90 52 83</a>' +
          '<a href="mailto:' + MAIL + '">' + MAIL + "</a>" +
          '<p style="color:var(--tx-mute);margin-top:8px">Lun–Ven 8h30–22h30<br>Sam 10h–19h · Dim 10h–17h</p>' +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + year + " Ghost Arena — Tous droits réservés.</span>" +
        '<span><a href="index.html">Accueil</a> · <a href="contact.html">Mentions légales</a></span>' +
      "</div>" +
      "</div>";
  }

  /* ---- Kinetic H1: wrap each word in mask spans ---- */
  function buildKinetic() {
    document.querySelectorAll("[data-kinetic]").forEach(function (el) {
      if (el.dataset.kineticDone) return;
      el.dataset.kineticDone = "1";
      el.classList.add("kinetic");
      var words = el.innerHTML.trim().split(/\s+/);
      el.innerHTML = words.map(function (w) {
        return '<span class="word"><span>' + w + "</span></span>";
      }).join(" ");
    });
  }

  /* ---- Scroll reveal + kinetic trigger ---- */
  function observeReveals() {
    var els = document.querySelectorAll(".reveal, .kinetic");
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Animated counters ---- */
  function animateCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1500, start = null;
      if (reduced) { el.textContent = target + suffix; return; }
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---- Subtle parallax on scroll ---- */
  function parallax() {
    if (reduced) return;
    var items = document.querySelectorAll("[data-parallax]");
    if (!items.length) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---- Pricing toggle ---- */
  function pricingToggle() {
    var toggle = document.querySelector(".price-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      var mode = btn.getAttribute("data-mode");
      toggle.querySelectorAll("button").forEach(function (b) { b.classList.toggle("active", b === btn); });
      document.querySelectorAll("[data-plan-mode]").forEach(function (g) {
        g.style.display = g.getAttribute("data-plan-mode") === mode ? "" : "none";
      });
    });
  }

  /* ---- Contact form validation ---- */
  function contactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = form.querySelector(".form-status");
    form.setAttribute("novalidate", "true");
    function setInvalid(field, on) { field.classList.toggle("invalid", on); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      form.querySelectorAll(".field[data-required]").forEach(function (f) {
        var input = f.querySelector("input, textarea, select");
        var valid = input.value.trim().length > 0;
        if (input.type === "email") valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        setInvalid(f, !valid);
        if (!valid && ok) { ok = false; firstBad = input; }
        if (!valid) ok = false;
      });
      if (!ok) { if (firstBad) firstBad.focus(); return; }
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.querySelector("span") || btn;
      var orig = label.textContent;
      label.textContent = "Envoi…"; btn.disabled = true;

      function done(success) {
        btn.disabled = false; label.textContent = orig;
        if (success) {
          status.className = "form-status ok";
          status.textContent = "Merci ! Votre demande a bien été envoyée. L'équipe Ghost Arena vous recontacte sous 24 h.";
          form.reset();
        } else {
          status.className = "form-status ok";
          status.style.background = "rgba(221,0,0,.12)";
          status.style.borderColor = "rgba(221,0,0,.35)";
          status.style.color = "#ff9b9b";
          status.innerHTML = 'Une erreur est survenue. Écrivez-nous directement à <a href="mailto:contact.ghostarena@gmail.com" style="color:#fff;text-decoration:underline">contact.ghostarena@gmail.com</a>.';
        }
        status.setAttribute("role", "status");
        status.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }

      // Submit to FormSubmit (free, hardcoded recipients incl. _cc). AJAX endpoint returns JSON.
      fetch("https://formsubmit.co/ajax/marchoud.zakaria@gmail.com", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return r.ok && (d.success === true || d.success === "true"); }); })
        .then(function (success) { done(success); })
        .catch(function () { done(false); });
    });
    // clear invalid on input
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field"); if (f) f.classList.remove("invalid");
    });
  }

  /* ---- Hero video: reduced-motion + graceful fallback ---- */
  function heroVideo() {
    var v = document.querySelector(".hero-video");
    if (!v) return;
    // Respect reduced-motion: don't autoplay, fall back to the still photo montage.
    if (reduced) { v.removeAttribute("autoplay"); try { v.pause(); } catch (e) {} return; }
    // The poster (hero-full.jpg) stays visible as fallback if the video can't play.
    function tryPlay() {
      var p = v.play();
      if (p && p.catch) { p.catch(function () { /* keep poster/montage */ }); }
    }
    v.addEventListener("loadeddata", tryPlay);
    if (v.readyState >= 2) tryPlay();
  }

  /* ---- Init ---- */
  function init() {
    heroVideo();
    buildHeader();
    buildFooter();
    buildKinetic();
    observeReveals();
    animateCounters();
    parallax();
    pricingToggle();
    contactForm();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
