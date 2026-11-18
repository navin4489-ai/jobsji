import type { Job } from '../types';
import { jobs } from '../data/jobs';

function postedDesc(a: Job, b: Job): number {
  return b.postedAt.localeCompare(a.postedAt);
}

/** Jobs that have not passed their validThrough date, newest first. */
export function activeJobs(now: Date = new Date()): Job[] {
  const today = now.toISOString().slice(0, 10);
  return jobs
    .filter((job) => !job.validThrough || job.validThrough >= today)
    .sort(postedDesc);
}

export function newestJobs(limit: number, now: Date = new Date()): Job[] {
  return activeJobs(now).slice(0, limit);
}

export function featuredJobs(limit: number, now: Date = new Date()): Job[] {
  return activeJobs(now)
    .filter((job) => job.featured)
    .slice(0, limit);
}

export function jobsInCategory(categorySlug: string, now: Date = new Date()): Job[] {
  return activeJobs(now).filter((job) => job.categorySlug === categorySlug);
}

export function jobsInLocation(locationSlug: string, now: Date = new Date()): Job[] {
  return activeJobs(now).filter((job) => job.locationSlug === locationSlug);
}

export function getJob(slug: string, now: Date = new Date()): Job | undefined {
  return activeJobs(now).find((job) => job.slug === slug);
}

/** Same-category jobs, excluding the given one, newest first. */
export function relatedJobs(job: Job, limit = 3, now: Date = new Date()): Job[] {
  return activeJobs(now)
    .filter((other) => other.slug !== job.slug && other.categorySlug === job.categorySlug)
    .slice(0, limit);
}
