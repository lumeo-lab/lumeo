"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useBookStatus, type ListName } from "@/context/BookStatusContext";
import { allBooks } from "@/lib/data";

/* ── Types ─────────────────────────────────────────── */
type Tab = "przeglad" | "ksiazki" | "konto";
type ShelfTab = "favorites" | "reading" | "finished";

/* ── Small helpers ──────────────────────────────────── */
function StatCard({ value, label, icon }: { value: number | string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#FFFCED] flex items-center justify-center text-[#7a5f00] shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-black leading-none">{value}</div>
        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function BookListItem({ bookId, list }: { bookId: number; list: ListName }) {
  const { toggle } = useBookStatus();
  const book = allBooks.find(b => b.id === bookId);
  if (!book) return null;
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 group">
      <Link href={`/p/${book.id}/${book.slug}`} className="relative w-12 h-16 shrink-0 bg-[#F0F0F0] rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
        <Image src={book.cover} alt={book.title} fill className="object-contain p-1" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/p/${book.id}/${book.slug}`}>
          <p className="text-sm font-bold text-black leading-snug hover:text-[#7a5f00] transition-colors line-clamp-1">{book.title}</p>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
        <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {book.category}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {book.readTime} min
        </span>
        <button
          onClick={() => toggle(bookId, list)}
          title="Usuń z listy"
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function EmptyShelf({ text, href }: { text: string; href: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <p className="text-sm text-gray-400 mb-4">{text}</p>
      <Link href={href} className="text-xs font-bold text-black bg-[#FFD400] hover:bg-yellow-300 px-4 py-2 rounded-xl transition-colors">
        Przeglądaj bibliotekę →
      </Link>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────── */
export default function ProfilPage() {
  const { user, signOut, loading } = useAuth();
  const { getList } = useBookStatus();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("przeglad");
  const [shelfTab, setShelfTab] = useState<ShelfTab>("favorites");

  useEffect(() => {
    if (!loading && !user) router.replace("/logowanie");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD400] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fullName: string = user.user_metadata?.full_name ?? "";
  const email: string = user.email ?? "";
  const initials = fullName
    .split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
    || email.slice(0, 2).toUpperCase();

  const memberSince = new Date(user.created_at).toLocaleDateString("pl-PL", {
    year: "numeric", month: "long", day: "numeric",
  });

  const favorites = getList("favorites");
  const reading = getList("reading");
  const finished = getList("finished");

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const shelves: { key: ShelfTab; label: string; ids: number[]; emptyText: string }[] = [
    { key: "favorites",  label: "Ulubione",         ids: favorites, emptyText: "Brak ulubionych. Kliknij ♥ przy wybranej analizie." },
    { key: "reading",    label: "W trakcie",         ids: reading,   emptyText: "Brak analiz w trakcie czytania. Kliknij 📖 przy wybranej analizie." },
    { key: "finished",   label: "Ukończone",         ids: finished,  emptyText: "Brak ukończonych analiz. Kliknij ✓ przy wybranej analizie." },
  ];

  const shelfColors: Record<ShelfTab, string> = {
    favorites: "text-red-500 bg-red-50 border-red-200",
    reading:   "text-[#7a5f00] bg-[#FFFCED] border-[#FFD400]",
    finished:  "text-green-600 bg-green-50 border-green-200",
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Hero header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">

          {/* Breadcrumb */}
          <div className="pt-4 pb-2">
            <nav className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-black font-semibold">Mój profil</span>
            </nav>
          </div>

          {/* Profile header row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD400] flex items-center justify-center font-black text-2xl text-black shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-extrabold text-black leading-tight">{fullName || "Użytkownik"}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{email}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                  Okres próbny
                </span>
                <span className="text-xs text-gray-400">· Dołączył(a) {memberSince}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/cennik"
                className="text-xs font-bold bg-[#FFD400] hover:bg-black hover:text-white text-black px-4 py-2 rounded-xl transition-all"
              >
                Wybierz plan
              </Link>
              <button
                onClick={handleSignOut}
                className="text-xs font-semibold text-gray-400 hover:text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition-all"
              >
                Wyloguj
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-transparent -mb-px">
            {([
              { key: "przeglad", label: "Przegląd" },
              { key: "ksiazki",  label: "Moje książki" },
              { key: "konto",    label: "Ustawienia konta" },
            ] as { key: Tab; label: string }[]).map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                  tab === t.key
                    ? "border-[#FFD400] text-black"
                    : "border-transparent text-gray-400 hover:text-black hover:border-gray-200"
                }`}
              >
                {t.label}
                {t.key === "ksiazki" && (favorites.length + reading.length + finished.length) > 0 && (
                  <span className="ml-1.5 text-[10px] bg-[#FFD400] text-black font-black px-1.5 py-0.5 rounded-full">
                    {favorites.length + reading.length + finished.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── TAB: PRZEGLĄD ─────────────────────────────── */}
        {tab === "przeglad" && (
          <div className="flex flex-col gap-6">

            {/* Stats row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <StatCard
                value={finished.length}
                label="Ukończone analizy"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                value={reading.length}
                label="W trakcie czytania"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              <StatCard
                value={finished.reduce((acc, id) => acc + (allBooks.find(b => b.id === id)?.readTime ?? 0), 0) + " min"}
                label="Zaoszczędzonego czasu"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            <div className="grid lg:grid-cols-[1fr_300px] gap-6">

              {/* Last added to shelves */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-black text-base">Ostatnio dodane</h2>
                  <button onClick={() => setTab("ksiazki")} className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">
                    Zobacz wszystkie →
                  </button>
                </div>
                {(favorites.length + reading.length + finished.length) === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-400 mb-4">Twoja biblioteka jest pusta.</p>
                    <Link href="/ksiazki" className="text-xs font-bold bg-[#FFD400] text-black px-4 py-2 rounded-xl">
                      Przeglądaj analizy →
                    </Link>
                  </div>
                ) : (
                  <div>
                    {[...favorites, ...reading, ...finished].slice(0, 5).map(id => (
                      <BookListItem key={id} bookId={id} list={
                        favorites.includes(id) ? "favorites" : reading.includes(id) ? "reading" : "finished"
                      } />
                    ))}
                  </div>
                )}
              </div>

              {/* Right col */}
              <div className="flex flex-col gap-4">

                {/* Subscription */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Subskrypcja</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-black">Okres próbny</p>
                      <p className="text-xs text-gray-400 mt-0.5">Pełny dostęp przez 7 dni</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full bg-[#FFD400] rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <Link
                    href="/cennik"
                    className="block w-full text-center bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold py-2.5 rounded-xl text-xs transition-all"
                  >
                    Aktywuj pełny dostęp
                  </Link>
                </div>

                {/* Quick links */}
                <div className="bg-white rounded-2xl border border-gray-100 p-2">
                  <Link href="/ksiazki" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Biblioteka analiz
                  </Link>
                  <Link href="/cennik" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Zarządzaj subskrypcją
                  </Link>
                  <Link href="/kontakt" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Pomoc i wsparcie
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── TAB: MOJE KSIĄŻKI ─────────────────────────── */}
        {tab === "ksiazki" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

            {/* Shelf tabs */}
            <div className="flex border-b border-gray-100 px-6 pt-6 gap-2">
              {shelves.map(s => (
                <button
                  key={s.key}
                  onClick={() => setShelfTab(s.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    shelfTab === s.key
                      ? shelfColors[s.key]
                      : "border-transparent text-gray-400 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {s.key === "favorites" && (
                    <svg className="w-4 h-4" fill={shelfTab === s.key ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {s.key === "reading" && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {s.key === "finished" && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {s.label}
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    shelfTab === s.key ? "bg-white/60" : "bg-gray-100 text-gray-500"
                  }`}>
                    {s.ids.length}
                  </span>
                </button>
              ))}
            </div>

            {/* List */}
            <div className="px-6 py-4">
              {(() => {
                const shelf = shelves.find(s => s.key === shelfTab)!;
                if (shelf.ids.length === 0) {
                  return <EmptyShelf text={shelf.emptyText} href="/ksiazki" />;
                }
                return shelf.ids.map(id => (
                  <BookListItem key={id} bookId={id} list={shelfTab} />
                ));
              })()}
            </div>
          </div>
        )}

        {/* ── TAB: KONTO ────────────────────────────────── */}
        {tab === "konto" && (
          <div className="flex flex-col gap-6">

            {/* Personal data */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-black text-base">Dane osobowe</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Zarządzaj swoimi danymi kontaktowymi</p>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Imię i nazwisko</p>
                    <p className="text-sm font-semibold text-black">{fullName || "—"}</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                    Edytuj
                  </button>
                </div>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Adres e-mail</p>
                    <p className="text-sm font-semibold text-black">{email}</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                    Edytuj
                  </button>
                </div>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Hasło</p>
                    <p className="text-sm font-semibold text-black tracking-widest">••••••••</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                    Zmień
                  </button>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-black text-base">Subskrypcja</h2>
                <p className="text-xs text-gray-400 mt-0.5">Twój aktualny plan i historia płatności</p>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">Okres próbny</p>
                      <p className="text-xs text-gray-400">7 dni bezpłatnego dostępu</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Aktywny</span>
                </div>
                <Link
                  href="/cennik"
                  className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold px-4 py-2.5 rounded-xl text-sm transition-all"
                >
                  Przejdź na plan płatny
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-black text-base">Powiadomienia</h2>
                <p className="text-xs text-gray-400 mt-0.5">Wybierz, o czym chcesz być informowany</p>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { label: "Nowe analizy", desc: "Informuj mnie gdy pojawi się nowa analiza" },
                  { label: "Newsletter tygodniowy", desc: "Podsumowanie tygodnia i ciekawostki" },
                  { label: "Promocje i oferty", desc: "Specjalne oferty i zniżki dla subskrybentów" },
                ].map((n, i) => (
                  <div key={n.label} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">{n.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${i < 2 ? "bg-[#FFD400]" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${i < 2 ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-red-100">
                <h2 className="font-bold text-red-600 text-base">Strefa niebezpieczna</h2>
                <p className="text-xs text-gray-400 mt-0.5">Akcje nieodwracalne — wykonuj ostrożnie</p>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">Usuń konto</p>
                  <p className="text-xs text-gray-400 mt-0.5">Trwale usuwa konto i wszystkie dane. Nie można cofnąć.</p>
                </div>
                <button className="text-xs font-bold text-red-500 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                  Usuń konto
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
