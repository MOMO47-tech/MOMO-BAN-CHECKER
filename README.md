# MOMO BAN CHECKER

A cyber-terminal styled, mobile-first phone-status demo built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Private access gate using the demo code `MOMO47`.
- Searchable country selector with international dialing codes.
- Three-step local flow: choose country, enter number, view illustrative result.
- Online, temporarily restricted, and permanent-ban guidance in English.
- Joined Members display-name board that stays in the browser demo.
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
```

## Deploy with Vercel

Import this GitHub repository into Vercel. Use the default Vite build settings:

- Build command: `pnpm run build`
- Output directory: `dist/public`
- Install command: `pnpm install`

This version is intentionally a safe local-only demo. The displayed status is illustrative and is not an official WhatsApp ban database. For real member persistence, add a protected backend/Supabase table with row-level security before collecting any user data.
