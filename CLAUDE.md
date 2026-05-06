# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint via Next.js
```

No test framework is configured.

## Architecture

**Neurofarma** is a Next.js 14 (App Router) B2B portal for healthcare professionals to register, manage their profile, view clinical events, and access educational content.

**Stack:** TypeScript · Tailwind CSS · Supabase (auth + PostgreSQL) · react-hook-form + Zod · lucide-react

### Routing

| Route | Notes |
|---|---|
| `/` | Landing: Hero, Benefits, Steps sections |
| `/cadastro` | Registration form → POST `/api/cadastro` |
| `/login` | Login form (currently placeholder — no real auth wired yet) |
| `/dashboard` | **Protected** — stats, events, content feed |
| `/medicos` | Doctor listing with client-side filters |
| `/planos` | 3-tier pricing table |
| `/api/cadastro` | Creates Supabase Auth user + inserts into `profissionais` table |
| `/auth/callback` | Supabase email link callback — exchanges code for session |

### Middleware (`middleware.ts`)

Edge Runtime middleware that:
- Blocks `/dashboard` for unauthenticated users (redirects to `/login?next=/dashboard`)
- Redirects already-authenticated users away from `/login` and `/cadastro`
- Uses Supabase SSR client for secure cookie-based session handling

### Data flow

Registration: CadastroForm → Zod client validation → POST `/api/cadastro` → server Zod re-validation → `supabaseAdmin.auth.admin.createUser` → insert into `profissionais` → send password reset email → user clicks link → `/auth/callback` → session set → `/dashboard`

### `src/lib/` key files

- `supabase.ts` — exports `supabase` (anon key, client/SSR) and `supabaseAdmin` (service role key, server only)
- `validations.ts` — Zod schemas for cadastro and login; all messages in Portuguese
- `constants.ts` — `ESPECIALIDADES` list, plan definitions, mock data
- `utils.ts` — `cn()` for Tailwind class merging

### Component patterns

All UI components in `src/components/ui/` use `forwardRef`, accept `className` for Tailwind customization, and use `cn()` to merge classes. Button has `variant` (primary, secondary, outline, ghost) and `size` (sm, md, lg) props.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server-side only, never expose to client
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Copy `.env.example` to `.env.local` before running locally.

## Database

Supabase PostgreSQL with three tables: `profissionais`, `encontros`, `inscricoes`. See README.md for the full SQL schema. Tables must be created manually in the Supabase dashboard — they are not yet migrated.

## Known gaps (per README roadmap)

- Login page has no real auth implementation yet (shows a success screen)
- Supabase tables not yet created
- No payment processing (Stripe planned)
- `/produtos` and `/servicos` are placeholder pages
