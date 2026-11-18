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

  /* ---------- International (overseas) ---------- */
  {
    slug: 'dubai',
    name: 'Dubai',
    state: 'United Arab Emirates',
    country: 'uae',
    description:
      'The Gulf’s hiring hub — tax-free salaries, world-class infrastructure and heavy demand for hospitality, construction, logistics, healthcare and IT professionals.',
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    state: 'United Arab Emirates',
    country: 'uae',
    description:
      'The UAE capital with government, energy, healthcare and education employers offering stable contracts, housing allowances and family visas.',
  },
  {
    slug: 'sharjah',
    name: 'Sharjah',
    state: 'United Arab Emirates',
    country: 'uae',
    description:
      'A fast-growing industrial and education centre with manufacturing, logistics and teaching roles at a lower cost of living than Dubai.',
  },
  {
    slug: 'tashkent',
    name: 'Tashkent',
    state: 'Uzbekistan',
    country: 'uzbekistan',
    description:
      'Central Asia’s fastest-growing economy — IT, textiles, telecom and construction employers recruiting Indian talent with accommodation support.',
  },
  {
    slug: 'samarkand',
    name: 'Samarkand',
    state: 'Uzbekistan',
    country: 'uzbekistan',
    description:
      'A tourism and construction boom city with hospitality, skilled-trade and infrastructure projects hiring international crews.',
  },
  {
    slug: 'riyadh',
    name: 'Riyadh',
    state: 'Saudi Arabia',
    country: 'saudi',
    description:
      'Vision 2030’s engine room — massive demand for drivers, technicians, engineers, nurses and hospitality staff on tax-free packages.',
  },
  {
    slug: 'jeddah',
    name: 'Jeddah',
    state: 'Saudi Arabia',
    country: 'saudi',
    description:
      'The Kingdom’s commercial capital and gateway to Hajj/Umrah tourism — hotels, retail, healthcare and logistics roles year-round.',
  },
  {
    slug: 'doha',
    name: 'Doha',
    state: 'Qatar',
    country: 'qatar',
    description:
      'A high-income market with world-cup legacy infrastructure — construction, facilities, aviation, healthcare and IT openings.',
  },
  {
    slug: 'moscow',
    name: 'Moscow',
    state: 'Russia',
    country: 'russia',
    description:
      'Russia’s largest job market — engineering, manufacturing, IT and warehousing employers recruiting skilled Indian workers directly.',
  },
  {
    slug: 'europe-remote',
    name: 'Europe',
    state: 'EU / UK',
    country: 'europe',
    description:
      'Poland, Portugal, Germany, Romania and beyond — EU work permits, IT & engineering demand and long-term relocation pathways.',
  },
];

export const locationBySlug = new Map(locations.map((l) => [l.slug, l]));
