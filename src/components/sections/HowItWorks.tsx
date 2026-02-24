import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Kluczowe idee",
    desc: "5–7 najważniejszych koncepcji z każdej książki — bez lania wody, bez zbędnych dygresji.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Komentarz autorski",
    desc: "Nasza unikalna perspektywa i interpretacja — nie tylko streszczamy, ale analizujemy.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Infografika",
    desc: "Wizualne podsumowanie do zachowania — idealne do szybkiego przypomnienia kluczowych idei.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 0 0-9 9v7a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4.07A8.003 8.003 0 0 1 12 5a8.003 8.003 0 0 1 7.93 7H18a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-7a9 9 0 0 0-9-9z" />
      </svg>
    ),
    title: "Wersja audio",
    desc: "Słuchaj podczas jazdy, biegania lub przerwy — analiza dostępna w każdej chwili.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Zadania wdrożeniowe",
    desc: "Konkretne ćwiczenia, które pomagają zastosować wiedzę w życiu — nie tylko zrozumieć.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: features list */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#8a6e00] mb-3">Co dostajesz</div>
            <h2 className="text-3xl font-extrabold text-black mb-3 leading-tight">
              Więcej niż streszczenie
            </h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Każda analiza Lumeo to kompletny pakiet — od kluczowych idei, przez komentarz autorski, po zadania, które realnie zmieniają nawyki.
            </p>

            <div className="flex flex-col gap-5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 bg-[#FFD400] rounded-lg flex items-center justify-center text-black">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-black">{f.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/ksiazki"
                className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
              >
                Zobacz przykładową analizę
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: sample analysis card */}
          <div className="relative flex justify-center">
            {/* Bg blob */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-[#FFD400]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-sm overflow-hidden">
              {/* Book header */}
              <div className="bg-[#0a0a0a] px-5 py-4 flex items-center gap-4">
                <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <Image src="/covers/3.png" alt="Atomowe nawyki" fill className="object-cover" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Produktywność</div>
                  <div className="font-bold text-white text-sm leading-snug">Atomowe nawyki</div>
                  <div className="text-gray-400 text-xs mt-0.5">James Clear</div>
                </div>
                <div className="ml-auto bg-[#FFD400] text-black text-[10px] font-bold px-2 py-1 rounded-md">
                  ~31 min
                </div>
              </div>

              {/* Content preview */}
              <div className="px-5 py-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kluczowe idee</div>
                {["Małe zmiany, wielkie efekty — reguła 1%", "Tożsamość ważniejsza niż cel", "Cztery prawa budowania nawyków", "Środowisko kształtuje zachowanie"].map((idea, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-2.5">
                    <div className="w-5 h-5 bg-[#FFD400] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-black">{i + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700 leading-snug">{idea}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">🎧 Audio</span>
                  <span className="flex items-center gap-1">📄 PDF</span>
                  <span className="flex items-center gap-1">🎨 Infografika</span>
                </div>
                <div className="text-xs font-bold text-[#8a6e00]">✓ Zadania</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
