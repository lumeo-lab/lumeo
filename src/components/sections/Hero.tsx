import Link from "next/link";
import Image from "next/image";

const sideCovers = [
  { src: "/covers/6.png",  rotate: "-rotate-6",  size: "w-24 h-32" },
  { src: "/covers/46.png", rotate: "rotate-3",   size: "w-20 h-28" },
  { src: "/covers/48.png", rotate: "-rotate-3",  size: "w-20 h-28" },
  { src: "/covers/20.png", rotate: "rotate-6",   size: "w-24 h-32" },
];

export default function Hero() {
  return (
    <section className="bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left: text */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight text-black mb-5">
              Kluczowe idee z{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">najlepszych</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFD400] -z-0 rounded"></span>
              </span>{" "}
              książek
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Zamieniamy tysiące stron na 30-minutowe analizy z komentarzem autorskim, infografikami i wersją audio. Ucz się tam, gdzie jesteś.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/rejestracja"
                className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
              >
                Załóż konto
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/ksiazki"
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-black text-gray-700 hover:text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
              >
                Przeglądaj analizy
              </Link>
            </div>
          </div>

          {/* Right: visual */}
          <div className="hidden lg:flex items-center justify-center" style={{ width: "26rem" }}>
            <div className="relative flex items-end justify-center gap-3 pb-6">

              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-[#FFD400]/20 rounded-full blur-3xl"></div>
              </div>

              {/* Side covers */}
              <div className="flex flex-col gap-3 mb-6">
                <div className={`relative ${sideCovers[0].size} rounded-xl overflow-hidden shadow-lg ${sideCovers[0].rotate} border border-gray-100`}>
                  <Image src={sideCovers[0].src} alt="" fill className="object-cover" />
                </div>
                <div className={`relative ${sideCovers[1].size} rounded-xl overflow-hidden shadow-md ${sideCovers[1].rotate} border border-gray-100`}>
                  <Image src={sideCovers[1].src} alt="" fill className="object-cover" />
                </div>
              </div>

              {/* Main featured card */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-40 h-56 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                  <Image src="/covers/3.png" alt="Atomowe nawyki" fill className="object-cover" />
                </div>
                {/* Floating info card */}
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 w-48 -mt-4 relative z-10">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Produktywność</div>
                  <div className="font-bold text-xs text-black leading-snug mb-2">Atomowe nawyki</div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} className="w-2.5 h-2.5 fill-[#C32523]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">31 min</span>
                  </div>
                </div>
              </div>

              {/* Side covers right */}
              <div className="flex flex-col gap-3 mb-6">
                <div className={`relative ${sideCovers[2].size} rounded-xl overflow-hidden shadow-md ${sideCovers[2].rotate} border border-gray-100`}>
                  <Image src={sideCovers[2].src} alt="" fill className="object-cover" />
                </div>
                <div className={`relative ${sideCovers[3].size} rounded-xl overflow-hidden shadow-lg ${sideCovers[3].rotate} border border-gray-100`}>
                  <Image src={sideCovers[3].src} alt="" fill className="object-cover" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute top-0 right-0 bg-black text-[#FFD400] text-xs font-black px-3 py-2 rounded-full shadow-xl ring-2 ring-white flex items-center gap-1.5">
                🎧 <span>Audio + PDF</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
