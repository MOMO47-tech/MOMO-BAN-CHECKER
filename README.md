# MOMO BAN CHECKER

A cyber-terminal styled, mobile-first phone-status demo built with React, TypeScript, Vite, Tailwind CSS, and Supabase RLS.

## Features

- Private access gate using the demo code `MOMO47`.
- Searchable country selector with international dialing codes.
- Three-step local flow: choose country, enter number, view illustrative result.
- Online, temporarily restricted, and permanent-ban guidance in English.
- Joined Members display-name board persisted in Supabase through RLS.
- WhatsApp support message composer without collecting OTPs, passwords, or account credentials.

## Run locally

```bash
pnpm install
pnpm run dev
```

Production validation:

```bash
pnpm run check
pnpm run build
pnpm test
```

## Supabase

The app reads these browser-safe Vite variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The `public.momo_ban_members` table is protected by RLS. It stores only `display_name` and `joined_at`; anonymous users can read and insert valid display names, but cannot update or delete rows. Never put a service-role key in a `VITE_*` variable.

## Deploy with Vercel

Import this GitHub repository into Vercel and add the two Supabase variables to the **Production**, **Preview**, and **Development** environments. Use the default Vite build settings:

- Build command: `pnpm run build`
- Output directory: `dist/public`
- Install command: `pnpm install`

The status result remains illustrative and is not an official WhatsApp ban database.
