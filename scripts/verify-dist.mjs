#!/usr/bin/env node
/**
 * Post-build verification for Jobsji (docs/PLAN.md §4 quality gates).
 *  - every internal href/src in dist/ resolves to a real file
 *  - every page has a canonical link
 *  - every job detail page contains JobPosting JSON-LD that parses
 *  - sitemap, robots and RSS exist and cover all jobs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const BASE = process.env.BASE_PATH || '/jobsji';
const errors = [];
const warnings = [];

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('✖ dist/index.html missing — run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

function distPathFor(url) {
  let path = url.split('#')[0].split('?')[0];
  if (path.startsWith(BASE)) path = path.slice(BASE.length);
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.endsWith('/')) path += 'index.html';
  const target = join(DIST, path);
  if (existsSync(target) && statSync(target).isDirectory()) return join(target, 'index.html');
  if (!existsSync(target) && existsSync(`${target}.html`)) return `${target}.html`;
  return target;
}

// 1. Link audit
let linkCount = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const matches = html.matchAll(/(?:href|src)="([^"]+)"/g);
  for (const [, url] of matches) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(url)) continue;
    linkCount++;
    if (!existsSync(distPathFor(url))) {
      errors.push(`broken link in ${file.replace(DIST, 'dist')}: ${url}`);
    }
  }
}

// 2. Canonical + noindex sanity
for (const file of htmlFiles) {
  const rel = file.replace(DIST, 'dist');
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<link rel="canonical"')) errors.push(`missing canonical: ${rel}`);
  if (rel.endsWith('404.html') && !html.includes('noindex')) errors.push(`404 page must be noindex: ${rel}`);
}

// 3. JobPosting JSON-LD on every job page
const jobPages = htmlFiles.filter((f) => {
  const rel = f.replace(/\\/g, '/');
  return rel.includes('/dist/jobs/') && !rel.endsWith('/dist/jobs/index.html');
});
if (jobPages.length === 0) errors.push('no job detail pages generated');
for (const file of jobPages) {
  const rel = file.replace(DIST, 'dist');
  const html = readFileSync(file, 'utf8');
  const lds = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (lds.length === 0) {
    errors.push(`missing JSON-LD: ${rel}`);
    continue;
  }
  let hasJobPosting = false;
  for (const [, raw] of lds) {
    try {
      const parsed = JSON.parse(raw);
      const types = Array.isArray(parsed) ? parsed.map((p) => p['@type']) : [parsed['@type']];
      if (types.includes('JobPosting')) hasJobPosting = true;
    } catch (e) {
      errors.push(`invalid JSON-LD in ${rel}: ${e.message}`);
    }
  }
  if (!hasJobPosting) errors.push(`JobPosting JSON-LD missing: ${rel}`);
}

// 4. Sitemap / robots / RSS
const sitemapFiles = files.filter((f) => /sitemap.*\.xml$/.test(f));
if (sitemapFiles.length === 0) errors.push('sitemap missing from dist/');
else {
  const sitemap = sitemapFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
  const jobUrls = jobPages.map((f) => {
    const rel = f
      .replace(`${DIST}`, '')
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/, '');
    return `${BASE}${rel}`;
  });
  for (const url of jobUrls) {
    if (!sitemap.includes(url)) errors.push(`job missing from sitemap: ${url}`);
  }
}

if (!existsSync(join(DIST, 'robots.txt'))) errors.push('robots.txt missing');
else {
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
  if (!robots.includes('Sitemap:')) errors.push('robots.txt missing Sitemap line');
}

if (!existsSync(join(DIST, 'rss.xml'))) errors.push('rss.xml missing');
else {
  const rss = readFileSync(join(DIST, 'rss.xml'), 'utf8');
  if (!rss.includes('<item>')) warnings.push('rss.xml has no items');
}

// 5. Home page sanity
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!home.includes('Jobsji')) errors.push('home page missing brand');
if (!/<h1[\s>]/.test(home)) errors.push('home page missing h1');

console.log(`checked ${htmlFiles.length} pages, ${linkCount} internal references, ${jobPages.length} job pages`);
for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
console.log('✔ dist verification passed');
