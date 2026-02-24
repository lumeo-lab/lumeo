"use client";

import Link from "next/link";
import { useRef } from "react";
import { recentBooks } from "@/lib/data";
import BookCard from "@/components/ui/BookCard";

const VISIBLE = 5;

export default function RecentBooks() {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!ref.current) return;
    const card = ref.current.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 32 : 260;
    ref.current.scrollBy({ left: dir === "right" ? w * VISIBLE : -w * VISIBLE, behavior: "smooth" });
  }

  return (
    <section className="bg-[#F6F6F6] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-black">Ostatnio dodane</h2>
            <p className="text-gray-500 text-sm mt-1">Najnowsze analizy na platformie.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-[#FFD400] hover:border-[#FFD400] transition-all duration-200 shadow-sm"
              aria-label="Poprzednie"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-[#FFD400] hover:border-[#FFD400] transition-all duration-200 shadow-sm"
              aria-label="Następne"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <Link href="/ksiazki" className="text-sm font-semibold text-black hover:underline ml-1">
              Wszystkie →
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={ref}
          className="flex gap-10 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          {recentBooks.map((book) => (
            <div
              key={book.id}
              data-card=""
              className="flex-shrink-0 w-48"
              style={{ scrollSnapAlign: "start" }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
