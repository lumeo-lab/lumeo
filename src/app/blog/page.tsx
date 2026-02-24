"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

const allCategories = ["Wszystkie", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const categoryColors: Record<string, string> = {
  "Psychologia":           "bg-purple-100 text-purple-700",
  "Biznes i przywództwo":  "bg-blue-100 text-blue-700",
  "Finanse":               "bg-green-100 text-green-700",
  "Przedsiębiorczość":     "bg-orange-100 text-orange-700",
  "Rozwój osobisty":       "bg-yellow-100 text-yellow-800",
};

function categoryClass(cat: string) {
  return categoryColors[cat] ?? "bg-gray-100 text-gray-600";
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let posts = [...blogPosts];
    if (activeCategory !== "Wszystkie") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter((p) =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, search]);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Hero bar */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/60">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">Blog</span>
          </nav>

          {/* Search */}
          <div className="relative w-64 hidden sm:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj artykułów..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-black/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/20 placeholder-black/40"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[#FFD400] text-black"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="text-lg font-bold text-black mb-2">Brak wyników</h3>
            <p className="text-gray-500 text-sm mb-6">Nie znaleziono artykułów pasujących do Twoich kryteriów.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Wszystkie"); }}
              className="bg-[#FFD400] hover:bg-black hover:text-white text-black font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Resetuj filtry
            </button>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 bg-white rounded-2xl border border-gray-100 hover:border-[#FFD400] hover:shadow-md transition-all duration-200 overflow-hidden mb-8"
              >
                <div className="relative bg-[#F0F0F0] flex items-center justify-center" style={{ minHeight: "18rem" }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass(featured.category)}`}>
                    {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <span className="text-xs text-gray-400 mb-3">{featured.date}</span>
                  <h2 className="text-2xl font-extrabold text-black leading-snug mb-4 group-hover:text-[#7a5f00] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-black group-hover:text-[#7a5f00] transition-colors">
                    Czytaj więcej
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#FFD400] hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <div className="relative bg-[#F0F0F0] flex items-center justify-center overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <span className="text-xs text-gray-400 mb-2">{post.date}</span>
                      <h3 className="font-bold text-base text-black leading-snug group-hover:text-[#7a5f00] transition-colors mb-3 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-black group-hover:text-[#7a5f00] transition-colors">
                        Czytaj więcej
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-[#0a0a0a] rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#FFD400] mb-2">Newsletter</p>
            <h3 className="text-xl font-extrabold text-white mb-1">Nowe artykuły co tydzień</h3>
            <p className="text-gray-400 text-sm">Dołącz do 2500+ czytelników i otrzymuj najlepsze treści na skrzynkę.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Twój adres e-mail"
              className="flex-1 sm:w-60 px-4 py-2.5 rounded-xl text-sm border border-white/10 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD400]"
            />
            <button
              type="submit"
              className="shrink-0 bg-[#FFD400] hover:bg-yellow-300 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Zapisz się
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
