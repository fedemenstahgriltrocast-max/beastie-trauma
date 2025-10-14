# Web Static Preview

This directory hosts the static HTML prototype for Marxia Café Ops Edge Commerce.

- **Purpose:** preview marketing copy, run Lighthouse analytics, and exercise CSP headers without touching app logic.
- **Deployment:** can be served from any static host (Cloudflare Pages, Firebase Hosting) while keeping PCI-scoped services isolated.
- **Next steps:** wire analytics beacons or privacy-safe telemetry here; backend interactions should still point to the edge Worker (`/api/order`).
