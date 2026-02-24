import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cennik — Lumeo",
  description: "Wybierz plan Lumeo. 7 dni za darmo, bez karty kredytowej. Miesięczny lub roczny dostęp do ponad 130 analiz książek.",
};

const monthlyFeatures = [
  "Dostęp do całej biblioteki (133+ analiz)",
  "Wersje audio każdej analizy",
  "Infografiki do pobrania",
  "Zadania wdrożeniowe",
  "Nowe analizy co tydzień",
  "Aplikacja mobilna",
];

const yearlyExtras = [
  "Wszystko z planu miesięcznego",
  "Nielimitowane pobieranie PDF",
  "Dostęp do archiwum Lumeo Lab",
  "Priorytetowa obsługa klienta",
  "Wczesny dostęp do nowości",
  "Faktura VAT",
];

const faqPricing = [
  {
    q: "Czy potrzebuję karty kredytowej do trialu?",
    a: "Tak, prosimy o dane karty przy rejestracji, ale przez 7 dni próbnych nie pobieramy żadnych opłat. Możesz anulować w dowolnym momencie bez konsekwencji.",
  },
  {
    q: "Czy mogę anulować subskrypcję w dowolnym momencie?",
    a: "Tak. Anulowanie trwa 30 sekund z poziomu ustawień konta. Po anulowaniu dostęp pozostaje aktywny do końca opłaconego okresu.",
  },
  {
    q: "Czy jest gwarancja zwrotu pieniędzy?",
    a: "Tak — 14 dni bez pytań. Jeśli nie jesteś zadowolony, zwracamy pełną kwotę. Wystarczy napisać na kontakt@lumeo.pl.",
  },
  {
    q: "Czy wystawiacie faktury VAT?",
    a: "Tak. Faktury VAT wystawiamy automatycznie po każdej płatności. Dane firmy możesz podać podczas rejestracji lub w ustawieniach konta.",
  },
  {
    q: "Czym różni się plan miesięczny od rocznego?",
    a: "Plan roczny kosztuje tyle co 10 miesięcy (2 miesiące gratis) i dodatkowo daje nielimitowane pobieranie PDF, dostęp do archiwum Lumeo Lab oraz priorytetowe wsparcie.",
  },
];

export default function CennikPage() {
  const monthlyPrice = 39;
  const yearlyTotal = 389;
  const yearlyPerMonth = Math.round(yearlyTotal / 12);
  const yearlySaving = monthlyPrice * 12 - yearlyTotal;

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Hero */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00]">
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">Cennik</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-4 leading-tight">
            Prosta, uczciwa cena
          </h1>
          <p className="text-black/60 text-base max-w-lg mx-auto">
            Jeden plan, pełny dostęp. Zacznij od 7 dni za darmo — bez karty kredytowej.
          </p>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Monthly */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Miesięczny</p>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-black text-black">{monthlyPrice}</span>
                <span className="text-xl font-bold text-gray-400 mb-1.5">zł</span>
                <span className="text-sm text-gray-400 mb-1.5">/ mies.</span>
              </div>
              <p className="text-sm text-gray-400">Płatność co miesiąc. Anuluj kiedy chcesz.</p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {monthlyFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-[#FFD400] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="w-full text-center bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Załóż konto
            </Link>
          </div>

          {/* Yearly — highlighted */}
          <div className="bg-[#0a0a0a] rounded-2xl border border-[#FFD400]/30 p-8 flex flex-col relative overflow-hidden">
            {/* Best value badge */}
            <div className="absolute top-5 right-5 bg-[#FFD400] text-black text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider uppercase">
              Najpopularniejszy
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Roczny</p>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-black text-white">{yearlyPerMonth}</span>
                <span className="text-xl font-bold text-gray-400 mb-1.5">zł</span>
                <span className="text-sm text-gray-400 mb-1.5">/ mies.</span>
              </div>
              <p className="text-sm text-gray-500">
                {yearlyTotal} zł rocznie ·{" "}
                <span className="text-[#FFD400] font-semibold">oszczędzasz {yearlySaving} zł</span>
              </p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {yearlyExtras.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-[#FFD400] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className="w-full text-center bg-[#FFD400] hover:bg-yellow-300 text-black font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Załóż konto
            </Link>
          </div>

        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Gwarancja zwrotu 14 dni
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Bezpieczna płatność (Autopay)
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Anuluj w każdej chwili
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Faktura VAT
          </span>
        </div>

        {/* What's included */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-black text-center mb-2">Co zawiera subskrypcja?</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Wszystko, czego potrzebujesz, żeby uczyć się efektywnie.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "133+ analiz książek", desc: "Starannie wyselekcjonowane tytuły z biznesu, psychologii, finansów i rozwoju osobistego." },
              { icon: "M12 3a9 9 0 0 0-9 9v7a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4.07A8.003 8.003 0 0 1 12 5a8.003 8.003 0 0 1 7.93 7H18a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-7a9 9 0 0 0-9-9z", title: "Wersje audio", desc: "Słuchaj analiz podczas jazdy, biegania lub przerwy. Nagrania lektorskie wysokiej jakości." },
              { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Infografiki", desc: "Wizualne podsumowania kluczowych koncepcji — gotowe do wydruku i zawieszenia w biurze." },
              { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", title: "Zadania wdrożeniowe", desc: "Każda analiza kończy się konkretnymi ćwiczeniami, które pomagają zastosować wiedzę od razu." },
              { icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", title: "Komentarz autorski", desc: "Nie tylko streszczamy — analizujemy. Unikalny kontekst i perspektywa naszych ekspertów." },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Nowe analizy co tydzień", desc: "Biblioteka stale rośnie. Subskrybenci mają dostęp do każdej nowej analizy w dniu premiery." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5 flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#FFD400] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-black mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-black text-center mb-8">Pytania o płatności</h2>
          <div className="flex flex-col gap-3">
            {faqPricing.map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-gray-200 px-6 py-5">
                <p className="font-semibold text-sm text-black mb-2">{item.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 bg-[#0a0a0a] rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-2">Gotowy, żeby zacząć?</h2>
          <p className="text-gray-400 text-sm mb-7">Dołącz do tysięcy czytelników, którzy uczą się efektywniej z Lumeo.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-yellow-300 text-black font-bold px-7 py-3 rounded-xl text-sm transition-colors"
            >
              Załóż konto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/ksiazki"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors"
            >
              Przeglądaj analizy
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-5">Gwarancja zwrotu 14 dni · Bez karty kredytowej przez 7 dni · Anuluj kiedy chcesz</p>
        </div>

      </div>
    </div>
  );
}
