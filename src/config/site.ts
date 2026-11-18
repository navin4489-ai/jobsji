/**
 * Single source of truth for site-wide configuration.
 * Same env vars + defaults as astro.config.mjs.
 * Import only from server-side code (Astro frontmatter), never from client scripts.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://jobsji.in').replace(/\/+$/, '');
export const BASE_PATH = process.env.BASE_PATH ?? '/';

export const SITE_NAME = 'Jobsji';
export const SITE_TAGLINE = 'Find jobs that match your skills';
export const SITE_DESCRIPTION =
  'Jobsji is an India-focused job discovery portal — search latest jobs by skill, category, location, salary and employment type. Free job alerts for freshers and experienced professionals.';
export const CONTACT_EMAIL = 'hello@jobsji.in';
export const APPLY_EMAIL = 'apply@jobsji.in';
export const TWITTER_HANDLE = '@jobsji_in';
export const LAUNCH_YEAR = 2026;
