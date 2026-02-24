import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/ui/NewsletterForm";

const menuLinks = [
  { label: "Strona główna", href: "/" },
  { label: "Książki", href: "/ksiazki" },
  { label: "Cennik", href: "/cennik" },
  { label: "O nas", href: "/o-nas" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Program poleceń", href: "/polecenia" },
];

const categories = [
  { label: "Rozwój osobisty", href: "/ksiazki/rozwoj-osobisty" },
  { label: "Produktywność", href: "/ksiazki/produktywnosc" },
  { label: "Komunikacja i relacje", href: "/ksiazki/komunikacja" },
  { label: "Finanse", href: "/ksiazki/finanse" },
  { label: "Kariera i sukces", href: "/ksiazki/kariera" },
  { label: "Przedsiębiorczość", href: "/ksiazki/przedsiebiorczosc" },
  { label: "Marketing", href: "/ksiazki/marketing" },
  { label: "Biznes i przywództwo", href: "/ksiazki/biznes" },
  { label: "Psychologia", href: "/ksiazki/psychologia" },
  { label: "Rozwój duchowy", href: "/ksiazki/rozwoj-duchowy" },
  { label: "Zdrowie", href: "/ksiazki/zdrowie" },
];

const docLinks = [
  { label: "Regulamin", href: "/regulamin" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Polityka przetwarzania danych", href: "/przetwarzanie-danych" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Newsletter strip */}
        <div className="border-b border-white/10 pb-10 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-extrabold text-white mb-1">Bądź na bieżąco</h3>
              <p className="text-gray-400 text-sm">Zapisz się na newsletter i otrzymuj porady z nowych analiz.</p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[360px]">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="bg-white rounded-xl p-2 inline-block">
                <Image src="/logo.png" alt="Lumeo" width={100} height={33} />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Praktyczne analizy książek biznesowych i rozwojowych. Zrozum lepiej, decyduj mądrzej.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD400] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD400] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD400] hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Menu</h4>
            <ul className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Kategorie</h4>
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs + contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Dokumenty</h4>
            <ul className="flex flex-col gap-2 mb-6">
              {docLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">Kontakt</h4>
            <a href="mailto:kontakt@lumeo.pl" className="text-sm text-gray-300 hover:text-white transition-colors">
              kontakt@lumeo.pl
            </a>
            <div className="mt-5">
              <div className="inline-block bg-white rounded px-3 py-1.5">
                <span className="text-black text-xs font-bold tracking-wide">autopay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 Lumeo. Wszelkie prawa zastrzeżone.</p>
          <p>Stworzone z ❤️ przez Mateusza i Tomka</p>
        </div>
      </div>
    </footer>
  );
}
