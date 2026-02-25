import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { plan, accessToken } = await request.json();

    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return NextResponse.json({ error: "Nieprawidłowy plan." }, { status: 400 });
    }

    // Verify the user's Supabase session
    const sb = getSupabase();
    if (!sb) return NextResponse.json({ error: "Błąd konfiguracji." }, { status: 500 });

    const { data: { user } } = await sb.auth.getUser(accessToken);

    if (!user?.id || !user?.email) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const priceId = plan === "monthly"
      ? process.env.STRIPE_PRICE_MONTHLY!
      : process.env.STRIPE_PRICE_YEARLY!;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumeo-ten.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 7,
        metadata: { userId: user.id, plan },
      },
      metadata: { userId: user.id, plan },
      success_url: `${baseUrl}/cennik?success=true`,
      cancel_url: `${baseUrl}/cennik`,
      locale: "pl",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
