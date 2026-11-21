/*
 * Site configuration — edit this file to change prices, plans and contact details.
 * No build step needed: save and refresh.
 */
window.SITE_CONFIG = {
  currency: "$",           // e.g. "KES ", "$", "€"
  yearlyMonthsCharged: 10, // yearly price = monthly × this (10 = 2 months free)

  contact: {
    email: "hosting@optimaswifi.com",   // TODO: confirm sales email
    phone: "+000 000 000 000",          // TODO: real phone / WhatsApp number
    whatsapp: "",                        // digits only, e.g. "254700000000" — enables wa.me link
    hours: "Mon–Sat, 8am – 8pm",
    clientArea: "#quote"                 // TODO: link to your customer portal / billing system
  },

  // Leave a link empty ("") to hide that icon.
  social: {
    facebook: "",
    x: "",
    instagram: "",
    whatsapp: ""
  },

  // The four cards under "Featured Plans".
  // type: web | vps | lxc ; name must match a plan below.
  // badge: { text, kind: "new" | "sale" } ; was: optional old monthly price (shown struck through)
  // art: web | vps | lxc | pro
  featured: [
    { type: "web", name: "Starter",  art: "web", badge: { text: "New",  kind: "new" } },
    { type: "vps", name: "VPS 2",    art: "vps" },
    { type: "lxc", name: "Micro",    art: "lxc" },
    { type: "web", name: "Business", art: "pro", badge: { text: "Sale", kind: "sale" }, was: 9 }
  ],

  plans: {
    web: [
      { name: "Starter", label: "Starter Web Hosting", price: 3, blurb: "For a personal or first business site.",
        specs: ["1 website", "10 GB SSD storage", "5 email accounts", "Unmetered bandwidth", "Free SSL", "Daily backups"] },
      { name: "Business", label: "Business Hosting", price: 7, popular: true, blurb: "For growing businesses and shops.",
        specs: ["10 websites", "50 GB SSD storage", "Unlimited email accounts", "Unmetered bandwidth", "Free domain (yearly)", "Priority support"] },
      { name: "Pro", label: "Pro Hosting", price: 14, blurb: "For agencies and busy sites.",
        specs: ["Unlimited websites", "100 GB NVMe storage", "Unlimited email accounts", "Staging environments", "Free domain (yearly)", "Free migrations"] }
    ],
    vps: [
      { name: "VPS 1", label: "VPS 1 — 2 GB", price: 6, blurb: "Small apps and test servers.",
        specs: ["1 vCPU", "2 GB RAM", "40 GB SSD", "1 IPv4 address", "Full root access", "Weekly backups"] },
      { name: "VPS 2", label: "Cloud VPS — 4 GB", price: 12, popular: true, blurb: "Production websites and APIs.",
        specs: ["2 vCPU", "4 GB RAM", "80 GB SSD", "1 IPv4 address", "Snapshots", "Daily backups"] },
      { name: "VPS 4", label: "VPS 4 — 8 GB", price: 24, blurb: "Databases and heavier workloads.",
        specs: ["4 vCPU", "8 GB RAM", "160 GB NVMe", "1 IPv4 address", "Snapshots", "Daily backups"] },
      { name: "VPS 8", label: "VPS 8 — 16 GB", price: 45, blurb: "Demanding, business-critical apps.",
        specs: ["8 vCPU", "16 GB RAM", "320 GB NVMe", "2 IPv4 addresses", "Snapshots", "Daily backups"] }
    ],
    lxc: [
      { name: "Nano", label: "Nano Container", price: 2, blurb: "Bots, cron jobs and tiny services.",
        specs: ["1 vCPU (shared)", "512 MB RAM", "10 GB SSD", "Shared IPv4 + port forwarding", "Docker-ready"] },
      { name: "Micro", label: "Linux Container", price: 4, popular: true, blurb: "Small apps, APIs and dev boxes.",
        specs: ["1 vCPU", "1 GB RAM", "20 GB SSD", "Dedicated IPv4", "Docker-ready", "Daily backups"] },
      { name: "Standard", label: "Standard Container", price: 8, blurb: "Multiple services in one box.",
        specs: ["2 vCPU", "2 GB RAM", "40 GB SSD", "Dedicated IPv4", "Docker-ready", "Daily backups"] }
    ]
  }
};
