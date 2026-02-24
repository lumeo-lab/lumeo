"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useBookStatus } from "@/context/BookStatusContext";
import { allBooks } from "@/lib/data";

function BookRow({ bookId }: { bookId: number }) {
  const book = allBooks.find(b => b.id === bookId);
  if (!book) return null;
  return (
    <Link
      href={`/p/${book.id}/${book.slug}`}
      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div className="relative w-10 h-14 shrink-0 bg-[#F0F0F0] rounded-md overflow-hidden">
        <Image src={book.cover} alt={book.title} fill className="object-contain p-0.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-black group-hover:text-[#7a5f00] transition-colors leading-snug truncate">{book.title}</p>
        <p className="text-xs text-gray-400 truncate">{book.author}</p>
      </div>
      <span className="text-xs text-gray-400 shrink-0 flex items-center gap-0.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {book.readTime} min
      </span>
    </Link>
  );
}

interface BookSectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  ids: number[];
  emptyText: string;
}

function BookSection({ title, icon, color, ids, emptyText }: BookSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className={`flex items-center justify-center w-7 h-7 rounded-lg ${color}`}>
          {icon}
        </span>
        <h3 className="font-bold text-black text-base">{title}</h3>
        <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {ids.length}
        </span>
      </div>
      {ids.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">{emptyText}</p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-50">
          {ids.map(id => <BookRow key={id} bookId={id} />)}
        </div>
      )}
    </div>
  );
}

export default function ProfilPage() {
  const { user, signOut, loading } = useAuth();
  const { getList } = useBookStatus();
  const router = useRouter();

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
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || email.slice(0, 2).toUpperCase();

  const memberSince = new Date(user.created_at).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const favorites = getList("favorites");
  const reading = getList("reading");
  const finished = getList("finished");

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Breadcrumb bar */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00] px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/60">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">Mój profil</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">

          {/* Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Avatar card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#FFD400] flex items-center justify-center font-black text-2xl text-black mx-auto mb-4">
                {initials}
              </div>
              <h2 className="font-extrabold text-black text-lg leading-snug mb-0.5">{fullName || "Użytkownik"}</h2>
              <p className="text-sm text-gray-400 mb-4">{email}</p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Dołączył(a) {memberSince}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: finished.length, label: "Ukończone" },
                { value: reading.length, label: "W trakcie" },
                { value: favorites.length, label: "Ulubione" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center">
                  <div className="text-xl font-black text-[#FFD400]">{s.value}</div>
                  <div className="text-[10px] text-gray-500 leading-snug mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Subscription status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Subskrypcja</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm font-semibold text-gray-700">Okres próbny</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Aktywuj pełny dostęp, żeby korzystać ze wszystkich analiz.</p>
              <Link
                href="/cennik"
                className="block w-full text-center bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold py-2 rounded-xl text-xs transition-all"
              >
                Wybierz plan
              </Link>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-2">
              <Link href="/ksiazki" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Biblioteka analiz
              </Link>
              <Link href="/cennik" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Zarządzaj subskrypcją
              </Link>
              <Link href="/kontakt" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Wsparcie
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Wyloguj się
              </button>
            </div>

          </div>

          {/* Main content */}
          <div className="flex flex-col gap-5">

            {/* Book shelves */}
            <BookSection
              title="Ulubione"
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              color="bg-red-50 text-red-500"
              ids={favorites}
              emptyText="Brak ulubionych. Kliknij ♥ przy wybranej analizie."
            />

            <BookSection
              title="W trakcie czytania"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              color="bg-[#FFFCED] text-[#7a5f00]"
              ids={reading}
              emptyText="Brak analiz w trakcie czytania. Kliknij 📖 przy wybranej analizie."
            />

            <BookSection
              title="Ukończone"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              color="bg-green-50 text-green-600"
              ids={finished}
              emptyText="Brak ukończonych analiz. Kliknij ✓ przy wybranej analizie."
            />

            {/* Account info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-black text-base mb-5">Dane konta</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Imię i nazwisko</p>
                    <p className="text-sm font-semibold text-black">{fullName || "—"}</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">Edytuj</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Adres e-mail</p>
                    <p className="text-sm font-semibold text-black">{email}</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">Edytuj</button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Hasło</p>
                    <p className="text-sm font-semibold text-black">••••••••</p>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-black transition-colors">Zmień</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
