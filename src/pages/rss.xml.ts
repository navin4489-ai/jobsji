import type { APIRoute } from 'astro';
import { newestJobs } from '../lib/jobs';
import { companyBySlug } from '../data/companies';
import { categoryBySlug } from '../data/categories';
import { absoluteUrl } from '../lib/links';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, CONTACT_EMAIL } from '../config/site';
import { formatSalary } from '../lib/format';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = () => {
  const jobs = newestJobs(20);

  const items = jobs
    .map((job) => {
      const company = companyBySlug.get(job.companySlug);
      const category = categoryBySlug.get(job.categorySlug);
      const link = absoluteUrl(`/jobs/${job.slug}`, SITE_URL);
      const title = `${job.title} at ${company?.name ?? 'Hiring'} — ${job.city}`;
      const description = [
        job.summary,
        formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod),
        category ? `Category: ${category.name}` : '',
      ]
        .filter(Boolean)
        .join(' · ');

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(`${job.postedAt}T06:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(category?.name ?? 'Jobs')}</category>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — latest jobs`)}</title>
    <link>${escapeXml(`${SITE_URL}/`)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${escapeXml(CONTACT_EMAIL)} (${escapeXml(SITE_NAME)})</managingEditor>
    <atom:link href="${escapeXml(absoluteUrl('/rss.xml', SITE_URL))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
