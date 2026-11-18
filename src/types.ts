export type EmploymentType = 'fulltime' | 'parttime' | 'contract' | 'internship';
export type Workplace = 'onsite' | 'hybrid' | 'remote';
export type SalaryPeriod = 'year' | 'month';

export interface Company {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  website: string;
  color: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Location {
  slug: string;
  name: string;
  state: string;
  description: string;
}

export interface Job {
  slug: string;
  title: string;
  companySlug: string;
  categorySlug: string;
  locationSlug: string;
  city: string;
  workplace: Workplace;
  employmentType: EmploymentType;
  experienceMin: number;
  experienceMax: number;
  /** Annual (or monthly, see salaryPeriod) gross salary in INR. */
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: SalaryPeriod;
  skills: string[];
  openings: number;
  /** ISO date, e.g. "2026-01-15" */
  postedAt: string;
  /** Optional ISO expiry date — jobs past it are hidden from listings. */
  validThrough?: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applyUrl?: string;
  applyEmail?: string;
  featured?: boolean;
  urgent?: boolean;
}
