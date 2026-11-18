import type { Category } from '../types';

export const categories: Category[] = [
  {
    slug: 'software-development',
    name: 'Software Development',
    description:
      'Frontend, backend and full-stack engineering roles across product companies and service firms — React, Node.js, Java, Python, Go and cloud-native stacks.',
    icon: 'code',
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    description:
      'Data analyst, business intelligence, data engineering and machine learning openings for SQL, Python, Power BI and Tableau specialists.',
    icon: 'chart',
  },
  {
    slug: 'sales',
    name: 'Sales',
    description:
      'Inside sales, field sales, key account and business development roles with India’s fastest-growing startups and established enterprises.',
    icon: 'trending',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description:
      'SEO, performance marketing, content, social media and growth roles for brands scaling acquisition across India and global markets.',
    icon: 'megaphone',
  },
  {
    slug: 'design',
    name: 'Design & Creative',
    description:
      'Product design, UX research, graphic and motion design roles for teams building delightful digital experiences.',
    icon: 'palette',
  },
  {
    slug: 'finance',
    name: 'Finance & Accounting',
    description:
      'Chartered accountants, financial analysts, controllers and audit roles in fintech, manufacturing and professional services.',
    icon: 'rupee',
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    description:
      'Voice and non-voice support, technical support and success roles with night-shift and work-from-home options.',
    icon: 'headset',
  },
  {
    slug: 'operations',
    name: 'Operations & Logistics',
    description:
      'Supply chain, warehouse, delivery network and process operations roles driving India’s commerce and mobility boom.',
    icon: 'truck',
  },
  {
    slug: 'construction-engineering',
    name: 'Construction & Engineering',
    description:
      'Civil, mechanical, electrical and site engineering roles on infrastructure projects across India and the Gulf — many with visa sponsorship.',
    icon: 'layers',
  },
  {
    slug: 'hospitality-hotel',
    name: 'Hospitality & Hotel',
    description:
      'Chefs, stewards, front desk, housekeeping and restaurant roles with leading hotels, resorts and cruise operators at home and abroad.',
    icon: 'sparkles',
  },
  {
    slug: 'healthcare-nursing',
    name: 'Healthcare & Nursing',
    description:
      'Staff nurses, patient care assistants, lab technicians and doctors for hospitals and clinics in India, the Gulf and Europe.',
    icon: 'heart',
  },
  {
    slug: 'drivers-logistics',
    name: 'Drivers & Logistics',
    description:
      'Heavy truck drivers, bus drivers, delivery riders and fleet roles — one of the fastest-hiring categories across the Gulf and Central Asia.',
    icon: 'truck',
  },
  {
    slug: 'skilled-trades',
    name: 'Skilled Trades',
    description:
      'Welders, electricians, masons, carpenters, fitters and technicians — hands-on roles with free visa, accommodation and flight tickets.',
    icon: 'zap',
  },
  {
    slug: 'work-from-home',
    name: 'Work From Home',
    description:
      'Remote-friendly roles you can do from anywhere in India — support, sales, content, design and engineering with async-first teams.',
    icon: 'home',
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
