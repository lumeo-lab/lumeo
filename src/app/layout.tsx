import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { BookStatusProvider } from "@/context/BookStatusContext";

export const metadata: Metadata = {
  title: "Lumeo — Praktyczne analizy książek biznesowych i rozwojowych",
  description:
    "Poznaj kluczowe idee z najlepszych książek w 30 minut. Analizy z infografiką, audio i zadaniami wdrożeniowymi. Załóż konto za darmo.",
  keywords: "analizy książek, streszczenia, rozwój osobisty, biznes, produktywność",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <BookStatusProvider>
            <Topbar />
            <Header />
            <main>{children}</main>
            <Footer />
          </BookStatusProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
