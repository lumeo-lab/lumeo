"use client";

import { useState } from "react";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !consent) return;
    // TODO: integrate with email service
    setSubmitted(true);
  };

  return (
    <section className="bg-[#FFD400] py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="text-3xl font-extrabold text-black mb-3">
          Dołącz do newslettera Lumeo
        </h2>
        <p className="text-black/70 mb-8 text-base">
          Zapisz się i odbierz <strong>3 analizy PDF z audio i infografiką</strong> — całkowicie za darmo. Zero spamu.
        </p>

        {submitted ? (
          <div className="bg-black text-white rounded-2xl px-8 py-10">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-extrabold text-xl mb-2">Gotowe! Sprawdź swoją skrzynkę.</h3>
            <p className="text-gray-300 text-sm">Wysłaliśmy Ci 3 darmowe analizy. Miłej lektury!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Twoje imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl border-2 border-black/20 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition font-medium"
            />
            <input
              type="email"
              placeholder="Twój adres e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl border-2 border-black/20 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition font-medium"
            />
            <label className="flex items-start gap-3 text-left cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 w-4 h-4 accent-black"
              />
              <span className="text-xs text-black/60">
                Wyrażam zgodę na przetwarzanie moich danych osobowych przez Lumeo w celu wysyłki newslettera. Mogę się wypisać w dowolnym momencie.
              </span>
            </label>
            <button
              type="submit"
              disabled={!consent}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Odbierz 3 darmowe analizy →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
