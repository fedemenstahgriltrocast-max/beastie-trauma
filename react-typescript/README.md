# React + TypeScript Workspace

This workspace will house the authenticated Marxia Café experience, built with React and TypeScript, and aligned with Flutter/Firebase delivery for Android and iOS.

## Goals
- Recreate the landing, shop, login, and admin journeys as typed React components.
- Share domain models (Products, Orders, Users) across React web and Flutter mobile clients through a Firebase-backed API.
- Integrate OPS CyberSec Core controls: role-based access, secure session handling, auditable inventory updates.

## Integration Touchpoints
- **Firebase:** Use Firebase Authentication and Firestore/Functions as the real-time data layer. Keep secrets server-side via Cloud Functions or Cloudflare Workers.
- **Flutter clients:** Mirror the React component structure; reuse TypeScript interfaces as JSON schema references for Dart models to maintain consistency across platforms.
- **Analytics:** Stream privacy-aware telemetry to BigQuery or GA4 for both React and static preview surfaces.

## Getting Started
1. Install dependencies: `npm install`.
2. Start a dev bundle: `npm run dev` (esbuild dev server, no Vite/CRA).
3. Run type checks: `npm run typecheck`.

The `esbuild` scripts provide a lightweight alternative to Vite, keeping control of the build pipeline while remaining compatible with Flutter/Firebase assets pipelines.
