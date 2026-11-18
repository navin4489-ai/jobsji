# Jobsji — job discovery portal for India

Production-ready, SEO-first static job board built with **Astro 5 + TypeScript**.
Free hosting on **GitHub Pages**, free custom-domain support for `jobsji.in`.

| | |
|---|---|
| Live (launch) | https://navin4489-ai.github.io/jobsji/ |
| Permanent domain | https://jobsji.in/ (DNS cutover runbook below) |
| Docs | [`docs/BRD.md`](docs/BRD.md) · [`docs/PLAN.md`](docs/PLAN.md) |
| Stack | Astro 5 (SSG) · TypeScript strict · hand-rolled CSS · zero client frameworks |

## Features

- **Home** — hero search, live stats, featured/latest jobs, categories, locations, how-it-works.
- **Jobs listing** — keyword + category + location + work mode + type + experience + salary filters, sorting, pagination, all synced to the URL (shareable links).
- **Job detail** — full description, responsibilities, requirements, benefits, apply CTA (external ATS or prefilled email), related jobs, copy-link.
- **SEO** — unique meta/canonical per page, `JobPosting` + `BreadcrumbList` + `Organization`/`WebSite` JSON-LD, sitemap, robots.txt, RSS, OG/Twitter cards.
- **Employer funnel** — pricing tiers, post-a-job form (composes an email), FAQ.
- **Content pipeline** — one typed data file per entity; publishing a job is a one-file edit.

## Quickstart

```bash
npm install
npm run dev      # http://localhost:4321/jobsji
npm run check    # astro check (types + templates)
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
```

## Project layout

```
docs/BRD.md · docs/PLAN.md   # business requirements + technical plan
src/data/                    # jobs, companies, categories, locations (typed)
src/pages/                   # routes (SSG)
src/components/              # JobCard, Header, Footer, filters UI, …
src/lib/                     # jobs helpers, SEO/JSON-LD, formatting, links
.github/workflows/deploy.yml # CI: check → build → deploy Pages
```

## Runbook: add a job

1. Append a `Job` object to `src/data/jobs.ts` (types in `src/types.ts`).
   New company/category/location? Add it to the matching file first.
2. `npm run check && npm run build`
3. Commit and push `main` — CI deploys automatically (1–3 min).

## Runbook: custom domain (`jobsji.in`)

> Don’t add a `CNAME` file until DNS is ready — GitHub would redirect the free
> `github.io` URL to a domain that doesn’t resolve yet.

1. **GoDaddy DNS** → add records:
   - `@` → A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` → CNAME: `navin4489-ai.github.io`
2. Repo → **Settings → Pages → Custom domain** → `jobsji.in` (or add `public/CNAME`).
3. Update the workflow env: `SITE_URL: https://jobsji.in` and `BASE_PATH: /`, then push.
4. Enable **Enforce HTTPS** once the DNS check passes.

## Runbook: rollback

Actions → last good run → **Re-run all jobs**, or `git revert <bad-commit> && git push`.

## Quality gates

`npm run check` and `npm run build` must pass locally and in CI; internal-link,
JSON-LD and Lighthouse (≥ 90 perf/SEO/a11y) audits are documented in `docs/PLAN.md` §4.

## Notes

- Seed listings/companies are **illustrative** (reserved `example.com` links) and are
  replaced through the content pipeline — see `docs/BRD.md` §10.
- Contact/apply flows use `mailto:` (no backend in v1) — swap in a form API in Phase 2.
- Optional analytics: set `PUBLIC_PLAUSIBLE_DOMAIN` at build time to enable Plausible.
