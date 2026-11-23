# James & Renalyn Wedding RSVP

A Next.js wedding invitation with an RSVP form and admin dashboard.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set the Supabase URL, service role key, and admin password.
3. Run `supabase/schema.sql` in the Supabase SQL editor. If the old `public.rsvp` table exists, this renames it to `public.james_renalyn` and keeps its responses.
4. Run `npm run dev`.

Open `/` for the invitation and `/admin` for guest responses. The old `/template-3` URL redirects to `/`. RSVPs write to `public.james_renalyn`. The dashboard can filter, export, and delete responses.

The invitation components live in `components/invitation`. Event settings live in `lib/event.ts`, and media lives in `public`. Update `lib/event.ts` to change the event details or media paths.

For maps, set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and enable Google's Maps Embed API. Set the same environment variables when deploying.
