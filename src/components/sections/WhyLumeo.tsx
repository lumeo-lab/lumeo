import Link from "next/link";

const pillars = [
  {
    number: "30",
    unit: "min",
    title: "Zamiast 8 godzin czytania",
    desc: "Wyodrębniamy to, co najważniejsze. Żadnego lania wody — tylko esencja gotowa do działania.",
  },
  {
    number: "100",
    unit: "%",
    title: "Po polsku, z komentarzem",
    desc: "Każda analiza pisana jest przez polskich ekspertów z unikalnym komentarzem autorskim.",
  },
  {
    number: "133",
    unit: "+",
    title: "Starannie wybranych tytułów",
    desc: "Tylko książki, które naprawdę warto znać. Selekcja, która oszczędza czas i pieniądze.",
  },
];

const comparison = [
  { label: "Język",               lumeo: "Polski",                       blinkist: "Angielski / tłumaczony" },
  { label: "Głębokość analizy",   lumeo: "Pogłębiona analiza",           blinkist: "Krótkie streszczenie" },
  { label: "Komentarz eksperta",  lumeo: "Tak — każda analiza",          blinkist: "Nie" },
  { label: "Infografiki",         lumeo: "Tak",                          blinkist: "Nie" },
  { label: "Zadania praktyczne",  lumeo: "Tak — do wdrożenia od razu",   blinkist: "Nie" },
  { label: "Nowe tytuły",         lumeo: "Co tydzień",                   blinkist: "Co tydzień" },
];

export default function WhyLumeo() {
  return (
    <section className="bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD400] mb-3">Dlaczego Lumeo?</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Nie streszczamy — analizujemy.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Każda analiza to praca kilku godzin naszego zespołu. Dostajesz esencję wiedzy gotową do zastosowania.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {pillars.map((p) => (
            <div key={p.number + p.unit} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 transition-colors">
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-5xl font-black text-[#FFD400]">{p.number}</span>
                <span className="text-xl font-bold text-[#FFD400] mb-1">{p.unit}</span>
              </div>
              <div className="font-bold text-white text-sm mb-1.5">{p.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-white/5 px-6 py-3 border-b border-white/10">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider"></div>
            <div className="text-xs font-bold text-[#FFD400] uppercase tracking-wider text-center">Lumeo</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Blinkist</div>
          </div>
          {comparison.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1fr_1fr] px-6 py-4 items-center ${i < comparison.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div className="text-sm font-medium text-gray-400">{row.label}</div>
              <div className="text-sm text-white font-semibold text-center flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4 text-[#FFD400] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {row.lumeo}
              </div>
              <div className="text-sm text-gray-500 text-center flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {row.blinkist}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/cennik"
            className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200"
          >
            Załóż konto
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-gray-600 text-xs mt-3">Bez karty kredytowej. Anuluj kiedy chcesz.</p>
        </div>

      </div>
    </section>
  );
}
