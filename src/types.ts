export type EmploymentType = 'fulltime' | 'parttime' | 'contract' | 'internship';
export type Workplace = 'onsite' | 'hybrid' | 'remote';
export type SalaryPeriod = 'year' | 'month';

/** Where a role is based. Drives region filters and the hero location dropdown. */
export type Country =
  | 'india'
  | 'uae'
  | 'uzbekistan'
  | 'saudi'
  | 'qatar'
  | 'europe'
  | 'russia';

/**
 * Overseas perks shown as badges and used by the "Visa & Perks" filter.
 * Kept as a closed set so filter values stay predictable.
 */
export type VisaPerk =
  | 'free-visa'
  | 'flight-ticket'
  | 'accommodation'
  | 'food'
  | 'immediate-joining';

export interface Company {
  slug: string;
  name: string;
  tagline: string;
  about: string;
  website: string;
  color: string;
  /** Renders a green "Verified Employer" badge when true. */
  verified?: boolean;
  /** Recruitment / staffing agencies also hire for third parties. */
  agency?: boolean;
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
  /** State for Indian cities, country for international ones. */
  state: string;
  description: string;
  country?: Country;
}

export interface Job {
  slug: string;
  title: string;
  companySlug: string;
  categorySlug: string;
  locationSlug: string;
  city: string;
  /** Defaults to 'india' when omitted. */
  country?: Country;
  workplace: Workplace;
  employmentType: EmploymentType;
  experienceMin: number;
  experienceMax: number;
  /** Annual (or monthly, see salaryPeriod) gross salary in INR — powers the ₹ slider. */
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: SalaryPeriod;
  /**
   * Local-currency pay line for overseas roles, e.g. "AED 4,500 – 6,000 / month".
   * Shown alongside the INR figure so candidates see both.
   */
  localSalary?: string;
  /** ISO 4217 code matching localSalary, e.g. "AED", "UZS", "USD". */
  currency?: string;
  /** Emoji flag for the role's country, e.g. "🇦🇪". */
  flag?: string;
  /** True for overseas roles that sponsor the work visa. */
  visaSponsored?: boolean;
  perks?: VisaPerk[];
  /** Employer identity has been checked against a trade licence / registration. */
  verified?: boolean;
  /** WhatsApp number revealed to subscribed candidates. */
  hrWhatsApp?: string;
  /** Direct HR line revealed to subscribed candidates. */
  hrPhone?: string;
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
  /** Accommodation / food / visa breakdown — the deciding detail for overseas roles. */
  overseasPackage?: {
    accommodation?: string;
    food?: string;
    visa?: string;
    transport?: string;
    workingHours?: string;
    contract?: string;
  };
  applyUrl?: string;
  applyEmail?: string;
  featured?: boolean;
  urgent?: boolean;
}

/** Subscription tiers surfaced on the landing page and checkout. */
export interface Plan {
  id: 'basic' | 'global-pro' | 'career-vip';
  name: string;
  price: number;
  /** Billing period label, e.g. "month", "3 months". */
  period: string;
  periodLabel: string;
  blurb: string;
  features: string[];
  popular?: boolean;
}

/** Candidate success story cards. */
export interface Testimonial {
  name: string;
  role: string;
  location: string;
  /** Emoji initials avatar — avoids external image requests. */
  avatar: string;
  quote: string;
  /** Country the candidate was placed in. */
  placedIn: string;
  flag: string;
}
