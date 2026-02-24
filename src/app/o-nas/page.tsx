import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas — Lumeo",
  description: "Poznaj zespół Lumeo. Tworzymy polską platformę z głębokimi analizami najlepszych książek biznesowych i rozwojowych.",
};

const team = [
  {
    name: "Tomasz Zieliński",
    role: "CEO & Co-founder",
    initials: "TZ",
    bio: "Przedsiębiorca i pasjonat książek. Przez lata budował firmy technologiczne i edukacyjne. Lumeo to odpowiedź na jego własny problem — brak czasu na czytanie, przy jednoczesnej potrzebie ciągłego rozwoju.",
    fun: "Przeczytał ponad 400 książek i planuje jeszcze więcej.",
  },
  {
    name: "Mateusz Kamiński",
    role: "CTO & Co-founder",
    initials: "MK",
    bio: "Inżynier oprogramowania z ponad 10-letnim doświadczeniem w budowaniu produktów cyfrowych. Odpowiada za technologię, architekturę platformy i doświadczenie użytkownika.",
    fun: "Słucha audiobooków podczas każdego biegania — ponad 500 godzin rocznie.",
  },
];

const values = [
  {
    icon: "M9.663 17h4.673M12 3c-4.418 0-8 3.582-8 8a8 8 0 006 7.745V20a1 1 0 001 1h2a1 1 0 001-1v-1.255A8 8 0 0020 11c0-4.418-3.582-8-8-8z",
    title: "Głębokość, nie powierzchowność",
    desc: "Nie tworzymy streszczeń. Każda analiza to pogłębiona praca naszego zespołu — z kontekstem, komentarzem i praktycznym zastosowaniem.",
  },
  {
    icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
    title: "Po polsku, dla Polaków",
    desc: "Działamy w języku polskim. Nasze analizy uwzględniają lokalny kontekst biznesowy i kulturowy — żadnych dosłownych tłumaczeń.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Wiedza gotowa do działania",
    desc: "Każda analiza kończy się zadaniami wdrożeniowymi. Zależy nam, żebyś nie tylko wiedział więcej, ale też działał inaczej.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Społeczność, nie tylko produkt",
    desc: "Lumeo Lab to przestrzeń, gdzie subskrybenci współtworzą platformę — głosują na kolejne tytuły, dzielą się insightami i uczą się razem.",
  },
];

const milestones = [
  { year: "2022", text: "Powstał pomysł na Lumeo — w notatniku Tomka, podczas lotu do Londynu." },
  { year: "2023", text: "Pierwsze 50 analiz, pierwsi płacący subskrybenci i pierwsza wersja beta platformy." },
  { year: "2024", text: "Przekroczenie 100 analiz, uruchomienie wersji audio i aplikacji mobilnej." },
  { year: "2025", text: "Ponad 2500 aktywnych subskrybentów. Uruchomienie Lumeo Lab i sekcji infografik." },
  { year: "2026", text: "133+ analiz, nowe formaty, nowe kategorie. Wciąż rośniemy." },
];

export default function ONasPage() {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Hero */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/50 mb-6">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">O nas</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">O nas</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black leading-tight mb-4 max-w-2xl">
            Wierzymy, że wiedza zmienia życie
          </h1>
          <p className="text-black/60 text-base max-w-xl leading-relaxed">
            Lumeo powstało z jednego prostego przekonania: najlepsze książki świata powinny być dostępne dla każdego — szybko, głęboko i po polsku.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Nasza misja</p>
            <h2 className="text-3xl font-extrabold text-black mb-5 leading-tight">
              Skracamy dystans między wiedzą a działaniem
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Przeciętna książka biznesowa liczy 300 stron. Czytanie jej zajmuje tygodnie. Tymczasem kluczowe idee można poznać w 30 minut — jeśli ktoś wykonał za Ciebie ciężką pracę selekcji i analizy.
              </p>
              <p>
                Tym właśnie jest Lumeo. Nie streszczamy — analizujemy. Każda analiza to efekt wielu godzin pracy naszego zespołu: wyodrębniamy najważniejsze idee, dodajemy własny komentarz, tworzymy infografikę i nagrywamy wersję audio.
              </p>
              <p>
                Robimy to po polsku, z myślą o polskich czytelnikach, którzy chcą się rozwijać — ale nie mają czasu na czytanie 20 książek rocznie.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "133+", label: "Analiz w bibliotece" },
              { value: "2 500+", label: "Aktywnych subskrybentów" },
              { value: "30 min", label: "Średni czas analizy" },
              { value: "4.8★", label: "Średnia ocena analiz" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <div className="text-3xl font-black text-[#FFD400] mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story / Timeline */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Historia</p>
          <h2 className="text-3xl font-extrabold text-black mb-10">Jak to się zaczęło</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />

            <div className="flex flex-col gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="shrink-0 w-[6.5rem] text-right">
                    <span className="inline-block bg-[#FFD400] text-black text-xs font-black px-3 py-1.5 rounded-full">
                      {m.year}
                    </span>
                  </div>
                  <div className="sm:pl-4 pt-1">
                    <p className="text-sm text-gray-600 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Zespół</p>
          <h2 className="text-3xl font-extrabold text-black mb-10">Ludzie za Lumeo</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((person) => (
              <div key={person.name} className="bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD400] flex items-center justify-center font-black text-lg text-black shrink-0">
                    {person.initials}
                  </div>
                  <div>
                    <div className="font-bold text-black text-base">{person.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{person.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{person.bio}</p>
                <div className="flex items-start gap-2 bg-[#FFFCED] border border-[#FFD400]/30 rounded-xl px-4 py-3">
                  <span className="text-base shrink-0">💡</span>
                  <p className="text-xs text-[#7a5f00] leading-relaxed">{person.fun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Wartości</p>
          <h2 className="text-3xl font-extrabold text-black mb-10">Co nas definiuje</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-5">
                <div className="shrink-0 w-10 h-10 bg-[#FFD400] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-black mb-1.5">{v.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + CTA */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-7">
            <h3 className="font-extrabold text-black text-lg mb-2">Masz pytanie?</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Chętnie odpiszemy — zazwyczaj w ciągu kilku godzin w dni robocze.
            </p>
            <Link
              href="mailto:kontakt@lumeo.pl"
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              kontakt@lumeo.pl
            </Link>
          </div>

          <div className="bg-[#0a0a0a] rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-white text-lg mb-2">Gotowy, żeby zacząć?</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Dołącz do tysięcy czytelników, którzy uczą się efektywniej.
              </p>
            </div>
            <Link
              href="/cennik"
              className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-yellow-300 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors w-fit"
            >
              Załóż konto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
