"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Plan = "monthly" | "yearly";

interface Props {
  plan: Plan;
  className?: string;
  children: React.ReactNode;
}

export function CheckoutButton({ plan, className, children }: Props) {
  const { user, session } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!user || !session) {
      router.push(`/rejestracja?plan=${plan}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, accessToken: session.access_token }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe error:", data.error);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Przekierowuję..." : children}
    </button>
  );
}
