import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getInstance(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    _stripe = new Stripe(key, { apiVersion: "2026-01-28.clover" });
  }
  return _stripe;
}

// Proxy — Stripe instance is created on first use (not at module import time)
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getInstance()[prop as keyof Stripe];
  },
});
