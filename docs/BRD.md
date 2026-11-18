# Jobsji — Business Requirements Document (BRD)

| Field | Value |
|---|---|
| Product | **Jobsji** — India-focused job discovery portal |
| Planned domain | `jobsji.in` (registered; DNS not yet configured) |
| Launch domain (free) | `https://navin4489-ai.github.io/jobsji/` (GitHub Pages) |
| Document version | 1.0 |
| Date | 2026-11-18 |
| Status | Approved for build |
| Owner | Product / Founder |

---

## 1. Executive summary

Jobsji is a public job board that helps job seekers in India discover roles by skill,
category, location and employment type, and gives employers a low-friction channel to
publish openings. Release 1.0 is a **static, SEO-first, production-grade website** with a
content-file publishing pipeline (no backend required), deployed free of cost, and ready
to be pointed at `jobsji.in` when DNS is configured.

## 2. Problem & opportunity

- Job seekers juggle multiple boards and search engines; niche/skill-based discovery in
  Indian tier-2/3 markets is weak.
- Small employers cannot afford premium ATS boards; they need an affordable, indexed
  listing surface.
- Jobsji already owns the brand domain; a fast, indexable site converts organic search
  traffic into both seeker and employer growth.

## 3. Objectives (measurable)

| # | Objective | Success criterion (first 90 days) |
|---|---|---|
| O1 | Launch a production-quality site | 0 broken pages, Lighthouse ≥ 90 (Perf/SEO/A11y) |
| O2 | Be discoverable | 100% of job/category/location pages have unique SEO meta + JSON-LD; sitemap + RSS live |
| O3 | Enable content operations | A new job can be published with one file edit + `npm run build` (documented, < 10 min) |
| O4 | Zero infrastructure cost | Hosting free (GitHub Pages), no paid services required for v1 |
| O5 | Brand-domain readiness | One-command switch to `jobsji.in` (documented DNS + config runbook) |

## 4. Scope

**In scope (Release 1.0)**

1. Home page: search entry, featured/latest jobs, categories, locations, trust content.
2. Jobs listing: keyword + category + location + type + experience + salary filters,
   sorting, pagination, URL-synced state.
3. Job detail: full description, responsibilities, requirements, benefits, apply CTA,
   related jobs, breadcrumbs, `JobPosting` structured data.
4. Category and location landing pages (SEO landing surface).
5. Employer page: value proposition, pricing, "Post a job" enquiry flow.
6. About, Contact, Privacy, Terms, 404.
7. SEO infrastructure: sitemap, robots, RSS, canonical/OG tags, JSON-LD (Organization,
   WebSite, JobPosting, BreadcrumbList).
8. Content pipeline: typed data model + documented add-a-job workflow.
9. CI/CD: push-to-main automated build, test (`astro check`), deploy to GitHub Pages.

**Out of scope (Release 1.0)** — deferred to Phase 2 (see PLAN):

- Real user accounts, saved jobs, application tracking.
- Employer self-service dashboard and payment collection.
- Server-side application submissions (v1 uses `mailto:`/external apply links).
- Job aggregator ingestion / third-party feeds.
- Native apps, email digests, WhatsApp alerts.

## 5. Personas

| Persona | Description | Primary need | v1 support |
|---|---|---|---|
| **Priya — Job seeker** | 2–5 yrs exp, Bengaluru, searches on mobile | Relevant jobs fast, salary transparency | Search/filter, clear salary/type meta, apply CTA |
| **Rahul — Fresher** | Recent graduate, tier-2 city | Entry-level/internship roles, remote | Experience filter, "Entry level" chips, remote jobs |
| **Neha — SME employer** | 20-person startup, no ATS | Affordable reach, quick publish | Employer page, pricing, mailto publish flow |
| **Search engine** | Google/Bing crawlers | Structured, unique content | SSR pages, sitemap, JSON-LD, RSS |

## 6. Key user journeys

1. **Search → apply:** Home → keyword/location search → filtered list → job detail →
   Apply (external ATS link or prefilled email).
2. **Browse by intent:** Home → category/location landing → list → detail → apply.
3. **Employer publish:** Employers page → pricing → prefilled "Post a job" email →
   editorial review → published via content file.

## 7. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Home page renders latest + featured jobs (max 6 each) | P0 |
| FR-02 | Search accepts keyword and submits to `/jobs?q=` | P0 |
| FR-03 | Jobs list filters: keyword, category, location, job type, experience level, minimum salary; sort by relevance/newest/salary; paginate (10/page) | P0 |
| FR-04 | Filter state reflected in URL query string (shareable/bookmarkable) | P1 |
| FR-05 | Job detail page per job with full content + apply CTA | P0 |
| FR-06 | Related jobs (same category, excludes current, max 3) | P1 |
| FR-07 | Category index + category pages listing their jobs | P0 |
| FR-08 | Location index + location pages listing their jobs | P1 |
| FR-09 | Employer page with pricing tiers and post-a-job enquiry | P0 |
| FR-10 | Contact form composing a prefilled email (no backend) | P1 |
| FR-11 | RSS feed of latest 20 jobs | P1 |
| FR-12 | Sitemap index covering all pages | P0 |
| FR-13 | 404 page with recovery links | P1 |
| FR-14 | "Add a job" documented as editing one data file | P0 |
| FR-15 | Empty-state messaging when filters match nothing | P1 |

## 8. Non-functional requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Performance | Lighthouse Perf ≥ 90; FCP < 1.5 s on 4G; no layout shift (CLS < 0.1); zero third-party runtime requests in v1 |
| NFR-02 | SEO | Unique `<title>`/`meta description`/canonical per page; JSON-LD on home, jobs, job detail, breadcrumbs |
| NFR-03 | Accessibility | Semantic landmarks, visible focus, labelled controls, WCAG 2.1 AA colour contrast |
| NFR-04 | Browser support | Last 2 versions of Chrome/Firefox/Edge/Safari; responsive 320 px → 1440 px |
| NFR-05 | Security & privacy | Static hosting (no server attack surface), HTTPS enforced, privacy policy page, no PII collected in v1 |
| NFR-06 | Availability | 99.9% (GitHub Pages SLA + CDN) |
| NFR-07 | Maintainability | Type-checked data model; `astro check` + build must pass in CI before deploy |
| NFR-08 | Cost | ₹0 for v1 hosting/CI |

## 9. Data model (v1)

```
Job        { slug, title, companySlug, categorySlug, locationSlug, city, workplace
             (onsite|hybrid|remote), employmentType (fulltime|parttime|contract|
             internship), experienceMin, experienceMax, salaryMin, salaryMax,
             salaryCurrency: "INR", skills[], openings, postedAt, validThrough?,
             summary, description, responsibilities[], requirements[], benefits[],
             applyUrl? | applyEmail?, featured, urgent }
Company    { slug, name, tagline, about, website, color }
Category   { slug, name, description, icon }
Location   { slug, name, state, description? }
```

## 10. Content & operations model

- Single source of truth: typed TypeScript data files under `src/data/`.
- Publishing a job = append one object + commit; CI builds and deploys automatically.
- Editorial policy: employers' submissions are verified manually before publishing
  (anti-spam control for v1; automation deferred to Phase 2).
- Seed content in v1 is **illustrative** (sample companies/roles) to demonstrate layout,
  SEO and search; replaced progressively with live listings.

## 11. Monetization options (post-launch)

1. Featured listings (highlighted badge + homepage slot).
2. Sponsored category takeovers.
3. Google AdSense (once traffic thresholds are met).
4. Resume-review / profile services.

## 12. Success metrics / KPIs

| KPI | Baseline target |
|---|---|
| Indexed pages (Search Console) | ≥ 30 within 30 days |
| Organic sessions | ≥ 500/month by day 90 |
| Search → detail CTR | ≥ 35% of listing sessions |
| Apply CTR | ≥ 8% of job detail sessions |
| Employer enquiries | ≥ 5/week by day 60 |
| Lighthouse (Perf/SEO/A11y) | ≥ 90 each |

## 13. Assumptions & dependencies

| # | Assumption / dependency | Impact if wrong |
|---|---|---|
| A1 | GitHub account `navin4489-ai` remains the hosting account | Re-point repo + workflow |
| A2 | `jobsji.in` DNS can be configured later (GoDaddy) | Site stays on `github.io` URL |
| A3 | No backend/database needed for v1 | Phase 2 required earlier |
| A4 | Apply flows via external links / `mailto:` acceptable for seed stage | Integrate form backend sooner |
| A5 | Illustrative seed content is acceptable at launch | Content ops must supply real jobs pre-launch |

## 14. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Free host downtime/rate limits | Low | Medium | Static + CDN; migrate to Cloudflare/Netlify later (workflow portable) |
| Duplicate/thin content across location pages | Medium | Medium | Unique copy per landing page; canonical tags |
| Spam employer submissions | Medium | Medium | Manual editorial review in v1 |
| DNS misconfiguration during domain cutover | Medium | High | Documented runbook, github.io URL kept working during transition |
| Content staleness | Medium | Medium | `validThrough` dates + monthly audit |

## 15. Milestones

| Milestone | Deliverable | Est. |
|---|---|---|
| M1 | BRD + technical PLAN approved | Done (docs/) |
| M2 | Site implemented (all P0 pages + filters + SEO) | Day 1 |
| M3 | Quality gates green (`astro check`, build, link check) | Day 1 |
| M4 | Deployed to free URL via CI, live verification | Day 1 |
| M5 | Domain cutover to `jobsji.in` (when DNS ready) | Day 2 |
| M6 | Real content onboarding + Search Console submit | Week 1 |
| Phase 2 | Accounts, applications backend, employer dashboard | Weeks 2–8 |

## 16. Acceptance criteria (Release 1.0)

1. All P0 functional requirements demonstrable on the live URL.
2. `npm run check` and `npm run build` pass locally and in CI.
3. Lighthouse ≥ 90 on Performance, SEO, Accessibility for home and a job detail page.
4. Sitemap and RSS reachable and contain every public page/job.
5. Site fully usable at 320 px width and with JavaScript disabled (content visible).
6. Runbooks exist for: add a job, add a category, custom-domain cutover, rollback.

## 17. Open questions

- Final brand colour/visual identity? (Assumed: indigo + amber, pending founder sign-off.)
- Will `hello@jobsji.in` / `apply@jobsji.in` mailboxes be created? (Needed for mailto flows.)
- Employer pricing: free vs paid featured tiers at launch?
