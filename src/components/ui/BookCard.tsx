"use client";

import Link from "next/link";
import Image from "next/image";
import { useBookStatus } from "@/context/BookStatusContext";

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  readTime: number;
  category: string;
  hasAudio: boolean;
  slug: string;
  reviewCount?: number;
  cover: string;
  isFree?: boolean;
}

interface BookCardProps {
  book: Book;
  showCta?: boolean;
}

function pluralGlosow(n: number): string {
  if (n === 1) return "głos";
  if (n >= 2 && n <= 4) return "głosy";
  return "głosów";
}

export default function BookCard({ book, showCta = false }: BookCardProps) {
  const { isInList, toggle } = useBookStatus();
  const liked = isInList(book.id, "favorites");
  const reading = isInList(book.id, "reading");
  const finished = isInList(book.id, "finished");

  return (
    <Link
      href={`/p/${book.id}/${book.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#FFD400] hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Cover area */}
      <div className="relative bg-[#F0F0F0] flex items-center justify-center p-4" style={{ height: "13rem" }}>
        <div className="relative h-full w-auto" style={{ aspectRatio: "3/4", maxHeight: "100%" }}>
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        {book.isFree && (
          <div className="absolute top-2 left-2 bg-[#FFD400] text-black text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
            BEZPŁATNA
          </div>
        )}
        {book.hasAudio && (
          <div className="absolute top-2 right-2 bg-black text-[#FFD400] rounded-full p-1" title="Wersja audio">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3a9 9 0 0 0-9 9v7a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4.07A8.003 8.003 0 0 1 12 5a8.003 8.003 0 0 1 7.93 7H18a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-7a9 9 0 0 0-9-9z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-3 py-3 gap-1.5">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 truncate">{book.category}</span>

        <p className="font-bold text-[15px] text-black leading-snug line-clamp-2 group-hover:text-[#7a5f00] transition-colors">
          {book.title}
        </p>

        <p className="text-[13px] text-gray-400 truncate">{book.author}</p>

        {/* Stars + rating (left) | vote count (right) */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className={`w-3.5 h-3.5 ${book.rating >= s ? "fill-[#C32523]" : "fill-gray-200"}`} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{book.rating.toFixed(1)}</span>
          </div>
          {book.reviewCount !== undefined && (
            <span className="text-xs text-gray-400">
              {book.reviewCount} {pluralGlosow(book.reviewCount)}
            </span>
          )}
        </div>

        {/* Action icons + time */}
        <div
          className="flex items-center gap-1.5"
          onClick={(e) => e.preventDefault()}
        >
          {/* Ulubione */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(book.id, "favorites"); }}
            title="Dodaj do ulubionych"
            className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
              liked
                ? "bg-red-50 border-red-200 text-red-500"
                : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50"
            }`}
          >
            <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* W trakcie czytania */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(book.id, "reading"); }}
            title="W trakcie czytania"
            className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
              reading
                ? "bg-[#FFFCED] border-[#FFD400] text-[#7a5f00]"
                : "border-gray-200 text-gray-400 hover:border-[#FFD400] hover:text-[#7a5f00] hover:bg-[#FFFCED]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          {/* Przeczytane */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(book.id, "finished"); }}
            title="Oznacz jako przeczytane"
            className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all ${
              finished
                ? "bg-green-50 border-green-200 text-green-600"
                : "border-gray-200 text-gray-400 hover:border-green-200 hover:text-green-500 hover:bg-green-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Time — pushed to the right */}
          <span className="ml-auto text-xs text-gray-400 flex items-center gap-0.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {book.readTime} min
          </span>
        </div>

        {showCta && (
          <button className="mt-1.5 w-full bg-[#FFD400] hover:bg-black hover:text-white text-black text-xs font-bold py-1.5 rounded-lg transition-colors">
            Czytaj za darmo
          </button>
        )}
      </div>
    </Link>
  );
}
