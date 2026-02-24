"use client";

import { useState } from "react";
import Link from "next/link";

const contactReasons = [
  "Pytanie o subskrypcję",
  "Problem techniczny",
  "Propozycja analizy",
  "Współpraca / media",
  "Faktura / płatności",
  "Inne",
];

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Hero bar */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00] px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/60">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">Kontakt</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Kontakt</p>
          <h1 className="text-4xl font-extrabold text-black mb-3">Napisz do nas</h1>
          <p className="text-gray-500 text-sm max-w-lg">
            Odpiszemy w ciągu 24 godzin w dni robocze. Staramy się być pomocni — nie bój się pytać.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-[#FFD400] rounded-full flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-extrabold text-black mb-2">Wiadomość wysłana!</h2>
                <p className="text-gray-500 text-sm mb-6 max-w-xs">
                  Dziękujemy za kontakt. Odpiszemy na adres <strong>{form.email}</strong> w ciągu 24 godzin.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", reason: "", message: "" }); }}
                  className="text-sm font-semibold text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Imię i nazwisko <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jan Kowalski"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Adres e-mail <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@firma.pl"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition placeholder-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Temat <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition text-gray-700 bg-white cursor-pointer"
                  >
                    <option value="">Wybierz temat...</option>
                    {contactReasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Wiadomość <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Opisz swoje pytanie lub problem..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition resize-none placeholder-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Wyślij wiadomość
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Odpiszemy w ciągu 24h w dni robocze.
                </p>
              </form>
            )}
          </div>

          {/* Side info */}
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#FFD400] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">E-mail</p>
                  <Link href="mailto:kontakt@lumeo.pl" className="text-sm font-semibold text-black hover:text-[#7a5f00] transition-colors">
                    kontakt@lumeo.pl
                  </Link>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">Odpowiadamy w ciągu 24 godzin w dni robocze.</p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#FFD400] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Godziny wsparcia</p>
                  <p className="text-sm font-semibold text-black">Pon–Pt, 9:00–17:00</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">W weekendy możemy odpowiedzieć wolniej, ale staramy się!</p>
            </div>

            {/* Social / quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Szybkie linki</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Cennik i subskrypcja", href: "/cennik" },
                  { label: "Często zadawane pytania", href: "/#faq" },
                  { label: "O nas i zespół", href: "/o-nas" },
                  { label: "Biblioteka analiz", href: "/ksiazki" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-black transition-colors py-1.5 border-b border-gray-50 last:border-0"
                  >
                    {link.label}
                    <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FFD400] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">Gwarancja zwrotu 14 dni</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Nie jesteś zadowolony? Napisz do nas w ciągu 14 dni od płatności, a zwrócimy pełną kwotę — bez pytań.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
