/*
 * Site configuration — edit this file to change prices, plans and contact details.
 * No build step needed: save and refresh.
 */
window.SITE_CONFIG = {
  currency: "$",          // e.g. "KES ", "$", "€"
  yearlyMonthsCharged: 10, // yearly price = monthly × this (10 = 2 months free)

  contact: {
    email: "hosting@optimaswifi.com",   // TODO: confirm sales email
    phone: "+000 000 000 000",          // TODO: real phone / WhatsApp number
    whatsapp: "",                        // digits only, e.g. "254700000000" — enables wa.me link
    hours: "Mon–Sat, 8am – 8pm"
  },

  plans: {
    web: [
      { name: "Starter", price: 3, blurb: "For a personal or first business site.",
        specs: ["1 website", "10 GB SSD storage", "5 email accounts", "Unmetered bandwidth", "Free SSL", "Daily backups"] },
      { name: "Business", price: 7, popular: true, blurb: "For growing businesses and shops.",
        specs: ["10 websites", "50 GB SSD storage", "Unlimited email accounts", "Unmetered bandwidth", "Free domain (annual)", "Priority support"] },
      { name: "Pro", price: 14, blurb: "For agencies and busy sites.",
        specs: ["Unlimited websites", "100 GB NVMe storage", "Unlimited email accounts", "Staging environments", "Free domain (annual)", "Free migrations"] }
    ],
    vps: [
      { name: "VPS 1", price: 6, blurb: "Small apps and test servers.",
        specs: ["1 vCPU", "2 GB RAM", "40 GB SSD", "1 IPv4 address", "Full root access", "Weekly backups"] },
      { name: "VPS 2", price: 12, popular: true, blurb: "Production websites and APIs.",
        specs: ["2 vCPU", "4 GB RAM", "80 GB SSD", "1 IPv4 address", "Snapshots", "Daily backups"] },
      { name: "VPS 4", price: 24, blurb: "Databases and heavier workloads.",
        specs: ["4 vCPU", "8 GB RAM", "160 GB NVMe", "1 IPv4 address", "Snapshots", "Daily backups"] },
      { name: "VPS 8", price: 45, blurb: "Demanding, business-critical apps.",
        specs: ["8 vCPU", "16 GB RAM", "320 GB NVMe", "2 IPv4 addresses", "Snapshots", "Daily backups"] }
    ],
    lxc: [
      { name: "Nano", price: 2, blurb: "Bots, cron jobs and tiny services.",
        specs: ["1 vCPU (shared)", "512 MB RAM", "10 GB SSD", "Shared IPv4 + port forwarding", "Docker-ready"] },
      { name: "Micro", price: 4, popular: true, blurb: "Small apps, APIs and dev boxes.",
        specs: ["1 vCPU", "1 GB RAM", "20 GB SSD", "Dedicated IPv4", "Docker-ready", "Daily backups"] },
      { name: "Standard", price: 8, blurb: "Multiple services in one box.",
        specs: ["2 vCPU", "2 GB RAM", "40 GB SSD", "Dedicated IPv4", "Docker-ready", "Daily backups"] }
    ]
  }
};
