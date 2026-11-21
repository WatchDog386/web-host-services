(function () {
  "use strict";
  var cfg = window.SITE_CONFIG;
  var state = { tab: "web", yearly: false };
  var tabLabels = { web: "Web Hosting", vps: "VPS", lxc: "Container" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Pricing ---------- */
  var plansEl = document.getElementById("plans");

  function renderPlans() {
    var list = cfg.plans[state.tab] || [];
    plansEl.style.setProperty("--cols", list.length);
    plansEl.innerHTML = list.map(function (p) {
      var amount = state.yearly ? p.price * cfg.yearlyMonthsCharged : p.price;
      var per = state.yearly ? "/yr" : "/mo";
      var sub = state.yearly
        ? "≈ " + cfg.currency + (amount / 12).toFixed(2) + "/mo, billed yearly"
        : "Billed monthly";
      return (
        '<article class="plan' + (p.popular ? " plan--popular" : "") + '">' +
          (p.popular ? '<span class="plan__badge">Most popular</span>' : "") +
          "<h3>" + esc(p.name) + "</h3>" +
          '<p class="plan__blurb">' + esc(p.blurb) + "</p>" +
          '<p class="plan__price"><span>' + esc(cfg.currency) + "</span>" + amount + "<small>" + per + "</small></p>" +
          '<p class="plan__sub">' + sub + "</p>" +
          '<a href="#contact" class="btn ' + (p.popular ? "btn--primary" : "btn--outline") + ' btn--block" data-pick="' +
            esc(tabLabels[state.tab] + " — " + p.name) + '">Choose ' + esc(p.name) + "</a>" +
          '<ul class="checks">' + p.specs.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        "</article>"
      );
    }).join("");
  }

  document.querySelectorAll(".tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.tab = btn.dataset.tab;
      document.querySelectorAll(".tab").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on);
      });
      renderPlans();
    });
  });

  var sw = document.querySelector(".switch");
  sw.addEventListener("click", function () {
    state.yearly = !state.yearly;
    sw.setAttribute("aria-checked", state.yearly);
    document.querySelector('[data-billing-label="monthly"]').classList.toggle("is-on", !state.yearly);
    document.querySelector('[data-billing-label="yearly"]').classList.toggle("is-on", state.yearly);
    renderPlans();
  });

  /* ---------- Plan select in contact form ---------- */
  var select = document.getElementById("plan-select");
  Object.keys(cfg.plans).forEach(function (k) {
    var g = document.createElement("optgroup");
    g.label = tabLabels[k];
    cfg.plans[k].forEach(function (p) {
      var o = document.createElement("option");
      o.textContent = tabLabels[k] + " — " + p.name;
      g.appendChild(o);
    });
    select.appendChild(g);
  });
  var custom = document.createElement("option");
  custom.textContent = "Custom / managed service";
  select.appendChild(custom);

  plansEl.addEventListener("click", function (e) {
    var a = e.target.closest("[data-pick]");
    if (a) select.value = a.dataset.pick;
  });

  /* ---------- Contact details ---------- */
  var c = cfg.contact;
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.dataset.config;
    el.textContent = c[key] || "";
    if (key === "email") el.href = "mailto:" + c.email;
    if (key === "phone") el.href = c.whatsapp ? "https://wa.me/" + c.whatsapp : "tel:" + c.phone.replace(/\s/g, "");
  });

  /* ---------- Contact form (opens the visitor's mail app) ---------- */
  var form = document.getElementById("contact-form");
  var status = form.querySelector(".form__status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Please fill in your name, a valid email and a message.";
      status.className = "form__status is-error";
      form.reportValidity();
      return;
    }
    var d = new FormData(form);
    var body =
      "Name: " + d.get("name") + "\n" +
      "Email: " + d.get("email") + "\n" +
      "Phone: " + (d.get("phone") || "-") + "\n" +
      "Interested in: " + d.get("plan") + "\n\n" + d.get("message");
    window.location.href = "mailto:" + c.email +
      "?subject=" + encodeURIComponent("Hosting enquiry — " + d.get("plan")) +
      "&body=" + encodeURIComponent(body);
    status.textContent = "Opening your email app… If nothing happens, email us at " + c.email + ".";
    status.className = "form__status is-ok";
  });

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

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector(".nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ---------- Terminal typing effect ---------- */
  var lines = [
    "$ optimas create vps --plan vps-2 --os ubuntu-24.04",
    "→ Allocating 2 vCPU, 4 GB RAM, 80 GB SSD…",
    "→ Cloning template… done",
    "→ Assigning IPv4 address… done",
    "✓ vm-118 is running (42s)",
    "",
    "$ ssh root@your-server",
    "Welcome to Ubuntu 24.04 LTS"
  ];
  var typed = document.getElementById("typed");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    typed.textContent = lines.join("\n");
  } else {
    var li = 0, ci = 0, out = "";
    (function tick() {
      if (li >= lines.length) {
        setTimeout(function () { li = 0; ci = 0; out = ""; typed.textContent = ""; tick(); }, 4000);
        return;
      }
      var line = lines[li];
      if (line.charAt(0) !== "$") { out += line + "\n"; li++; typed.textContent = out; return setTimeout(tick, 450); }
      if (ci <= line.length) { typed.textContent = out + line.slice(0, ci++); return setTimeout(tick, 28); }
      out += line + "\n"; li++; ci = 0; setTimeout(tick, 350);
    })();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  renderPlans();
})();
