import type { Location } from '../types';

export const locations: Location[] = [
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    description:
      'India’s startup capital — the deepest market for engineering, product and design talent, with the country’s highest concentration of product companies and R&D centres.',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    description:
      'The financial capital — home to banks, fintechs, media houses and sales-heavy roles across banking, wealth management and consumer brands.',
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi / Haryana / UP',
    description:
      'A vast metro-region market spanning Gurugram, Noida and Delhi — strong in IT services, GBS/ops, edtech, e-commerce and government-adjacent firms.',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    description:
      'A fast-growing tech hub with major GCC campuses, pharma clusters and a booming data-centre and cloud ecosystem.',
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    description:
      'Automotive, manufacturing and IT hub with a large fresher-friendly services market and a growing product-startup scene.',
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    description:
      'The Detroit of India for autos and a major IT/GBS base — strong for engineering, support and manufacturing operations roles.',
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    description:
      'Gujarat’s commercial engine — pharma, textiles, chemicals and a fast-growing startup ecosystem in SaaS and D2C.',
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    description:
      'Eastern India’s business centre with strength in metals, mining, FMCG, logistics and an expanding IT/ITES corridor.',
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    description:
      'A rising tier-2 hub for IT/ITES, gem & jewellery exports, tourism and shared-services centres with a fast-improving talent pool.',
  },
  {
    slug: 'remote-india',
    name: 'Remote (India)',
    state: 'Work from anywhere',
    description:
      'Location-independent roles open to candidates across India — async-first teams, national talent pools and no daily commute.',
  },
];

export const locationBySlug = new Map(locations.map((l) => [l.slug, l]));
