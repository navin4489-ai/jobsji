import type { EmploymentType, SalaryPeriod, Workplace } from '../types';

const INR = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export const EMPLOYMENT_TYPE_LABEL: Record<EmploymentType, string> = {
  fulltime: 'Full-time',
  parttime: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
};

export const WORKPLACE_LABEL: Record<Workplace, string> = {
  onsite: 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
};

function compactLakhs(value: number): string {
  const lakhs = value / 100000;
  if (lakhs >= 1) {
    const rounded = Math.round(lakhs * 10) / 10;
    return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)} LPA`;
  }
  const thousands = Math.round(value / 1000);
  return `${thousands}k`;
}

/** ₹4.5 – 8 LPA / ₹15k per month */
export function formatSalary(min: number, max: number, period: SalaryPeriod): string {
  if (period === 'month') {
    return `₹${INR.format(Math.round(min / 1000))}k – ${INR.format(Math.round(max / 1000))}k / month`;
  }
  return `₹${compactLakhs(min)} – ${compactLakhs(max)}`;
}

/** "0-2 yrs", "3-6 yrs", "5+ yrs" style label */
export function formatExperience(min: number, max: number): string {
  if (min === 0 && max === 0) return 'Fresher';
  if (max >= 12) return `${min}+ yrs`;
  return `${min}–${max} yrs`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "15 Jan 2026" */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "2 days ago" / "just now" */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const then = new Date(`${iso}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return formatDate(iso);
  const days = Math.floor((now.getTime() - then) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(iso);
}

/** INR in the compact Indian notation: 450000 -> "4.5L" */
export function inrShort(value: number): string {
  if (value >= 10000000) return `${Math.round((value / 10000000) * 100) / 100}Cr`;
  if (value >= 100000) return `${Math.round((value / 100000) * 100) / 100}L`;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return String(value);
}
