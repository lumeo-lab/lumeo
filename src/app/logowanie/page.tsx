"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogowaniePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/profil");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError("Nieprawidłowy adres e-mail lub hasło.");
    } else {
      router.push("/profil");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Lumeo" className="h-10 w-auto mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-extrabold text-black mb-1">Zaloguj się</h1>
          <p className="text-gray-500 text-sm">
            Nie masz konta?{" "}
            <Link href="/rejestracja" className="font-semibold text-black hover:text-[#7a5f00] underline underline-offset-2 transition-colors">
              Załóż konto za darmo
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Adres e-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jan@firma.pl"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition placeholder-gray-300"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Hasło
                </label>
                <Link href="#" className="text-xs text-gray-400 hover:text-black transition-colors">
                  Nie pamiętam hasła
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400] focus:border-transparent transition placeholder-gray-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Logowanie...
                </>
              ) : "Zaloguj się"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Logując się, akceptujesz{" "}
          <Link href="#" className="underline hover:text-black transition-colors">Regulamin</Link>
          {" "}i{" "}
          <Link href="#" className="underline hover:text-black transition-colors">Politykę prywatności</Link>
        </p>
      </div>
    </div>
  );
}
