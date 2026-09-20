# AGENTS.md

Thinkbox — a Next.js 15 personal-cloud-storage app backed by Appwrite.

## Project structure & routing

- `app/` — Next.js App Router, route groups:
  - `app/(root)/` — authenticated area (dashboard at `/`, type pages at `/[type]`). Layout calls `getCurrentUser()` and `redirect("/sign-in")` if no session. Marked `force-dynamic`.
  - `app/(auth)/` — public auth area (`/sign-in`, `/sign-up`). Redirects to `/` if already logged in.
- `lib/actions/*.actions.ts` — **server actions** (`"use server"`). All Appwrite calls live here. Client components import these directly and `await` them.
- `lib/appwrite/index.ts` — two Appwrite client factories:
  - `createAdminClient` — uses `NEXT_APPWRITE_KEY` (server secret), has `account`, `databases`, `storage`, `avatars`.
  - `createSessionClient` — uses the `appwrite-session` cookie, has `account` and `databases` only (no `storage`).
- `lib/appwrite/config.ts` — `required()` helper reads env vars and throws if missing; also strips surrounding quotes from values.
- `components/ui/` — ShadCN UI (do not hand-edit; use `npx shadcn-ui@latest add`).
- Path alias `@/*` maps to the project root (`tsconfig.json` + `next.config.ts`).

## Commands

| Command       | What it does                          |
|---------------|---------------------------------------|
| `npm run dev` | Start Turbopack dev server on :3000   |
| `npm run build` | Production build                    |
| `npm run lint`  | Run ESLint (Next.js core-web-vitals)  |

No test script exists and there are no test files. No CI workflows, no `opencode.json`.

## Environment

- `.env.local` is required (git-ignored). Copy from `.env.example`:
  - `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT`, `NEXT_PUBLIC_APPWRITE_DATABASE`, `NEXT_PUBLIC_APPWRITE_FILES_COLLECTION`, `NEXT_PUBLIC_APPWRITE_BUCKET`
  - `NEXT_PUBLIC_APPWRITE_USERS_COLLECTION` (actual value in `.env.local` is `"users"`, the collection **name** not an ID)
  - `NEXT_APPWRITE_KEY` — **server-only** secret key; never expose in client components.
- Appwrite auth is **OTP-based**, not password:
  1. `AuthForm` submits email → `sendEmailOTP` → `account.createEmailToken`.
  2. `OTPModal` prompts for the 6-digit code → `verifySecret` uses `account.createSession(accountId, password)` where "password" is the OTP.
- Session cookie `appwrite-session` is `httpOnly`, `secure`, `sameSite: "strict"`.

## Critical quirks & conventions

- **Tailwind v4+** — no `tailwind.config.ts` file exists (despite `components.json` referencing it). All Tailwind config lives in `app/globals.css` using the new `@import`, `@theme`, `@utility` at-rules. Do not create `tailwind.config.ts`.
- **Build tolerates errors** — `next.config.ts` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`. The build will pass even with type or lint errors. Always run `npm run lint` separately to catch both.
- **`parseStringify`** (`lib/utils.ts`) wraps every Appwrite response with `JSON.parse(JSON.stringify(...))`. Appwrite SDK returns non-serializable objects; this converts them to plain JSON and revalidates React cache. Use it on all action return values.
- **`revalidatePath(path)`** is called after every file write/delete/rename so the UI updates. The `path` comes from `usePathname()` passed through from client components.
- **`force-dynamic`** is exported on every Server Component that reads the session (layouts, `sign-in` page). Without it, Next.js will cache and the app appears "stuck" logged out.
- **`SegmentParams`** (in `types/index.d.ts`) is referenced but never defined — it relies on the AppRouter types or `ignoreBuildErrors`. Don't remove it.
- **`node-appwrite` import**: `InputFile` comes from the `node-appwrite/file` subpath (`import { InputFile } from "node-appwrite/file"`), not the package root.
- File uploads use `InputFile.fromBuffer(file, file.name)` — the File is read as an in-memory Buffer, not a path.
- Max file size is 50 MB (`MAX_FILE_SIZE` in `constants/index.ts`).
- The `files` collection schema only has attributes that are explicitly defined in the Appwrite console. The document must include required attributes (e.g. `bucketField`) and must not include attributes not defined in the collection (e.g. `bucketFileId`). Appwrite throws `document_invalid_structure` on mismatch. The storage file ID is NOT a stored attribute — extract it from the `url` field at runtime when needed for delete/download.
- ShadCN components in `components/ui/` are auto-generated — edit config, don't hand-modify those files.
