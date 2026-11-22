# NITIN DHURVE — BEYOND THE CODE

Portfolio 2.0: an animated, security-first Next.js portfolio with a Vercel Blob-backed résumé manager.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP · Motion · Lenis · Lucide · Vercel Blob · Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the two server secrets; Blob vars come from `vercel env pull`
npm run dev
```

For a fully local résumé test, pull the project's development env vars:

```bash
vercel env pull .env.local
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
| `/projects` | Searchable/filterable archive of 54 curated projects |
| `/projects/[slug]` | Individual case studies |
| `/skills` | Skill groups by domain |
| `/certifications` | Certificate gallery with source images |
| `/journey` | Year-by-year narrative |
| `/resume` | Public read-only résumé preview + stable download link (light/dark) |
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

Certificate images in `public/images/certificates/` were converted from the owner's local documents. Images with untranscribed titles are labelled `title not yet confirmed`. Entries whose exact title could not be confirmed and which were not actual certificates have been removed from the gallery.

## Résumé management (Vercel Blob)

Writes are **deny-by-default**. Without Blob storage plus both server secrets, `/admin/resume` shows a locked state and every write endpoint returns `503`. No insecure uploader is deployed.

### 1. Storage

A public Vercel Blob store is connected to the Vercel project:

```bash
vercel storage create nitin-resume --type blob --access public
vercel storage connect nitin-resume
```

On Vercel this injects `BLOB_STORE_ID` and a rotating `VERCEL_OIDC_TOKEN`; `@vercel/blob` uses them automatically. The public base URL is also stored as `BLOB_PUBLIC_BASE_URL` so manifest reads are immediate and never depend on the eventually-consistent Blob list API. Never add `NEXT_PUBLIC_` to a Blob credential.

### 2. Server secrets

Set these in the Vercel project (Production, Preview and Development):

```bash
RESUME_ADMIN_PASSWORD=<strong random password>
RESUME_SESSION_SECRET=<openssl rand -hex 32>
NEXT_PUBLIC_SITE_URL=https://nitinstechfolio.vercel.app
```

The password is compared with a timing-safe digest; the session secret signs an HttpOnly, SameSite cookie. Neither value is ever committed or sent to the browser. A local copy of the generated credentials is kept at `/home/kali/portfolio/.resume-admin-credentials` (gitignored).

### 3. Publish flow

1. Sign in at `/admin/resume` with the admin password.
2. Upload a PDF (≤ 10 MB) — the server checks MIME, size and the `%PDF-` magic bytes.
3. The upload is stored under `resumes/<uuid>.pdf` as a **draft**; the active version is unchanged.
4. Publish or restore a version from Version history. The manifest at `resume/manifest.json` is atomically updated, so no redeploy is needed.
5. Inactive versions can be deleted; the active version is protected from deletion.

The public link `/api/resume/download` always resolves to the active version (302 → Blob download URL). `?inline=1` serves it for the `/resume` iframe preview.

### Security details

- Signed-cookie session check on every sensitive endpoint; missing/invalid session returns `401`.
- Origin checks on all state-changing requests; SameSite + HttpOnly cookies.
- Rate limits for sign-in and admin mutations.
- Randomized storage keys and an audit trail for upload/publish/restore/delete.
- No filesystem uploads; no hardcoded passwords; no service-role key.
- `/admin/resume` is `robots: noindex`, absent from navigation and sitemap.
- Résumé viewer supports light/dark themes and is mobile responsive.

## Deployment

The repo is linked to Vercel. Production deployment:

```bash
vercel --prod
```

The production domain is `https://nitinstechfolio.vercel.app`. Set the environment variables above before deploying if résumé management is required; otherwise the public site still works and writes stay safely disabled.

## Honesty notes

- GitHub repository count (93) was read from the GitHub API on 22 Nov 2026; the live GitHub section falls back to a labelled snapshot when the API is unavailable.
- Exact TryHackMe league ranks, ROS challenge rank, Indian Army internship dates, and several certificate titles remain pending confirmation and are marked as such.
- Mobile device frames on the homepage are explicitly labelled stylised placeholders; no app screenshots were supplied.
- WorkLedger source is private; no private code or undisclosed architecture is published.
