"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-4 py-3 text-sm text-white">
        <div className="w-5 h-5 rounded-full bg-[#FFD400] flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        Zapisano! Sprawdź skrzynkę.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Twój adres e-mail"
          disabled={status === "loading"}
          className="flex-1 min-w-0 px-3.5 py-2 rounded-lg text-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD400] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-[#FFD400] hover:bg-yellow-300 text-black font-bold text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Zapisz się"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">Coś poszło nie tak. Spróbuj ponownie.</p>
      )}
    </form>
  );
}
