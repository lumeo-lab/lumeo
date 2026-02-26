"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBooks } from "@/lib/data";
import { useBookStatus } from "@/context/BookStatusContext";
import type { Analysis } from "@/lib/analysis-types";
import { analysisJakZdobycPrzyjaciol } from "@/lib/analysis-jak-zdobyc";

/* ── Per-book content lookup ─────────────────────────── */
const analysisById: Record<number, Analysis> = {
  1: analysisJakZdobycPrzyjaciol,
};

const analysisContent: Record<string, Analysis> = {
  "Produktywność": {
    intro: "Ta analiza to esencja wiedzy z jednej z najważniejszych książek o produktywności. W 30 minut dowiesz się, co autor odkrył przez lata badań i jak możesz to zastosować już dziś.",
    sections: [
      {
        id: "fundamenty",
        title: "Dlaczego standardowe podejście nie działa",
        content: [
          { type: "p", text: `Większość ludzi podchodzi do produktywności przez pryzmat czasu — szuka sposobów, by zmieścić więcej zadań w tę samą liczbę godzin. To fundamentalny błąd. Czas jest zasobem stałym, energii i skupienia — nie. To właśnie nimi powinieneś zarządzać w pierwszej kolejności.` },
          { type: "quote", text: `„Nie chodzi o to, ile godzin pracujesz. Chodzi o to, co dzieje się w tych godzinach."` },
          { type: "p", text: `Autor przez lata obserwował setki wysokowydajnych osób i odkrył, że łączy je nie twardy harmonogram, lecz umiejętność ochrony przestrzeni na pracę głęboką. Praca płytka — e-maile, spotkania, odpowiadanie na wiadomości — wypełnia czas iluzją zajętości, nie przynosząc prawdziwych rezultatów.` },
          { type: "lumeo", text: `Komentarz Lumeo: W polskich firmach praca głęboka jest szczególnie trudna ze względu na kulturę open space i oczekiwanie natychmiastowych odpowiedzi. Warto ustalić z zespołem „godziny ciszy" — bloki 90 minut bez spotkań i wiadomości.` },
        ],
      },
      {
        id: "system",
        title: "Budowanie systemu zamiast listy zadań",
        content: [
          { type: "p", text: `Lista zadań to narzędzie, nie system. Różnica jest fundamentalna. Lista pyta: co mam zrobić? System pyta: jakie warunki muszę stworzyć, żeby pożądane działania działy się automatycznie?` },
          { type: "insight", text: `Kluczowa idea: Środowisko kształtuje zachowanie silniej niż motywacja. Zanim zmienisz nawyki, zmień przestrzeń wokół siebie.` },
          { type: "p", text: `Naukowcy z MIT odkryli, że aż 40% naszych codziennych działań to nawyki — decyzje podejmowane automatycznie, bez angażowania świadomej myśli. To oznacza, że walka z nawykami na poziomie świadomości jest z góry skazana na porażkę. Zamiast tego należy przeprojektować otoczenie tak, by pożądane zachowania były domyślne, a niepożądane — trudne.` },
          { type: "quote", text: `„Nie wzrastasz do poziomu swoich celów. Opadasz do poziomu swoich systemów."` },
          { type: "lumeo", text: `Komentarz Lumeo: Zanim zaczniesz od poniedziałku — jak brzmią Twoje nawyki środowiskowe? Czy Twoje biurko zachęca do skupienia czy do rozproszenia? Czy telefon leży w zasięgu ręki podczas pracy?` },
        ],
      },
      {
        id: "male-kroki",
        title: "Siła małych kroków — compound effect",
        content: [
          { type: "p", text: `James Clear w „Atomowych nawykach" opisuje zjawisko, które ekonomiści nazywają compound interest — procentem składanym zastosowanym do zachowań. Poprawa o 1% każdego dnia daje po roku efekt 37-krotnie lepszy niż punkt startowy. Pogorszenie o 1% dziennie sprowadza wyniki niemal do zera.` },
          { type: "insight", text: `Liczba: Poprawa o zaledwie 1% dziennie daje po 365 dniach wynik 37,78× lepszy niż na starcie. Pogorszenie o 1% dziennie daje wynik 0,03 — prawie zero.` },
          { type: "p", text: `Problem w tym, że małe kroki są niewidoczne na co dzień. Gdy idziesz na siłownię raz, nie widać różnicy. Gdy jesz jedną sałatkę zamiast frytki, nic się nie zmienia. Mózg potrzebuje natychmiastowej nagrody, a compound effect działa na opóźnienie. To dlatego tak wielu ludzi porzuca nowe nawyki po kilku tygodniach — nie widzą efektów.` },
          { type: "quote", text: `„Sukcesy i porażki to nie zdarzenia jednorazowe. To skumulowane efekty codziennych wyborów."` },
          { type: "lumeo", text: `Komentarz Lumeo: Polska mentalność często oczekuje szybkich rezultatów — może to spuścizna lat 90., kiedy wszystko zmieniało się gwałtownie. Compound effect wymaga cierpliwości i zaufania do procesu. Jeśli czujesz, że nic się nie dzieje — to właśnie wtedy dzieje się najwięcej.` },
        ],
      },
      {
        id: "wdrozenie",
        title: "Jak wdrożyć zmiany trwale",
        content: [
          { type: "p", text: `Autor wyróżnia trzy warstwy zmiany: wyniki (co chcę osiągnąć), procesy (co robię) i tożsamość (kim jestem). Większość prób zmiany skupia się na wynikach — „chcę schudnąć 10 kg", „chcę więcej zarabiać". To najsłabszy poziom zmiany.` },
          { type: "p", text: `Najtrwalsza zmiana zaczyna się od tożsamości. Zamiast mówić „chcę biegać", powiedz „jestem biegaczem". Zamiast „chcę czytać więcej" — „jestem osobą, która codziennie się uczy". Każde działanie zgodne z nową tożsamością to dowód na jej prawdziwość. Z każdym takim dowodem tożsamość się umacnia.` },
          { type: "insight", text: `Framework: Pętla nawyku = Sygnał → Pragnienie → Działanie → Nagroda. Aby zbudować nowy nawyk, przypisz go do istniejącego sygnału. Aby usunąć zły nawyk, usuń sygnał ze środowiska.` },
          { type: "p", text: `Technika habit stacking, czyli łączenia nawyków, pozwala przypiąć nowe zachowania do już istniejących. Formuła brzmi: „Po [OBECNY NAWYK] wykonam [NOWY NAWYK]". Na przykład: „Po porannej kawie napiszę 3 rzeczy, za które jestem wdzięczny". Obecny nawyk staje się sygnałem dla nowego.` },
          { type: "lumeo", text: `Komentarz Lumeo: Tożsamościowe podejście do zmiany jest rewolucyjne, bo działa od środka na zewnątrz. Zamiast zmieniać zachowanie siłą woli, zmieniasz narrację o sobie. A ludzie zazwyczaj działają zgodnie z tym, za kogo się uważają.` },
        ],
      },
      {
        id: "wnioski",
        title: "Kluczowe wnioski i następne kroki",
        content: [
          { type: "p", text: `Productywność nie jest celem samym w sobie — jest narzędziem do życia, które uważasz za wartościowe. Najpotężniejsze systemy to te proste, które możesz utrzymać przez lata, nie te skomplikowane, które działają przez tydzień.` },
          { type: "quote", text: `„Nie musisz być wyjątkowy, żeby zacząć. Musisz zacząć, żeby stać się wyjątkowym."` },
          { type: "p", text: `Zacznij od jednej zmiany. Nie od rewolucji. Wybierz jeden nawyk, który chcesz zbudować lub usunąć. Zastosuj framework pętli nawyku. Przez 30 dni skupiaj się tylko na tym. Potem dodaj kolejny. Powolna akumulacja daje trwalsze efekty niż gwałtowna zmiana.` },
          { type: "insight", text: `Zapamiętaj: Systemy > Cele. Tożsamość > Zachowanie. Środowisko > Silna wola. Małe kroki > Wielkie postanowienia.` },
        ],
      },
    ],
  },
  "Psychologia": {
    intro: "Ludzki umysł jest bardziej irracjonalny niż nam się wydaje. Ta analiza odkrywa mechanizmy, które kierują naszymi decyzjami — często bez naszej wiedzy — i pokazuje, jak je wykorzystać z korzyścią dla siebie.",
    sections: [
      {
        id: "mity",
        title: "Mit racjonalnego człowieka",
        content: [
          { type: "p", text: `Ekonomia klasyczna zbudowana była na założeniu, że ludzie są racjonalnymi aktorami — że porównują opcje, kalkulują zyski i straty, i podejmują optymalną decyzję. To piękny model, który nie ma nic wspólnego z rzeczywistością.` },
          { type: "quote", text: `„Wszyscy jesteśmy bardziej irracjonalni niż myślimy, i co gorsza — jesteśmy irracjonalni w przewidywalny sposób."` },
          { type: "p", text: `Odkrycia psychologii poznawczej z ostatnich 50 lat pokazują, że ludzki mózg operuje na skrótach myślowych — heurystykach — które zazwyczaj działają dobrze, ale systematycznie zawodzą w przewidywalnych sytuacjach. Rozumiejąc te wzorce, możemy podejmować lepsze decyzje i rozumieć zachowania innych.` },
          { type: "lumeo", text: `Komentarz Lumeo: Świadomość własnej irracjonalności to pierwszy krok do lepszych decyzji. Nie chodzi o to, żeby stać się robotem kalkulującym każdy ruch — chodzi o rozpoznawanie momentów, kiedy emocje i skróty myślowe przejmują stery.` },
        ],
      },
      {
        id: "pulapki",
        title: "Najważniejsze pułapki myślowe",
        content: [
          { type: "p", text: `Efekt zakotwiczenia sprawia, że pierwsza liczba, którą zobaczymy w negocjacjach, przetargu czy wycenie, nieproporcjonalnie wpływa na nasz końcowy osąd. Sprzedawca, który zaczyna od wysokiej ceny, ustawia kotwicę — nawet jeśli ostateczna cena jest niższa, nadal czujemy, że dostaliśmy dobry deal.` },
          { type: "insight", text: `Kluczowe błędy poznawcze: zakotwiczenie, efekt dostępności, myślenie grupowe, efekt potwierdzenia, unikanie strat (loss aversion).` },
          { type: "p", text: `Loss aversion — awersja do strat — to jedno z najpotężniejszych odkryć psychologii behawioralnej. Kahneman i Tversky odkryli, że ból straty 100 zł jest psychologicznie dwukrotnie silniejszy niż przyjemność zysku 100 zł. Dlatego ludzie wolą nie stracić, niż zyskać — nawet gdy kalkulacja matematyczna przemawia za ryzykiem.` },
          { type: "quote", text: `„Dla wielu ludzi lęk przed porażką jest silniejszy niż nadzieja na sukces. To ogranicza ich w sposób, którego nawet nie dostrzegają."` },
          { type: "lumeo", text: `Komentarz Lumeo: Loss aversion tłumaczy wiele polskich nawyków finansowych — trzymanie gotówki zamiast inwestowania, niechęć do zmiany pracy „bo mam stałe" mimo lepszych ofert, odkładanie ważnych decyzji. Wiedza o tym mechanizmie nie usuwa go automatycznie, ale pozwala go zauważyć.` },
        ],
      },
      {
        id: "wplyw",
        title: "Wpływ i perswazja — zasady Cialdiniego",
        content: [
          { type: "p", text: `Robert Cialdini wyróżnił sześć zasad wpływu, które działają na każdego człowieka niezależnie od kultury i wykształcenia: wzajemność, zaangażowanie i konsekwencja, społeczny dowód słuszności, lubienie, autorytet i niedobór. Firmy od dekad budują swoje strategie marketingowe właśnie wokół tych mechanizmów.` },
          { type: "p", text: `Społeczny dowód słuszności to mechanizm, który sprawia, że jesteśmy bardziej skłonni zrobić coś, jeśli widzimy, że inni to robią. To dlatego restauracje ustawiają kolejki (nawet gdy stolik jest wolny), a sklepy internetowe pokazują „1247 osób kupiło ten produkt".` },
          { type: "insight", text: `Zasady Cialdiniego: (1) Wzajemność, (2) Zaangażowanie i konsekwencja, (3) Społeczny dowód słuszności, (4) Lubienie, (5) Autorytet, (6) Niedobór. Każda z nich może być narzędziem obrony lub ataku.` },
          { type: "lumeo", text: `Komentarz Lumeo: Znajomość zasad wpływu ma dwa zastosowania: defensywne (rozpoznaję, kiedy ktoś mną manipuluje) i ofensywne (skuteczniej przekonuję do swoich racji, projektu, produktu). W biznesie i relacjach to nieoceniona wiedza.` },
        ],
      },
      {
        id: "wnioski",
        title: "Jak żyć z wiedzą o irracjonalności",
        content: [
          { type: "p", text: `Znajomość mechanizmów psychologicznych nie immunizuje nas na nie — ale pozwala działać z większą świadomością. Kiedy czujesz silną presję do podjęcia szybkiej decyzji, kiedy oferta jest „tylko dziś", kiedy wszyscy wokół robią to samo — to właśnie te mechanizmy pracują na czyjś rachunek.` },
          { type: "quote", text: `„Mądrość nie polega na tym, żeby nie mieć emocji. Polega na tym, żeby wiedzieć, kiedy słuchać emocji, a kiedy je kwestionować."` },
          { type: "p", text: `Strategie ochronne: spowalniaj decyzje pod presją czasu, szukaj perspektyw odmiennych od swojej, pytaj 'dlaczego naprawdę to robię?', testuj swoje przekonania pytaniem 'co musiałoby być prawdą, żebym zmienił zdanie?'` },
          { type: "insight", text: `Zapamiętaj: Jesteś irracjonalny. Ja jestem irracjonalny. Wszyscy jesteśmy. Pytanie nie brzmi: czy ulegnę błędowi poznawczemu? Lecz: który błąd popełniam teraz i jak go zminimalizować?` },
        ],
      },
    ],
  },
  "Biznes i przywództwo": {
    intro: "Co odróżnia liderów, którzy budują trwałe organizacje, od tych, którzy generują krótkoterminowe wyniki? Ta analiza odpowiada na to pytanie, opierając się na badaniach i przypadkach z realnego biznesu.",
    sections: [
      {
        id: "przywodztwo",
        title: "Czym naprawdę jest przywództwo",
        content: [
          { type: "p", text: `Przywództwo to nie tytuł ani stanowisko — to zestaw zachowań. Możesz być prezesem i nie być liderem. Możesz być stażystą i inspirować całą organizację. Badania nad skutecznymi liderami pokazują jedno wspólne mianownik: koncentracja na ludziach, nie na procesach.` },
          { type: "quote", text: `„Liderzy nie tworzą więcej zwolenników. Liderzy tworzą więcej liderów."` },
          { type: "p", text: `Simon Sinek w 'Zacznij od Dlaczego' pokazuje, że największe organizacje i najpotężniejsi liderzy komunikują się od środka na zewnątrz. Zaczynają od DLACZEGO — od sensu i misji — a dopiero potem wyjaśniają CO i JAK. Ludzie nie kupują tego, co robisz. Kupują, dlaczego to robisz.` },
          { type: "lumeo", text: `Komentarz Lumeo: W polskim biznesie dominuje komunikacja od zewnątrz: 'mamy taki produkt, w tej cenie, działa tak'. Mało kto mówi 'robimy to, bo wierzymy w...'. A właśnie ta różnica decyduje o tym, czy budujesz transakcje czy relacje.` },
        ],
      },
      {
        id: "kultura",
        title: "Kultura organizacyjna jako przewaga",
        content: [
          { type: "p", text: `Peter Drucker miał rację mówiąc, że kultura zjada strategię na śniadanie. Możesz mieć najlepszy plan, najlepszy produkt i najlepsze zasoby — jeśli kultura organizacyjna nie wspiera realizacji, nic z tego nie wyjdzie.` },
          { type: "p", text: `Kultura to nie plakaty na ścianie z wartościami firmy. Kultura to zbiór niepisanych zasad, które regulują, co jest tu nagradzane, a co karane. Co się mówi na korytarzu, a nie na zebraniu. Kto awansuje, a kto odpada.` },
          { type: "insight", text: `Test kultury: Zadaj pracownikom pytanie 'Jakie zachowanie naprawdę jest tu nagradzane?' — nie 'Jakie powinno być'. Różnica między odpowiedziami to dystans między kulturą deklarowaną a rzeczywistą.` },
          { type: "lumeo", text: `Komentarz Lumeo: Transformacja kulturowa to najdłuższy projekt w historii każdej firmy. Trwa latami i wymaga konsekwentnego działania na każdym szczeblu. Nie możesz mówić o otwartości i jednocześnie strzelać do posłańca złych wiadomości.` },
        ],
      },
      {
        id: "decyzje",
        title: "Podejmowanie decyzji w niepewności",
        content: [
          { type: "p", text: `Jeff Bezos wprowadził w Amazonie podział na decyzje dwóch typów. Decyzje Typu 1 to decyzje nieodwracalne — jak przejście przez jednokierunkową bramę. Wymagają głębokiej analizy i ostrożności. Decyzje Typu 2 to decyzje odwracalne — można wrócić. Te należy podejmować szybko, bez nadmiernej analizy.` },
          { type: "quote", text: `„Większość decyzji powinna być podejmowana przy 70% informacji, które chciałbyś mieć. Czekanie na 90% to w większości przypadków po prostu spóźnienie."` },
          { type: "p", text: `Paraliż analityczny — paralysis by analysis — to jeden z największych zabójców organizacyjnej produktywności. Zbieramy więcej danych, robimy kolejne badania, zlecamy kolejne analizy. Tymczasem rynek nie czeka, a okno okazji zamyka się.` },
          { type: "insight", text: `Framework: (1) Czy ta decyzja jest odwracalna? Jeśli tak — zdecyduj szybko. (2) Czy masz >70% potrzebnych informacji? Jeśli tak — działaj. (3) Jaki jest koszt czekania versus koszt błędu?` },
        ],
      },
      {
        id: "wnioski",
        title: "Praktyczne wnioski dla lidera",
        content: [
          { type: "p", text: `Najlepsi liderzy, których badacze obserwowali przez dekady, mają jedną wspólną cechę: ciągłą gotowość do uczenia się. Nie są nieomylni — popełniają błędy. Ale budują wokół siebie środowisko, w którym błędy są szybko wyłapywane i przekształcane w lekcje.` },
          { type: "quote", text: `„Twoja praca jako lidera polega nie na tym, żeby mieć wszystkie odpowiedzi, ale na tym, żeby zadawać właściwe pytania."` },
          { type: "insight", text: `Zapamiętaj: Zacznij od DLACZEGO. Buduj kulturę, nie tylko strategię. Rozróżniaj decyzje odwracalne i nieodwracalne. Twórz więcej liderów, nie więcej zwolenników.` },
        ],
      },
    ],
  },
};

function getAnalysis(bookId: number, category: string): Analysis {
  if (analysisById[bookId]) return analysisById[bookId];
  return analysisContent[category] ?? analysisContent["Produktywność"];
}

/* ── Reading components ─────────────────────────────── */
function ContentBlock({ block }: { block: { type: string; text: string } }) {
  if (block.type === "h3") {
    return <h3 className="text-base font-extrabold text-black mt-7 mb-3 pb-2 border-b border-gray-200">{block.text}</h3>;
  }
  if (block.type === "p") {
    return <p className="text-gray-700 leading-relaxed mb-4 text-[15px] text-justify">{block.text}</p>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="border-l-4 border-[#FFD400] bg-[#FFFCED] px-5 py-4 rounded-r-xl my-5">
        <p className="text-gray-800 font-medium italic leading-relaxed">{block.text}</p>
      </blockquote>
    );
  }
  if (block.type === "insight") {
    return (
      <div className="bg-black text-white rounded-xl px-5 py-4 my-5 flex gap-3">
        <span className="text-[#FFD400] shrink-0 mt-0.5">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6l-.7 2H9l-.7-2A7 7 0 0 1 5 9a7 7 0 0 1 7-7zm0 18a1 1 0 0 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </span>
        <p className="text-sm leading-relaxed text-gray-200">{block.text}</p>
      </div>
    );
  }
  if (block.type === "lumeo") {
    return (
      <div className="border border-[#FFD400]/60 bg-[#FFFCED] rounded-xl px-5 py-4 my-5 flex gap-3">
        <div className="shrink-0">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD400] text-black font-black text-[10px] mt-0.5">L</span>
        </div>
        <div>
          <p className="text-xs font-bold text-[#7a5f00] uppercase tracking-wider mb-1">Komentarz Lumeo</p>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">{block.text}</p>
        </div>
      </div>
    );
  }
  return null;
}

/* ── Page ───────────────────────────────────────────── */
export default function StreszczeniePage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = use(params);
  const book = allBooks.find(b => b.id === Number(id));
  if (!book) notFound();

  const { isInList, toggle } = useBookStatus();
  const finished = isInList(book.id, "finished");
  const liked = isInList(book.id, "favorites");

  const analysis = getAnalysis(book.id, book.category);
  const [activeSection, setActiveSection] = useState(analysis.sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  const currentIndex = analysis.sections.findIndex(s => s.id === activeSection);
  const prevSection = currentIndex > 0 ? analysis.sections[currentIndex - 1] : null;
  const nextSection = currentIndex < analysis.sections.length - 1 ? analysis.sections[currentIndex + 1] : null;
  const currentSection = analysis.sections[currentIndex];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Sticky reading header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            href={`/p/${book.id}/${book.slug}`}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Wróć
          </Link>
          <div className="w-px h-5 bg-gray-200 shrink-0" />
          <button
            onClick={() => setTocOpen(true)}
            className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Spis treści</span>
          </button>
          <div className="lg:hidden w-px h-5 bg-gray-200 shrink-0" />
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative w-6 h-8 shrink-0 hidden sm:block">
              <Image src={book.cover} alt={book.title} fill className="object-contain" />
            </div>
            <span className="text-sm font-bold text-black truncate">{book.title}</span>
            <span className="hidden sm:inline text-xs text-gray-400 truncate">— {book.author}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggle(book.id, "favorites")}
              title="Ulubione"
              className={`p-2 rounded-lg transition-all ${liked ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-400 hover:bg-red-50"}`}
            >
              <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={() => toggle(book.id, "finished")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-all ${
                finished
                  ? "bg-green-50 border-green-300 text-green-600"
                  : "border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {finished ? "Ukończona" : "Oznacz jako ukończoną"}
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-[#FFD400] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / analysis.sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* TOC Drawer */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setTocOpen(false)} />
          <div className="relative w-full sm:w-[420px] max-w-[90vw] bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            {/* Nagłówek drawera */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-extrabold text-xl text-black">Spis treści</h2>
              <button onClick={() => setTocOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Info o książce */}
            <div className="px-6 py-5 border-b border-gray-100 flex gap-4 items-center">
              <div className="relative w-14 h-[88px] shrink-0 bg-[#F0F0F0] rounded-lg overflow-hidden">
                <Image src={book.cover} alt={book.title} fill className="object-contain p-0.5" />
              </div>
              <div>
                <p className="font-bold text-base text-black leading-snug">{book.title}</p>
                <p className="text-sm text-gray-400 mt-1">{book.author}</p>
              </div>
            </div>
            {/* Postęp */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Postęp czytania</span>
                <span className="font-bold text-black">{Math.round(((currentIndex + 1) / analysis.sections.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#FFD400] rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / analysis.sections.length) * 100}%` }} />
              </div>
            </div>
            {/* Lista rozdziałów */}
            <div className="px-4 py-4 flex flex-col gap-1">
              {analysis.sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSection(s.id); setTocOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex items-start gap-3 w-full text-left px-4 py-4 rounded-xl transition-all ${
                    activeSection === s.id ? "bg-[#FFD400] text-black" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mt-0.5 ${
                    activeSection === s.id ? "bg-black text-[#FFD400]" : "bg-gray-100 text-gray-400"
                  }`}>{i + 1}</span>
                  <span className="text-[15px] font-medium leading-snug">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-5 items-start">

          {/* TOC icon — desktop only, sticky po lewej */}
          <div className="hidden lg:block sticky top-20 shrink-0">
            <button
              onClick={() => setTocOpen(true)}
              title="Spis treści"
              className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#FFD400] hover:border-[#FFD400] transition-colors shadow-sm group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Main reading area */}
          <main className="flex-1 min-w-0">
            {/* Intro card — only show on first section */}
            {currentIndex === 0 && (
              <div className="bg-[#FFD400] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black/60">Analiza Lumeo</span>
                </div>
                <h1 className="text-xl font-extrabold text-black mb-2">{book.title}</h1>
                <p className="text-sm text-black/70 leading-relaxed text-justify">{analysis.intro}</p>
                <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-black/60">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {book.readTime} min czytania
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    {analysis.sections.length} rozdziałów
                  </span>
                </div>
              </div>
            )}

            {/* Section content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#7a5f00] bg-[#FFFCED] px-2 py-0.5 rounded-full">
                  Rozdział {currentIndex + 1} z {analysis.sections.length}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-black leading-tight mb-6">{currentSection.title}</h2>
              <div>
                {currentSection.content.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5 gap-4">
              <div>
                {prevSection ? (
                  <button
                    onClick={() => setActiveSection(prevSection.id)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Poprzedni
                  </button>
                ) : <div />}
              </div>
              <div>
                {nextSection ? (
                  <button
                    onClick={() => { setActiveSection(nextSection.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="flex items-center gap-2 text-sm font-bold text-black bg-[#FFD400] hover:bg-black hover:text-white px-5 py-2.5 rounded-xl transition-all"
                  >
                    Dalej
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => toggle(book.id, "finished")}
                    className="flex items-center gap-2 text-sm font-bold bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {finished ? "Ukończona ✓" : "Oznacz jako ukończoną"}
                  </button>
                )}
              </div>
            </div>

            {/* Mobile TOC */}
            <div className="lg:hidden mt-6 bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rozdziały</p>
              <div className="flex flex-col gap-1">
                {analysis.sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveSection(s.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                      activeSection === s.id ? "bg-[#FFD400] text-black font-bold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                      activeSection === s.id ? "bg-black text-[#FFD400]" : "bg-gray-100 text-gray-400"
                    }`}>{i + 1}</span>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
