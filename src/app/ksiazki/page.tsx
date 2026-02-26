"use client";

import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import BookCard from "@/components/ui/BookCard";
import { allBooks, categories } from "@/lib/data";

const catIcons: Record<string, ReactElement> = {
  "komunikacja-i-relacje":        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  "produktywnosc-i-efektywnosc":  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  "rozwoj-osobisty":              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1M21 12h1M4.22 19.778l.707-.707M18.364 5.636l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>,
  "pieniadze-i-wolnosc-finansowa":<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "przedsiebiorczosc-i-start-up": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  "kariera-i-sukces":             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  "biznes-i-przywodztwo":         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  "psychologia":                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3c-4.418 0-8 3.582-8 8a8 8 0 006 7.745V20a1 1 0 001 1h2a1 1 0 001-1v-1.255A8 8 0 0020 11c0-4.418-3.582-8-8-8z" /></svg>,
  "marketing":                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
  "rozwoj-duchowy":               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  "zdrowie":                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
};

const defaultCatIcon = <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

type SortOption = "default" | "rating" | "time-asc" | "time-desc";

function pluralAnaliz(count: number): string {
  if (count === 1) return "analiza";
  if (count >= 2 && count <= 4) return "analizy";
  return "analiz";
}

export default function KsiazkiPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let books = [...allBooks].reverse();

    if (activeCategory !== "all") {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) books = books.filter((b) => b.category === cat.name);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      books = books.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    if (sort === "rating") {
      books.sort((a, b) => b.rating - a.rating);
    } else if (sort === "time-asc") {
      books.sort((a, b) => a.readTime - b.readTime);
    } else if (sort === "time-desc") {
      books.sort((a, b) => b.readTime - a.readTime);
    }

    return books;
  }, [activeCategory, sort, search]);

  function reset() {
    setActiveCategory("all");
    setSort("default");
    setSearch("");
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Top bar: breadcrumb + search + sort */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/70 shrink-0">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">Książki</span>
          </nav>

          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj po tytule lub autorze..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg text-sm text-black bg-white/70 placeholder-black/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-black/20 rounded-lg px-3 py-1.5 text-sm text-black bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer shrink-0"
          >
            <option value="default">Najnowsze</option>
            <option value="rating">Najwyżej oceniane</option>
            <option value="time-asc">Czas: rosnąco</option>
            <option value="time-desc">Czas: malejąco</option>
          </select>
        </div>
      </div>

      {/* Main: sidebar + grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar — kategorie */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-24">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Kategorie</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left w-full ${
                  activeCategory === "all"
                    ? "bg-[#FFD400] text-black"
                    : "text-gray-600 hover:bg-white hover:text-black"
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Wszystkie
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left w-full ${
                    activeCategory === cat.slug
                      ? "bg-[#FFD400] text-black"
                      : "text-gray-600 hover:bg-white hover:text-black"
                  }`}
                >
                  <span className="shrink-0">{catIcons[cat.slug] ?? defaultCatIcon}</span>
                  <span className="leading-snug">{cat.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Books grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile category strip */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 lg:hidden" style={{ scrollbarWidth: "none" }}>
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeCategory === "all" ? "bg-[#FFD400] text-black" : "bg-white text-gray-700"}`}
              >
                Wszystkie
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${activeCategory === cat.slug ? "bg-[#FFD400] text-black" : "bg-white text-gray-700"}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {filtered.length > 0 ? (
              <>
                <p className="text-sm text-gray-400 mb-5">
                  {filtered.length} {pluralAnaliz(filtered.length)}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filtered.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="text-lg font-bold text-black mb-2">Brak wyników</h3>
                <p className="text-gray-500 text-sm mb-6">Nie znaleziono analiz pasujących do Twoich kryteriów.</p>
                <button
                  onClick={reset}
                  className="bg-[#FFD400] hover:bg-black hover:text-white text-black font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Resetuj filtry
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
