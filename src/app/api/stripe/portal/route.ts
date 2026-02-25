import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import { getSupabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    const sb = getSupabase();
    if (!sb) return NextResponse.json({ error: "Błąd konfiguracji." }, { status: 500 });

    const { data: { user } } = await sb.auth.getUser(accessToken);
    if (!user?.id) return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "Brak aktywnej subskrypcji." }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumeo-ten.vercel.app";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${baseUrl}/profil`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal error:", err);
    return NextResponse.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
