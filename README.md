# Kirpa Home Health Care — Website

A fast, mobile-first marketing site for Kirpa Home Health Care, built with
**Next.js (App Router)** for one-click **Vercel** hosting. The UI is a
pixel-faithful implementation of the Claude Design prototype in
`healthcare-website-redesign/` — Figtree typography, a navy (`#0C2C52`) / blue
(`#1466B8`) / orange (`#DD5A2A`) palette, soft cards, and rounded CTAs.

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript) — statically generated pages, great SEO
- **Resend** — emails every form submission to the business inbox
- Design reproduced with inline styles via a tiny `s()` CSS-string helper
  (`lib/style.ts`); hover/focus states live as utility classes in
  `app/globals.css`. The original prototype lives in `healthcare-website-redesign/`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home |
| `/services` | Full list of home-care services |
| `/request-service` | **Request a Service** form |
| `/careers` | **Careers** + quick-apply form (resume/cover-letter upload) |
| `/about` | About, values, team |
| `/contact` | Contact info, form, and map |

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

## Where the content lives

All copy and the services list live in **`lib/site.ts`** — a single source of
truth. Every claim there is grounded in the original kirpahomehealthcare.org
content. **Do not add promises the business hasn't made** (specific response
times, "free" assessments, guarantees, testimonials, pay/benefits, or service
areas beyond Ashburn, VA). Edit `lib/site.ts` to update services, contact info,
or careers wording site-wide.

## Forms → email (kirpahhc@gmail.com)

All three forms (Request a Service, Careers, Contact) POST to the serverless
route `app/api/contact/route.ts`, which emails the submission to the business.

**To turn it on (one step):**

1. Create a free account at [resend.com](https://resend.com) **using
   `kirpahhc@gmail.com`** (so test emails deliver to that inbox immediately).
2. Copy your API key.
3. Add it as an environment variable named `RESEND_API_KEY`
   (locally in `.env.local`, and in Vercel: **Project → Settings → Environment
   Variables**).

Recipient and sender are configurable via `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` (defaults: `kirpahhc@gmail.com` and
`onboarding@resend.dev`). For a branded sender like
`website@kirpahomehealthcare.org`, verify the domain in Resend and update
`CONTACT_FROM_EMAIL`.

> Until `RESEND_API_KEY` is set, forms still validate and offer a one-click
> "send by email instead" fallback that opens the visitor's email app addressed
> to kirpahhc@gmail.com — so no lead is ever lost.

Careers uploads (resume + cover letter) are sent as email attachments,
limited to 1 MB each (matching the original application form).

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel, **Add New → Project** and import the repo. Vercel auto-detects
   Next.js — no config needed.
3. Add the `RESEND_API_KEY` environment variable.
4. (Optional) Set `NEXT_PUBLIC_SITE_URL` to your final domain so canonical URLs,
   the sitemap, and Open Graph tags use it.
5. Deploy.

## Images & branding

- Photos in `public/images/` (`care-1`, `care-2`, `consulting`) are the actual
  images from the original kirpahomehealthcare.org site, used as placeholders
  until the business supplies its own. No images are fabricated/AI-generated.
  They're served through `next/image` (automatic resizing + modern formats).
- The logo is a **text wordmark** (the original site uses a text logo, not an
  image). To swap in a real logo later, update `components/Brand.tsx`.
- To change a photo, drop a new file in `public/images/` and update the `src`
  in the relevant page (`app/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`).

## SEO

- Per-page `<title>`/meta descriptions and canonical URLs
- Open Graph + Twitter cards (share image is a real site photo)
- JSON-LD `LocalBusiness` / `MedicalBusiness` structured data
- `sitemap.xml`, `robots.txt`, web manifest, SVG favicon (letter monogram)
- Semantic HTML, skip link, accessible focus states, `prefers-reduced-motion`
