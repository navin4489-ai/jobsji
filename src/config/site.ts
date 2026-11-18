/**
 * Single source of truth for site-wide configuration.
 * Same env vars + defaults as astro.config.mjs.
 * Import only from server-side code (Astro frontmatter), never from client scripts.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://jobsji.in').replace(/\/+$/, '');
export const BASE_PATH = process.env.BASE_PATH ?? '/';

export const SITE_NAME = 'Jobsji';
export const SITE_TAGLINE = 'Apka Career, Ab Global';
export const SITE_DESCRIPTION =
  'Jobsji — verified jobs across India, Dubai, Uzbekistan, Saudi Arabia, Qatar and Europe. Direct HR contact, visa sponsorship support and no hidden agent fees.';
export const CONTACT_EMAIL = 'hello@jobsji.in';
export const APPLY_EMAIL = 'apply@jobsji.in';
export const TWITTER_HANDLE = '@jobsji_in';
export const LAUNCH_YEAR = 2026;

/** WhatsApp support line shown on job cards and the dashboard. */
export const SUPPORT_WHATSAPP = '+91 98765 43210';
