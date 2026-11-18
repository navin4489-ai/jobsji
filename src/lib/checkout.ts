/**
 * Checkout — SIMULATED payments.
 *
 * The UI is complete (Razorpay-style modal, UPI / cards / NetBanking) but no
 * keys exist yet, so `processPayment` resolves after a short delay and marks
 * the plan active in localStorage.
 *
 * ── Real Razorpay hookup (one file, when keys arrive) ─────────────────────
 *  1. Add the Razorpay checkout script to BaseLayout:
 *       <script is:inline src="https://checkout.razorpay.com/v1/checkout.js"></script>
 *  2. Replace the body of `processPayment` below with:
 *
 *       const rzp = new (window as any).Razorpay({
 *         key: import.meta.env.PUBLIC_RAZORPAY_KEY_ID,   // set in CI env
 *         amount: plan.price * 100,                      // paise
 *         currency: 'INR',
 *         name: 'Jobsji',
 *         description: plan.name,
 *         handler: (res: { razorpay_payment_id: string }) => activate(plan.id, res.razorpay_payment_id),
 *       });
 *       rzp.open();
 *       return new Promise(() => {});                    // resolved by handler
 *
 *  3. Verify the payment server-side before activating in production.
 */
import type { Plan } from '../types';

export const PLAN_STORAGE_KEY = 'jobsji-plan';

export type PaymentMethod = 'upi' | 'card' | 'netbanking';

export function activePlanId(): string | null {
  try {
    return localStorage.getItem(PLAN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function isSubscribed(): boolean {
  return activePlanId() !== null;
}

/** True once the visitor has unlocked HR contacts (subscribed at any tier). */
export function isUnlocked(): boolean {
  return isSubscribed();
}

export function activate(planId: string): void {
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, planId);
  } catch {
    /* storage blocked — unlock lasts for this page view only */
  }
  // Let every listening view (cards, dashboards) refresh instantly.
  window.dispatchEvent(new CustomEvent('jobsji:subscribed', { detail: { planId } }));
}

/**
 * Simulated payment. Resolves with the plan on success.
 * Swap for Razorpay per the comment at the top of this file.
 */
export async function processPayment(plan: Plan, _method: PaymentMethod): Promise<void> {
  // Simulated gateway round-trip — feels real, costs nothing.
  await new Promise((resolve) => setTimeout(resolve, 1100));
  activate(plan.id);
}
