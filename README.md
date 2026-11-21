# Optimas Hosting — marketing website

Static one-page site advertising Optimas web hosting, VPS and container services
(running on our Proxmox VE cluster). No build step — plain HTML, CSS and JS.

## Run locally
```bash
python3 -m http.server 8080
```
Then open http://localhost:8080.

## Edit content
- **Prices, plans, contact details:** `js/config.js`
- **Text and sections:** `index.html`
- **Colours and layout:** `css/styles.css` (colour tokens at the top)

## Deploy
Copy the whole folder to any web server (Nginx/Apache in an LXC container on the
Proxmox node works well), or to GitHub Pages / Netlify / Cloudflare Pages.

> Do not link the Proxmox admin panel (port 8006) from the public site.
> Give customers a separate client portal instead.
