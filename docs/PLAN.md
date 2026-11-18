# Jobsji — Technical & Delivery Plan

Companion to `docs/BRD.md`. Version 1.0 — 2026-01-18.

---

## 1. Recommendation summary (decision record)

| Decision | Choice | Rationale |
|---|---|---|
| Hosting (free) | **GitHub Pages** (`navin4489-ai.github.io/jobsji`) | Credentials already present on this machine, no card, native CI (Actions), HTTPS, custom-domain support for `jobsji.in` later, workflow is portable to Netlify/Cloudflare if needed |
| Framework | **Astro 5 (SSG) + TypeScript** | Content-first, zero client JS by default (fast), excellent SEO, trivial static deploy; islands used only for filtering UI |
| Styling | Hand-rolled CSS design system (custom properties, no framework) | No runtime cost, full control, no version churn risk |
| Interactivity | Vanilla TS in-page scripts (filter/search/pagination, mobile nav, mailto composers) | No React/Vue bundle; keeps Lighthouse high |
| Data store | Typed TS data modules (`src/data/*`) | Type-checked, reviewable in PRs, works on static hosts |
| Domain strategy | Free github.io URL now; `jobsji.in` via CNAME + DNS runbook (no CNAME file pushed until DNS is ready — pushing it early would break github.io serving) | Zero-cost launch, no downtime on cutover |
| Analytics | Optional Plausible snippet gated by env var | No cookie banner needed; disabled until configured |

**Not chosen:** Vercel/Netlify/Cloudflare Pages (better DX but require interactive auth we don't have), SSR frameworks (need a server), WordPress (cost + maintenance), SPA (bad SEO).

## 2. Architecture

```
                    ┌──────────────────────────────┐
  content files ───►│  Astro build (SSG)           │
  src/data/*.ts     │  - static HTML per page      │
  src/pages/*       │  - sitemap, RSS, robots       │
  src/components/*  │  - JSON-LD injected at build │
                    └──────────────┬───────────────┘
                                   │ dist/
                                   ▼
  git push main ──► GitHub Actions ──► GitHub Pages (CDN, HTTPS)
                                   │
                                   ▼
              https://navin4489-ai.github.io/jobsji/     ← launch URL
              https://jobsji.in/  (Phase 2: CNAME + GoDaddy A/CNAME records)
```

Client-side enhancement layer (progressive enhancement, content visible without JS):

- `/jobs` — filter/sort/paginate + URL sync (single `<script>` module).
- Header — mobile menu toggle.
- Employer/contact forms — compose `mailto:` with prefilled subject/body.

## 3. Repository structure

```
jobsji/
├── docs/
│   ├── BRD.md                  # business requirements
│   └── PLAN.md                 # this document
├── .github/workflows/deploy.yml  # CI: check → build → deploy Pages
├── public/
│   ├── favicon.svg
│   └── og.svg                  # social fallback image
├── src/
│   ├── config/site.ts          # SITE_URL + BASE_PATH (env-overridable)
│   ├── types.ts                # Job/Company/Category/Location types
│   ├── data/{jobs,companies,categories,locations}.ts
│   ├── lib/{links.ts,seo.ts,format.ts}
│   ├── styles/global.css       # design tokens + components
│   ├── layouts/BaseLayout.astro
│   ├── components/  (Header, Footer, JobCard, FilterPanel, Meta, Breadcrumb,
│   │                 Icon, Monogram, SectionHeading, CTA, EmptyState, …)
│   └── pages/
│       ├── index.astro
│       ├── jobs/index.astro  jobs/[slug].astro
│       ├── categories/index.astro  categories/[slug].astro
│       ├── locations/index.astro  locations/[slug].astro
│       ├── employers.astro  about.astro  contact.astro
│       ├── privacy.astro  terms.astro  404.astro
│       └── rss.xml.ts
├── package.json  astro.config.mjs  tsconfig.json  README.md
└── dist/                        # build output (git-ignored)
```

## 4. Quality gates (must pass before deploy)

| Gate | Command | Stage |
|---|---|---|
| Type/content check | `npm run check` (`astro check`) | local + CI |
| Production build | `npm run build` | local + CI |
| Internal link audit | script: every `href` in `dist/` resolves to a file/route | local |
| SEO sanity | every `dist/jobs/*/index.html` has `JobPosting` JSON-LD | local |
| Visual/responsive | manual pass at 320/768/1440 px | local |
| Live smoke test | HTTP 200 + content assertions on deployed URL | post-deploy |
| Lighthouse | ≥ 90 Perf/SEO/A11y on home + job detail | post-deploy |

## 5. Environments & configuration

| Env | SITE_URL | BASE_PATH | Set by |
|---|---|---|---|
| Local dev | `http://localhost:4321` | `/jobsji` | defaults in config |
| GitHub Pages | `https://navin4489-ai.github.io` | `/jobsji` | workflow env |
| Custom domain `jobsji.in` | `https://jobsji.in` | `/` | workflow env after DNS cutover |

Rule: `src/config/site.ts` and `astro.config.mjs` read the same env vars with identical
defaults; the workflow sets them explicitly so both agree.

## 6. SEO plan

- Unique title/description/canonical on every route; `noindex` on 404.
- JSON-LD: `Organization` + `WebSite` (home), `JobPosting` (each job),
  `BreadcrumbList` (jobs, categories, locations).
- `public/robots.txt` → allow all + sitemap URL; `@astrojs/sitemap` integration.
- RSS at `/rss.xml` (latest 20 jobs).
- Content rules: location/category pages carry unique intro copy (no boilerplate
  duplication); job pages render server-side full text (crawlable without JS).
- Post-launch: submit sitemap in Google Search Console + Bing Webmaster Tools.

## 7. Performance budget

| Metric | Budget |
|---|---|
| JS shipped (page level) | ≤ 25 KB gzip (only filter/nav scripts) |
| CSS | ≤ 15 KB gzip single stylesheet |
| Images | none in v1 (SVG icons + monograms) → no CLS risk |
| Fonts | system font stack (0 requests) |
| Third-party requests | 0 (analytics optional, deferred) |

## 8. Delivery phases

| Phase | Tasks | Status |
|---|---|---|
| **P0 — Discovery** | Tooling check, credential check, host selection | ✅ done |
| **P1 — Docs** | BRD + PLAN | ✅ this commit |
| **P2 — Scaffold** | Astro project, config, design system, types, data model | in progress |
| **P3 — Build** | Layout/components, all pages, filters, SEO layer, seed content | pending |
| **P4 — Verify** | `astro check`, build, link/SEO audits, local preview | pending |
| **P5 — Deploy** | Repo create, push, Pages enable, CI green, live smoke test | pending |
| **P6 — Handoff** | README runbooks (add job, custom domain, rollback), screenshots | pending |
| **Phase 2** | Applications backend, auth, employer dashboard, real content pipeline, domain cutover | backlog |

## 9. Runbooks

### 9.1 Add a job
1. Edit `src/data/jobs.ts` → append a `Job` object (slug unique, `postedAt` ISO date).
2. If the company/category/location is new, add it to the matching data file.
3. `npm run check && npm run build` → commit → push `main`.
4. CI deploys automatically; verify on the live URL (~1–3 min).

### 9.2 Custom domain cutover (`jobsji.in`)
1. In GoDaddy DNS: add **A records** `@ → 185.199.108.153, .109.153, .110.153, .111.153`
   and **CNAME** `www → navin4489-ai.github.io` (or `@` CNAME if GoDaddy alias available).
2. Repo → Settings → Pages → Custom domain → `jobsji.in` (or push `public/CNAME`).
3. Set workflow env: `SITE_URL: https://jobsji.in`, `BASE_PATH: /`.
4. Enable **Enforce HTTPS**; wait for DNS check; verify redirect from github.io.

### 9.3 Rollback
- Actions → previous successful run → **Re-run all jobs** (deploys that artifact), or
  `git revert <bad commit> && git push` (auto redeploys).

### 9.4 Migrate host later (optional)
Workflow only uploads `dist/`; same artifact works on Netlify/Cloudflare Pages with a
2-minute config change.

## 10. Definition of done (v1)

- [ ] All P0 FRs live on public URL
- [ ] Quality gates green in CI
- [ ] Lighthouse ≥ 90 (Perf/SEO/A11y)
- [ ] README with the three runbooks above
- [ ] BRD acceptance criteria (§16) signed off

## 11. Backlog (Phase 2 candidates)

1. Server-side applications (email/API) + anti-spam.
2. Employer auth, dashboard, payments (featured listings).
3. Saved searches / alerts (email, WhatsApp).
4. Real listing ingestion (RSS/ATS APIs) + editorial admin.
5. PWA/offline, dark mode, Hindi locale.
6. Search Console/Bing submission + rank tracking.
