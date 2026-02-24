import Link from "next/link";
import { freeBooks } from "@/lib/data";
import BookCard from "@/components/ui/BookCard";

const perks = [
  "Pełna analiza — bez rejestracji",
  "Wersja PDF do pobrania",
  "Wersja audio w wybranych tytułach",
];

export default function FreeBooks() {
  return (
    <section className="bg-[#F6F6F6] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center">

          {/* Left: text */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#7a5f00] bg-[#FFFCED] px-3 py-1 rounded-full inline-block mb-4">
              Bezpłatny dostęp
            </div>
            <h2 className="text-3xl font-extrabold text-black leading-tight mb-4">
              Sprawdź zanim<br />zdecydujesz.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Trzy pełne analizy dostępne za darmo — bez rejestracji, bez karty kredytowej. Przekonaj się, czym jest Lumeo.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#FFD400] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <Link
              href="/ksiazki"
              className="inline-flex items-center gap-2 bg-black hover:bg-[#FFD400] hover:text-black text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
            >
              Przeglądaj wszystkie analizy
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right: 3 books */}
          <div className="grid grid-cols-3 gap-6">
            {freeBooks.map((book) => (
              <BookCard
                key={book.id}
                book={{ ...book, isFree: true }}
                showCta
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
