# James & Renalyn Wedding RSVP

A Next.js wedding invitation with a button linking to a password-protected, read-only guest response dashboard. Guest records are stored locally in the project.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` (or `.env`) and set `ADMIN_PASSWORD` to your admin password.
3. Run `npm run dev`.

Open `/` for the invitation and `/admin/` for guest responses. The old `/template-3/` URL also serves the invitation. Sign in with your configured admin password to search, filter by attendance/date, sort, view full messages, and export CSV. The dashboard does not accept new responses or delete records.

## Guest records

All 32 guest responses are stored in `lib/rsvp-records.ts`. Edit that file and rebuild to update the dashboard. Keep the original submission timestamps in ISO format; the dashboard displays dates in Philippine time. Messages support line breaks and emojis.

The server-only records file is served through `/api/admin/rsvps/` after validating `ADMIN_PASSWORD` on the server. The password and guest records are excluded from public JavaScript bundles, and record responses are not cached. A missing or empty password denies access. There is no database or external authentication service.

## Build and deploy

Run `npm run typecheck` and `npm run build`, then `npm start` to serve the production app. Deploy to a host that supports Next.js server routes and set the server environment variable `ADMIN_PASSWORD`.

Server-side password authentication requires a running Next.js server; a static-only export cannot enforce it. The earlier `out/` export is obsolete and must not be deployed.

The invitation components live in `components/invitation`. Event settings live in `lib/event.ts`, and media lives in `public`. Update `lib/event.ts` to change the event details or media paths.

Maps work without configuration. Optionally copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, and enable Google's Maps Embed API before building. The key is embedded in the static site at build time.
