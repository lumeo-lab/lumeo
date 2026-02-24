"use client";

import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/lib/data";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border transition-all duration-200 ${open ? "border-[#FFD400] bg-[#FFFCED]" : "border-gray-200 bg-white hover:border-gray-300"}`}>
      <button
        className="w-full flex items-center gap-4 px-6 py-4 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex-1 font-semibold text-sm text-black leading-snug">
          {question}
        </span>
        <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
          open
            ? "bg-black text-[#FFD400]"
            : "bg-[#FFD400] text-black"
        }`}>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "20rem" : "0" }}
      >
        <p className="text-sm text-gray-600 leading-relaxed px-6 pb-5">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="bg-[#F6F6F6] py-16">
      <div className="max-w-3xl mx-auto px-4">

        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Masz pytania?</p>
          <h2 className="text-3xl font-extrabold text-black mb-3">Często zadawane pytania</h2>
          <p className="text-gray-500 text-sm">
            Nie znalazłeś odpowiedzi?{" "}
            <Link href="mailto:kontakt@lumeo.pl" className="font-semibold text-black underline underline-offset-2 hover:text-[#7a5f00] transition-colors">
              Napisz do nas
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

      </div>
    </section>
  );
}
