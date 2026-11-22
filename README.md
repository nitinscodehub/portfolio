# NITIN DHURVE — BEYOND THE CODE

Portfolio 2.0: an animated, security-first Next.js portfolio with a Supabase-backed résumé manager.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP · Motion · Lenis · Lucide · Supabase Auth/Postgres/Storage · Vercel.

## Local development

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run typecheck
npm run lint
npm run build
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic landing page |
| `/about` | Profile, education, principles |
| `/achievements` | Achievement hall with verification labels |
| `/experience` | Filterable experience timeline |
| `/projects` | Searchable/filterable archive of 66 projects |
| `/projects/[slug]` | Individual case studies |
| `/skills` | Skill groups by domain |
| `/certifications` | Certificate gallery with source images |
| `/journey` | Year-by-year narrative |
| `/resume` | Public read-only résumé preview + stable download link |
| `/contact` | Professional profiles |
| `/admin/resume` | Private owner-only résumé manager (never linked publicly) |

## Editing content

All site content lives in `src/data/*.ts`:

- `profile.ts` — name, headline, bio, stats
- `socials.ts` — professional links
- `nav.ts` — public navigation (admin routes intentionally excluded)
- `achievements.ts` — results with `verification` status
- `experience.ts` — roles and internships
- `projects.ts` — project archive and case-study copy
- `skills.ts`, `certifications.ts`, `journey.ts`

**Content policy:** never add fabricated achievements, statistics, certificates or results. Where official evidence was not supplied, entries are labelled `Self-reported` or `Pending confirmation`. Unverified personal projects (Milestone+, BhaktiCount) are labelled and have no repository link. Security work is described as authorized, defensive research only.

Certificate images in `public/images/certificates/` were converted from the owner's local documents. Images with untranscribed titles are labelled `title not yet confirmed`.

## Résumé management (Supabase)

Writes are **deny-by-default**. Without credentials and an explicit admin allowlist, `/admin/resume` shows a locked state and every write endpoint returns `503`. No insecure uploader is deployed.

### 1. Database

Run [`supabase/migrations/0001_resume_system.sql`](supabase/migrations/0001_resume_system.sql) in the Supabase SQL editor. It creates:

- private `resumes` bucket (PDF only, 10 MB limit)
- `resume_versions` with exactly one active row (partial unique index)
- `resume_audit_log` and `resume_rate_limits`
- server-only functions for atomic version creation, publish/restore, deletion and rate limiting

RLS is enabled with **no anon/authenticated policies**. All access is through server-side route handlers using the service role key, which is never sent to the browser.

### 2. Environment

Copy `.env.example` to `.env.local` (or set the same variables in Vercel):

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-url.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...              # server only
RESUME_ADMIN_IDS=<supabase-auth-user-uuid>  # immutable UUID, deny by default
# RESUME_ADMIN_EMAILS=owner@example.com     # optional fallback identity
```

Create the admin user in Supabase Authentication (email + password), then put that user's **UUID** in `RESUME_ADMIN_IDS`.

### 3. Publish flow

1. Sign in at `/admin/resume`.
2. Drag a PDF (≤ 10 MB) into the upload panel — it is validated client-side and again server-side (`%PDF-` magic bytes, MIME, size).
3. Preview it locally before upload. The uploaded version is stored as a **draft**.
4. Publish or restore a version from Version history. This atomically flips the active row.
5. Deletion is only allowed for inactive versions and removes the private storage object.

The public link `/api/resume/download` always serves the active version; `?inline=1` serves it for the `/resume` iframe preview. Updating a résumé never requires a redeploy.

### Security details

- Server-side `getUser()` on every sensitive endpoint; 401 unauthenticated, 403 non-admin.
- Origin checks on all state-changing requests; SameSite auth cookies.
- Database-backed rate limits for sign-in and admin mutations.
- Randomized storage keys (`resumes/<uuid>.pdf`) and audit log entries for upload/publish/restore/delete.
- No filesystem uploads; no hardcoded passwords; no service-role exposure.
- `/admin/resume` is `robots: noindex` and absent from navigation and sitemap.

## Deployment

The repo is linked to Vercel. Production deployment:

```bash
vercel --prod
```

Set the environment variables in the Vercel project before deploying if résumé management is required. Without them, the public site is fully functional and writes stay safely disabled.

## Honesty notes

- GitHub repository count (93) was read from the GitHub API on 22 Nov 2026; the live GitHub section falls back to a labelled snapshot when the API is unavailable.
- Exact TryHackMe league ranks, ROS challenge rank, Indian Army internship dates, and several certificate titles remain pending confirmation and are marked as such.
- Mobile device frames on the homepage are explicitly labelled stylised placeholders; no app screenshots were supplied.
- WorkLedger source is private; no private code or undisclosed architecture is published.
