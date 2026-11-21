(function () {
  "use strict";
  var cfg = window.SITE_CONFIG;
  var c = cfg.contact;
  var state = { tab: "web", yearly: false };
  var typeLabels = { web: "Web Hosting", vps: "VPS", lxc: "Container" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function money(n) { return esc(cfg.currency) + (Number.isInteger(n) ? n.toFixed(2) : n.toFixed(2)); }
  function findPlan(type, name) {
    return (cfg.plans[type] || []).filter(function (p) { return p.name === name; })[0];
  }

  /* ---------- Card illustrations ---------- */
  var ART = {
    web:
      '<svg viewBox="0 0 200 160"><rect x="30" y="26" width="140" height="100" rx="10" fill="#1d1f22"/>' +
      '<rect x="38" y="34" width="124" height="84" rx="4" fill="#2c2f33"/><circle cx="100" cy="76" r="28" fill="none" stroke="#e9ecef" stroke-width="4"/>' +
      '<path d="M72 76h56M100 48c12 14 12 42 0 56M100 48c-12 14-12 42 0 56" fill="none" stroke="#e9ecef" stroke-width="3"/>' +
      '<path d="M82 126h36l6 14H76z" fill="#1d1f22"/><rect x="66" y="138" width="68" height="6" rx="3" fill="#3a3d42"/></svg>',
    vps:
      '<svg viewBox="0 0 200 160"><rect x="40" y="20" width="120" height="124" rx="10" fill="#1d1f22"/>' +
      '<rect x="50" y="32" width="100" height="28" rx="4" fill="#33363b"/><rect x="50" y="66" width="100" height="28" rx="4" fill="#33363b"/><rect x="50" y="100" width="100" height="28" rx="4" fill="#33363b"/>' +
      '<circle cx="62" cy="46" r="4" fill="#43b02a"/><circle cx="62" cy="80" r="4" fill="#43b02a"/><circle cx="62" cy="114" r="4" fill="#43b02a"/>' +
      '<g fill="#4a4e54"><rect x="96" y="44" width="44" height="3" rx="1.5"/><rect x="96" y="78" width="44" height="3" rx="1.5"/><rect x="96" y="112" width="44" height="3" rx="1.5"/></g></svg>',
    lxc:
      '<svg viewBox="0 0 200 160"><g transform="translate(46 18)"><path d="M54 0l54 30v62l-54 30L0 92V30z" fill="#1d1f22"/>' +
      '<path d="M54 0l54 30-54 30L0 30z" fill="#3a3d42"/><path d="M54 60v62" stroke="#55595f" stroke-width="2"/>' +
      '<path d="M18 56l22 12v20L18 76z M68 68l22-12v20l-22 12z" fill="#2c2f33"/><circle cx="54" cy="30" r="8" fill="#43b02a"/></g></svg>',
    pro:
      '<svg viewBox="0 0 200 160"><path d="M100 18l58 22v40c0 32-24 54-58 64-34-10-58-32-58-64V40z" fill="#1d1f22"/>' +
      '<path d="M100 30l46 18v32c0 25-19 43-46 51-27-8-46-26-46-51V48z" fill="#2c2f33"/>' +
      '<path d="M78 80l16 16 30-32" fill="none" stroke="#43b02a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- Featured cards ---------- */
  var featuredEl = document.getElementById("featured-grid");
  featuredEl.innerHTML = cfg.featured.map(function (f) {
    var p = findPlan(f.type, f.name);
    if (!p) return "";
    var pick = typeLabels[f.type] + " — " + p.name;
    var badge = f.badge ? '<span class="badge badge--' + esc(f.badge.kind) + '">' + esc(f.badge.text) + "</span>" : "";
    var was = f.was
      ? '<p class="product__was"><b>' + money(p.price) + "</b> / <s>" + money(f.was) + "</s></p>"
      : "";
    return (
      '<article class="product">' +
        '<div class="product__img">' + badge + (ART[f.art] || ART.web) + "</div>" +
        '<div class="product__body">' +
          "<h3>" + esc(p.label || p.name) + "</h3>" +
          '<p class="product__price">' + money(p.price) + "<small>/mo</small></p>" + was +
          '<a href="#quote" class="btn btn--block" data-pick="' + esc(pick) + '">Order Now</a>' +
        "</div>" +
      "</article>"
    );
  }).join("");

  /* ---------- All plans ---------- */
  var plansEl = document.getElementById("plans-grid");
  function renderPlans() {
    var list = cfg.plans[state.tab] || [];
    plansEl.style.setProperty("--cols", list.length);
    plansEl.innerHTML = list.map(function (p) {
      var amount = state.yearly ? p.price * cfg.yearlyMonthsCharged : p.price;
      var sub = state.yearly ? "≈ " + money(amount / 12) + "/mo, billed yearly" : "Billed monthly";
      return (
        '<article class="plan' + (p.popular ? " plan--popular" : "") + '">' +
          (p.popular ? '<span class="badge badge--new">Popular</span>' : "") +
          "<h3>" + esc(p.name) + "</h3>" +
          '<p class="plan__blurb">' + esc(p.blurb) + "</p>" +
          '<p class="plan__price">' + money(amount) + "<small>" + (state.yearly ? "/yr" : "/mo") + "</small></p>" +
          '<p class="plan__sub">' + sub + "</p>" +
          '<a href="#quote" class="btn btn--block" data-pick="' + esc(typeLabels[state.tab] + " — " + p.name) + '">Order ' + esc(p.name) + "</a>" +
          '<ul class="checks">' + p.specs.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        "</article>"
      );
    }).join("");
  }

  function setTab(tab) {
    state.tab = tab;
    document.querySelectorAll(".tab").forEach(function (b) {
      var on = b.dataset.tab === tab;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    renderPlans();
  }
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { setTab(b.dataset.tab); });
  });
  document.querySelectorAll("[data-open-tab]").forEach(function (a) {
    a.addEventListener("click", function () { setTab(a.dataset.openTab); });
  });

  var sw = document.querySelector(".switch");
  sw.addEventListener("click", function () {
    state.yearly = !state.yearly;
    sw.setAttribute("aria-checked", state.yearly);
    document.querySelector('[data-billing-label="monthly"]').classList.toggle("is-on", !state.yearly);
    document.querySelector('[data-billing-label="yearly"]').classList.toggle("is-on", state.yearly);
    renderPlans();
  });

  /* ---------- Remember which plan was clicked ---------- */
  var planInput = document.getElementById("quote-plan");
  var emailInput = document.getElementById("quote-email");
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-pick]");
    if (!a) return;
    planInput.value = a.dataset.pick;
    emailInput.placeholder = "Your email — for " + a.dataset.pick;
    setTimeout(function () { emailInput.focus({ preventScroll: true }); }, 500);
  });

  /* ---------- Quote form (opens the visitor's mail app) ---------- */
  var form = document.getElementById("quote-form");
  var status = document.querySelector(".newsletter__status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!emailInput.checkValidity() || !emailInput.value) {
      status.textContent = "Please enter a valid email address.";
      status.className = "newsletter__status is-error";
      emailInput.focus();
      return;
    }
    var plan = planInput.value || "Not sure yet";
    var body = "Hi Optimas,\n\nI'd like a quote for: " + plan + "\nMy email: " + emailInput.value +
               "\n\nAbout my project:\n";
    window.location.href = "mailto:" + c.email +
      "?subject=" + encodeURIComponent("Hosting quote — " + plan) +
      "&body=" + encodeURIComponent(body);
    status.textContent = "Opening your email app… If nothing happens, email us at " + c.email + ".";
    status.className = "newsletter__status is-ok";
  });

  /* ---------- Contact details & links ---------- */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.dataset.config;
    el.textContent = c[key] || "";
    if (key === "email") el.href = "mailto:" + c.email;
    if (key === "phone") el.href = c.whatsapp ? "https://wa.me/" + c.whatsapp : "tel:" + c.phone.replace(/\s/g, "");
  });
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    el.href = c[el.dataset.configHref] || "#quote";
  });

  /* ---------- Social icons ---------- */
  var ICONS = {
    facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20" stroke-width="2.4"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2"/>',
    whatsapp: '<path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" fill="none" stroke-width="2"/><path d="M9 8c0 4 3 7 7 7l1-2-2-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2z"/>'
  };
  var social = document.getElementById("social");
  social.innerHTML = Object.keys(ICONS).filter(function (k) { return cfg.social[k]; }).map(function (k) {
    return '<a href="' + esc(cfg.social[k]) + '" aria-label="' + k + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24">' + ICONS[k] + "</svg></a>";
  }).join("");
  if (!social.innerHTML) document.querySelector(".footer__follow h4").hidden = true;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  renderPlans();
})();
