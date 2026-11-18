import type { Company, Job, Location } from '../types';
import { SITE_NAME, SITE_URL } from '../config/site';
import { absoluteUrl } from './links';
import { EMPLOYMENT_TYPE_LABEL } from './format';

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/favicon.svg', SITE_URL),
    description: `India-focused job discovery portal run by ${SITE_NAME}.`,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/jobs', SITE_URL)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, SITE_URL),
    })),
  };
}

export function jobPostingJsonLd(
  job: Job,
  company: Company,
  location: Location,
): Record<string, unknown> {
  const employmentMap: Record<string, string> = {
    fulltime: 'FULL_TIME',
    parttime: 'PART_TIME',
    contract: 'CONTRACT',
    internship: 'INTERN',
  };

  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: job.city,
    addressCountry: 'IN',
  };
  if (job.workplace !== 'remote') {
    address.addressRegion = location.state;
  }

  const post: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: [job.summary, job.description, ...job.requirements]
      .join(' ')
      .trim(),
    datePosted: job.postedAt,
    employmentType: employmentMap[job.employmentType] ?? 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: company.website,
    },
    jobLocation: {
      '@type': 'Place',
      address,
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: job.salaryPeriod === 'month' ? 'MONTH' : 'YEAR',
      },
    },
    totalOpenings: job.openings,
    skills: job.skills.join(', '),
    directApply: true,
    jobLocationType: job.workplace === 'remote' ? 'TELECOMMUTE' : undefined,
  };

  if (job.validThrough) post.validThrough = job.validThrough;
  if (post.jobLocationType === undefined) delete post.jobLocationType;

  return post;
}

/** Short human label used in meta descriptions, e.g. "Full-time · Bengaluru" */
export function jobMetaSuffix(job: Job): string {
  return `${EMPLOYMENT_TYPE_LABEL[job.employmentType]} · ${job.city}`;
}
