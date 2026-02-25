import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key || key === "PLACEHOLDER") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(url, key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateSubscription(supabase: any, userId: string, customerId: string, subscription: Stripe.Subscription, plan?: string) {
  // current_period_end is available in older API; use safe accessor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodEnd = (subscription as any).current_period_end;
  const endDate = periodEnd ? new Date(periodEnd * 1000).toISOString() : null;

  await supabase.from("profiles").upsert({
    id: userId,
    stripe_customer_id: customerId,
    subscription_status: subscription.status,
    subscription_plan: plan ?? null,
    subscription_end: endDate,
    updated_at: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Brak podpisu." }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret === "whsec_PLACEHOLDER") {
    console.error("STRIPE_WEBHOOK_SECRET nie jest skonfigurowany.");
    return NextResponse.json({ error: "Webhook nie skonfigurowany." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Błąd weryfikacji webhooka Stripe:", err);
    return NextResponse.json({ error: "Nieprawidłowy podpis." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn("Supabase admin client nie skonfigurowany — pomiń aktualizację DB");
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!userId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await updateSubscription(supabase, userId, customerId, subscription, plan);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (subscription as any).current_period_end;
        const endDate = periodEnd ? new Date(periodEnd * 1000).toISOString() : null;

        const { data: profile } = await supabase
          .from("profiles")
          .select("id, subscription_plan")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase.from("profiles").update({
            subscription_status: subscription.status,
            subscription_end: endDate,
            updated_at: new Date().toISOString(),
          }).eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const periodEnd = (subscription as any).current_period_end;
        const endDate = periodEnd ? new Date(periodEnd * 1000).toISOString() : null;

        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase.from("profiles").update({
            subscription_status: "canceled",
            subscription_end: endDate,
            updated_at: new Date().toISOString(),
          }).eq("id", profile.id);
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Błąd obsługi webhooka:", err);
  }

  return NextResponse.json({ received: true });
}
