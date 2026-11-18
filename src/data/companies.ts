import type { Company } from '../types';

/**
 * Seed companies are illustrative (demo listings for design/SEO validation).
 * Websites use the IANA-reserved example.com domain so no unrelated real
 * company is linked. Replace with verified employer sites as real jobs land.
 */
export const companies: Company[] = [
  {
    slug: 'nexora-technologies',
    name: 'Nexora Technologies',
    tagline: 'Cloud-native products for Indian enterprises',
    about:
      'Nexora Technologies builds SaaS platforms for banking and retail clients across India, with engineering teams in Bengaluru and Hyderabad.',
    website: 'https://example.com/nexora',
    color: '#4f46e5',
  },
  {
    slug: 'finveda-capital',
    name: 'Finveda Capital',
    tagline: 'Retail lending, rebuilt for the next billion',
    about:
      'Finveda Capital is a Mumbai-based fintech providing credit products to salaried and self-employed customers through a fully digital journey.',
    website: 'https://example.com/finveda',
    color: '#0f766e',
  },
  {
    slug: 'cloudnest-systems',
    name: 'CloudNest Systems',
    tagline: 'Managed cloud & DevOps for scale-ups',
    about:
      'CloudNest Systems runs cloud infrastructure, SRE and DevOps managed services for high-growth internet companies from its Hyderabad campus.',
    website: 'https://example.com/cloudnest',
    color: '#0369a1',
  },
  {
    slug: 'retailloop-commerce',
    name: 'RetailLoop Commerce',
    tagline: 'Omni-channel commerce for 10,000+ brands',
    about:
      'RetailLoop Commerce operates a marketplace and retail-tech stack powering D2C brands across India, with a hybrid work culture.',
    website: 'https://example.com/retailloop',
    color: '#c2410c',
  },
  {
    slug: 'healthplus-clinics',
    name: 'HealthPlus Clinics',
    tagline: 'Primary care, made affordable',
    about:
      'HealthPlus Clinics runs a network of primary-care centres across Pune and Mumbai with an in-house health-tech platform.',
    website: 'https://example.com/healthplus',
    color: '#dc2626',
  },
  {
    slug: 'eduspark-learning',
    name: 'EduSpark Learning',
    tagline: 'Skills that get people hired',
    about:
      'EduSpark Learning delivers online upskilling programmes in tech and business, serving learners in 400+ Indian cities.',
    website: 'https://example.com/eduspark',
    color: '#7c3aed',
  },
  {
    slug: 'logitrail-logistics',
    name: 'LogiTrail Logistics',
    tagline: 'Data-driven freight across India',
    about:
      'LogiTrail Logistics combines a trucking marketplace with owned fleet operations to move freight reliably for manufacturers and e-commerce.',
    website: 'https://example.com/logitrail',
    color: '#a16207',
  },
  {
    slug: 'analytiq-labs',
    name: 'Analytiq Labs',
    tagline: 'Decision intelligence for consumer brands',
    about:
      'Analytiq Labs builds analytics and BI products that help consumer brands forecast demand and measure growth in real time.',
    website: 'https://example.com/analytiq',
    color: '#0e7490',
  },
  {
    slug: 'brandwave-media',
    name: 'Brandwave Media',
    tagline: 'Performance-first creative agency',
    about:
      'Brandwave Media is a Mumbai growth agency running paid, SEO and social programmes for D2C and fintech brands.',
    website: 'https://example.com/brandwave',
    color: '#db2777',
  },
  {
    slug: 'pixelforge-studio',
    name: 'PixelForge Studio',
    tagline: 'Product design & research studio',
    about:
      'PixelForge Studio designs mobile and web products for startups and enterprises, with a fully remote design team.',
    website: 'https://example.com/pixelforge',
    color: '#4338ca',
  },
  {
    slug: 'servx-india',
    name: 'ServX India',
    tagline: 'Customer experience at scale',
    about:
      'ServX India provides omnichannel voice and chat support for global SaaS and e-commerce brands from Kolkata and Chennai.',
    website: 'https://example.com/servx',
    color: '#047857',
  },
  {
    slug: 'urbanbasket-grocers',
    name: 'UrbanBasket Grocers',
    tagline: '10-minute grocery delivery, done right',
    about:
      'UrbanBasket Grocers runs dark-store networks and quick-commerce operations across Delhi NCR and Jaipur.',
    website: 'https://example.com/urbanbasket',
    color: '#4d7c0f',
  },
  {
    slug: 'skillmint-hr',
    name: 'SkillMint HR',
    tagline: 'Talent solutions for growing teams',
    about:
      'SkillMint HR is a Pune-based talent consultancy placing engineers, analysts and operators with product companies pan-India.',
    website: 'https://example.com/skillmint',
    color: '#9333ea',
  },
  {
    slug: 'vayu-mobility',
    name: 'Vayu Mobility',
    tagline: 'Electric mobility for Indian cities',
    about:
      'Vayu Mobility designs and operates electric two-wheeler fleets with an in-house telematics and energy platform.',
    website: 'https://example.com/vayu',
    color: '#2563eb',
  },
];

export const companyBySlug = new Map(companies.map((c) => [c.slug, c]));
