import type { Plan } from '../types';

/**
 * Subscription tiers shown on the landing page and in the checkout modal.
 * Payments are simulated — the real Razorpay hookup happens in
 * `src/lib/checkout.ts` once keys exist.
 */
export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Explorer',
    price: 199,
    period: 'month',
    periodLabel: '/month',
    blurb: 'Perfect to test the waters and apply to India jobs.',
    features: [
      'Browse all 15,000+ jobs',
      'Apply to 10 jobs per month',
      'Saved jobs & WhatsApp alerts',
      'Resume generator (PDF)',
      'Email support',
    ],
  },
  {
    id: 'global-pro',
    name: 'Global Pro',
    price: 499,
    period: '3 months',
    periodLabel: '/3 months',
    blurb: 'Best value for anyone targeting India + Gulf roles.',
    features: [
      'Everything in Basic Explorer',
      'Unlimited applications',
      'Direct HR WhatsApp on every job',
      'International job alerts (Dubai, Gulf, Uzbekistan)',
      'Visa & relocation guidance',
      'Priority support on WhatsApp',
    ],
    popular: true,
  },
  {
    id: 'career-vip',
    name: 'Career VIP',
    price: 999,
    period: '6 months',
    periodLabel: '/6 months',
    blurb: 'Hands-on help for Europe & high-value placements.',
    features: [
      'Everything in Global Pro',
      'Dedicated career manager',
      'EU / Russia placement support',
      'Resume & interview preparation',
      'Profile highlighted to verified employers',
      'Fastest HR response — 24-hour callback',
    ],
  },
];

export const planById = new Map(plans.map((p) => [p.id, p]));
