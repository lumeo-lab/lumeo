"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBooks } from "@/lib/data";
import { useBookStatus } from "@/context/BookStatusContext";

/* ── Per-book data ──────────────────────────────────── */
const bookData: Record<number, { summary: string; authorBio: string; authorFact: string }> = {
  1: {
    summary: `Napisana w 1936 roku klasyka Dale'a Carnegie'ego pozostaje jedną z najlepiej sprzedających się książek w historii. Carnegie pokazuje, że sukces w relacjach z ludźmi opiera się nie na manipulacji, lecz na szczerym zainteresowaniu innymi, uznaniu ich wartości i umiejętności słuchania. Książka zawiera konkretne zasady, które pomagają budować trwałe przyjaźnie, zjednywać sojuszników i przekonywać ludzi do swoich racji bez wzbudzania oporu.`,
    authorBio: `Dale Carnegie (1888–1955) był amerykańskim wykładowcą, pisarzem i twórcą kursów samodoskonalenia, komunikacji interpersonalnej oraz wystąpień publicznych.`,
    authorFact: `Carnegie urodził się w ubóstwie na farmie w Missouri. Jego kursy retoryki i relacji interpersonalnych ukończyły miliony ludzi na całym świecie — stworzone przez niego centrum szkoleniowe działa do dziś.`,
  },
  4: {
    summary: `James Clear przez lata badał naukę o nawykach i w tej książce przekłada ją na prosty, skuteczny system. Fundamentalna teza: nie chodzi o wyznaczanie ambitnych celów, lecz o budowanie systemów małych, codziennych działań — atomowych nawyków — które w długim czasie generują niewyobrażalne efekty. Clear opisuje czterostopniową pętlę nawyku (sygnał, pragnienie, działanie, nagroda) i pokazuje, jak ją świadomie projektować.`,
    authorBio: `James Clear jest pisarzem i mówcą specjalizującym się w nawykach, podejmowaniu decyzji i ciągłym doskonaleniu. Jego newsletter czyta ponad 2 miliony subskrybentów.`,
    authorFact: `W liceum Clear doznał poważnego urazu głowy podczas meczu baseballa, który niemal zakończył jego karierę sportową. Odbudowa sprawności przez systematyczne małe kroki stała się fundamentem filozofii opisanej w książce.`,
  },
  7: {
    summary: `Cal Newport, profesor informatyki na Georgetown University, stawia prowokacyjną tezę: umiejętność głębokiej koncentracji — pracy wolnej od rozpraszaczy — staje się jedną z najrzadszych i najcenniejszych kompetencji w XXI wieku. Książka opisuje, dlaczego płytka praca (e-maile, spotkania, social media) wypiera pracę głęboką, i dostarcza konkretnych strategii odbudowania przestrzeni na skupioną, twórczą pracę.`,
    authorBio: `Cal Newport jest profesorem informatyki na Georgetown University oraz autorem kilku bestsellerów o produktywności i pracy w erze cyfrowej.`,
    authorFact: `Newport przez większość swojej kariery naukowej nie korzystał z mediów społecznościowych — co czyni go wyjątkiem wśród akademików i jest żywym dowodem jego własnych tez.`,
  },
  10: {
    summary: `Shawn Achor, badacz pozytywnej psychologii z Harvardu, obala popularny mit: nie staniemy się szczęśliwi gdy osiągniemy sukces — to szczęście prowadzi do sukcesu. Jego badania na grupach studentów i pracowników korporacji pokazują, że pozytywne nastawienie zwiększa produktywność, kreatywność i odporność na stres. Książka dostarcza pięciu nawyków, które przeprogramowują mózg na pozytywne myślenie.`,
    authorBio: `Shawn Achor jest psychologiem, wykładowcą Harvardu i jednym z czołowych światowych ekspertów w dziedzinie pozytywnej psychologii oraz jej zastosowania w miejscu pracy.`,
    authorFact: `Achor spędził 12 lat na Harvardzie — najpierw jako student, potem jako wykładowca. Jego wykład TED o szczęściu obejrzało ponad 25 milionów ludzi.`,
  },
  11: {
    summary: `David Epstein, dziennikarz naukowy i były sportowiec, uderzą w mit wczesnej specjalizacji. Na podstawie badań i historii wybitnych osiągnięć w sporcie, nauce i biznesie dowodzi, że osoby, które przez długi czas eksperymentują z różnymi dziedzinami (tzw. generaliści), często w długim terminie osiągają więcej niż wąscy specjaliści. Książka to obrona szerokiego zakresu doświadczeń i późnego startu.`,
    authorBio: `David Epstein jest dziennikarzem naukowym i autorem bestsellerów. Wcześniej był reporterem Sports Illustrated i pracował jako badacz na Uniwersytecie Columbia.`,
    authorFact: `Epstein sam jest przykładem swojej tezy — przez lata trenował biegi średniodystansowe, studiował ekologię, a potem został czołowym dziennikarzem naukowym piszącym o sporcie i biologii.`,
  },
  12: {
    summary: `Charles Duhigg, dziennikarz New York Times, wyjaśnia neuronaukę stojącą za nawykami i pokazuje, jak firmy, organizacje i jednostki mogą je świadomie zmieniać. Kluczem jest tzw. pętla nawyku: sygnał wyzwala rutynę, po której następuje nagroda. Zrozumienie tej pętli pozwala zarówno budować dobre nawyki, jak i rozbrajać te destrukcyjne — na poziomie osobistym i organizacyjnym.`,
    authorBio: `Charles Duhigg jest dziennikarzem śledczym New York Times, laureatem Nagrody Pulitzera i autorem dwóch bestsellerów o produktywności i nawykach.`,
    authorFact: `Duhigg napisał „Siłę nawyku" częściowo dlatego, że sam zmagał się z nawykiem jedzenia ciastek w redakcji — śledztwo we własnym zachowaniu stało się punktem wyjścia do zgłębienia tematu.`,
  },
  13: {
    summary: `Daniel Kahneman, jedyny psycholog laureat Nagrody Nobla w dziedzinie ekonomii, i Olivier Sibony odkrywają zjawisko „szumu" — losowej zmienności w ludzkich osądach, o której rzadko się mówi. O ile „błąd" (bias) kieruje wszystkich w tę samą stronę, szum sprawia, że różni ludzie (i ten sam człowiek w różnych momentach) podejmują różne decyzje w identycznych sprawach. Badania dotyczą sądów, ubezpieczeń, medycyny i biznesu.`,
    authorBio: `Daniel Kahneman (1934–2024) był izraelsko-amerykańskim psychologiem i ekonomistą behawioralnym, profesorem Uniwersytetu Princeton i laureatem Nagrody Nobla z ekonomii w 2002 roku.`,
    authorFact: `Kahneman przeżył II wojnę światową jako żydowskie dziecko ukrywające się we Francji. To doświadczenie ucieczki i obserwowania ludzkich zachowań w ekstremalnych warunkach ukształtowało jego zainteresowanie psychologią decyzji.`,
  },
  14: {
    summary: `Artur Racicki, jeden z najbardziej rozpoznawalnych polskich seryjnych przedsiębiorców, opowiada bez owijania w bawełnę o kulisach budowania i sprzedawania firm. To nie jest kolejna książka o sukcesie — to szczera spowiedź pełna błędów, strat i nauki przez porażki. Racicki opisuje, jak uzależnienie od adrenaliny biznesu wpłynęło na jego życie prywatne i jak znalazł równowagę.`,
    authorBio: `Artur Racicki jest polskim seryjnym przedsiębiorcą, który założył, rozwinął i sprzedał kilkanaście firm w różnych branżach. Dziś jest inwestorem i mentorem.`,
    authorFact: `Racicki zaczął od sprzedaży na bazarze jako nastolatek. Jego pierwsza firma powstała bez żadnego zewnętrznego finansowania — wyłącznie z oszczędności z wakacyjnych prac.`,
  },
  15: {
    summary: `Matthew Syed, olimpijski tenisista stołowy i dziennikarz, analizuje, dlaczego organizacje uczące się na błędach odnoszą sukces, podczas gdy te ukrywające błędy skazują się na katastrofę. Na przykładach lotnictwa, medycyny i sportu pokazuje, że kultura otwartości na porażkę i systematycznej analizy błędów jest silniejszą przewagą konkurencyjną niż talent czy technologia.`,
    authorBio: `Matthew Syed jest byłym brytyjskim mistrzem w tenisie stołowym, dziennikarzem The Times i autorem bestsellerów o wysokiej wydajności, edukacji i organizacjach uczących się.`,
    authorFact: `Syed przez wiele lat nie rozumiał, skąd pochodzi jego talent — dopóki nie odkrył, że niemal wszyscy najlepsi gracze w jego pokoleniu dorastali przy jedynym stole pingpongowym w okolicy, dostępnym całą dobę.`,
  },
  16: {
    summary: `Nassim Taleb, inwestor i filozof ryzyka, wprowadza pojęcie „antykruchości" — właściwości systemów, które nie tylko są odporne na chaos i niepewność, ale wręcz się na nim wzmacniają. W przeciwieństwie do czegoś kruchego (które łamie się pod wpływem stresu) lub odpornego (które pozostaje bez zmian), system antykruchy rośnie i zyskuje na zaburzeniach. Taleb zastosowuje tę koncepcję do ekonomii, biologii, polityki i codziennych decyzji.`,
    authorBio: `Nassim Nicholas Taleb jest libańsko-amerykańskim eseistą, statystykiem i inwestorem. Przez lata pracował jako trader opcji na giełdach nowojorskich.`,
    authorFact: `Taleb spędził lata 80. i 90. jako trader na Wall Street, co dało mu wyjątkową perspektywę na ryzyko i niepewność. Jego majątek zbudował głównie na asymetrycznych zakładach — dużych zyskach z mało prawdopodobnych wydarzeń.`,
  },
  17: {
    summary: `Kelly McGonigal, psycholożka z Uniwersytetu Stanforda, demistyfikuje silną wolę: to nie cecha charakteru ani wrodzony talent, lecz umiejętność, którą można ćwiczyć jak mięsień. Opierając się na najnowszych badaniach neuronaukowych, pokazuje trzy składowe siły woli (powiem tak, powiem nie, naprawdę chcę) i dostarcza zestawu ćwiczeń do wzmacniania każdej z nich.`,
    authorBio: `Kelly McGonigal jest psycholożką zdrowia i wykładowczynią na Uniwersytecie Stanforda. Specjalizuje się w psychologii silnej woli, stresu i zmiany zachowań.`,
    authorFact: `McGonigal przez lata uczyła, że stres jest szkodliwy — dopóki jej własne badania pokazały, że to przekonanie zabija. To doświadczenie zmieniło jej podejście do nauki i stało się tematem jednego z najpopularniejszych wykładów TED wszech czasów.`,
  },
  18: {
    summary: `Brian Tracy, legenda w dziedzinie efektywności osobistej, przedstawia w tej krótkiej, zwięzłej książce jeden fundamentalny princip produktywności: zacznij dzień od najtrudniejszego, najbardziej wartościowego zadania — od „zjedzenia żaby". Jeśli to zrobisz, reszta dnia będzie z górki. Tracy dostarcza 21 technik eliminowania zwlekania i skupiania energii na tym, co naprawdę ważne.`,
    authorBio: `Brian Tracy jest kanadyjsko-amerykańskim mówcą motywacyjnym, autorem ponad 80 książek o efektywności, sprzedaży i przywództwie. Prowadzi szkolenia dla milionów ludzi na całym świecie.`,
    authorFact: `Tracy dorastał w ubóstwie, rzucił szkołę w wieku 16 lat i przez kilka lat pracował jako robotnik. Samodzielnie nauczył się sprzedaży, a potem zarządzania — wyłącznie przez czytanie i obserwowanie.`,
  },
  19: {
    summary: `Gary Keller, założyciel Keller Williams Realty — jednej z największych sieci nieruchomości świata — dzieli się prostą, ale rewolucyjną obserwacją: sukces nie pochodzi z robienia wielu rzeczy, lecz z identyfikacji i konsekwentnego wykonywania jednej jedynej, najważniejszej rzeczy. Książka burzy mit wielozadaniowości i uczy skupienia na tym, co naprawdę przesuwa igłę.`,
    authorBio: `Gary Keller jest współzałożycielem Keller Williams Realty i autorem kilku bestsellerów o nieruchomościach i osiąganiu celów.`,
    authorFact: `Keller Williams Realty zaczęła jako jedna mała agencja w Austin w Teksasie. Dziś jest jedną z największych firm pośrednictwa nieruchomości na świecie — wyrosła w dużej mierze dzięki filozofii opisanej w tej książce.`,
  },
  20: {
    summary: `Mel Robbins, była adwokat i dziś jedna z najpopularniejszych mówczyni na świecie, opisuje prostą technikę, którą odkryła przypadkiem w chwili życiowego kryzysu: liczenie 5-4-3-2-1 i natychmiastowe działanie. Ta reguła omija mechanizm prokrastynacji w mózgu i pozwala podjąć działanie nawet wtedy, gdy brakuje motywacji. Robbins opisuje neuronaukę stojącą za tą techniką i dziesiątki jej zastosowań.`,
    authorBio: `Mel Robbins jest amerykańską mówczynią, autorką, byłą adwokatem i gospodynią programów telewizyjnych. Jej wykłady TEDx należą do najchętniej oglądanych w historii platformy.`,
    authorFact: `Robbins wymyśliła Regułę 5 Sekund w chwili, gdy nie mogła wstać z łóżka rano — tonęła w długach i kryzysie zawodowym. Prostota techniki, która zmieniła jej życie, stała się fundamentem jej imperium medialnego.`,
  },
  21: {
    summary: `W drugiej książce Charles Duhigg zagłębia się w pytanie: co sprawia, że niektórzy ludzie, drużyny i firmy są wyjątkowo produktywni, podczas gdy inni pracują równie ciężko, lecz osiągają mierniejsze rezultaty? Odpowiedź tkwi nie w ciężkiej pracy, lecz w psychologii — w tym, jak kierujemy uwagą, budujemy zespoły i podejmujemy decyzje.`,
    authorBio: `Charles Duhigg jest dziennikarzem śledczym New York Times, laureatem Nagrody Pulitzera i autorem bestsellerów o produktywności i nawykach.`,
    authorFact: `Podczas pisania tej książki Duhigg przeprowadził wywiady z setkami naukowców, trenerów sportowych i dyrektorów generalnych. Odkrył, że najproduktywniejsze firmy łączy jedna cecha: psychologiczne bezpieczeństwo w zespołach.`,
  },
  22: {
    summary: `Stephen Covey przez lata badał literaturę o sukcesie i odkrył fundamentalną zmianę, która nastąpiła w XX wieku: od etyki charakteru (uczciwości, odwagi, skromności) do etyki osobowości (technik wpływu i wizerunku). W odpowiedzi stworzył siedem nawyków opartych na niezmiennych zasadach, które prowadzą do prawdziwej, trwałej efektywności — w pracy i w życiu prywatnym.`,
    authorBio: `Stephen R. Covey (1932–2012) był amerykańskim edukatorem, pisarzem i konsultantem biznesowym. Jego książka sprzedała się w ponad 40 milionach egzemplarzy.`,
    authorFact: `Covey pisał doktorat na Brigham Young University, kiedy natknął się na zdanie, które zmieniło jego życie: „Pomiędzy bodźcem a reakcją jest przestrzeń. W tej przestrzeni leży nasza wolność." To zdanie stało się osią wszystkich jego późniejszych prac.`,
  },
  23: {
    summary: `Carol Dweck, psycholożka z Uniwersytetu Stanforda, odkryła po dekadach badań dwa fundamentalne sposoby myślenia o sobie: nastawienie na trwałość (fixed mindset) i nastawienie na rozwój (growth mindset). Osoby z growth mindset wierzą, że ich zdolności można rozwijać wysiłkiem i uczeniem się — i właśnie dlatego osiągają więcej. Książka pokazuje, jak zmienić własne nastawienie i wspierać je u innych.`,
    authorBio: `Carol S. Dweck jest profesorką psychologii na Uniwersytecie Stanforda. Jej badania nad motywacją i rozwojem intelektualnym należą do najczęściej cytowanych w psychologii.`,
    authorFact: `Dweck przez lata badała, dlaczego niektóre dzieci w obliczu porażki się poddają, a inne stają się bardziej zdeterminowane. Odkrycie, że decydującą rolę gra przekonanie o własnym potencjale — nie sam potencjał — stało się przełomem w psychologii edukacji.`,
  },
  24: {
    summary: `Robert Cialdini, profesor psychologii i marketingu, przez lata badał techniki wywierania wpływu — pracując pod przykrywką jako sprzedawca, fundraiser i rekruter. Zidentyfikował sześć niezmiennych zasad wpływu zakorzenione w ludzkiej psychologii: wzajemność, zaangażowanie i konsekwencja, społeczny dowód słuszności, lubienie, autorytet i niedobór. Ta książka to zarówno podręcznik obrony, jak i kompendium perswazji.`,
    authorBio: `Robert B. Cialdini jest profesorem psychologii i marketingu na Uniwersytecie Stanforda oraz Arizona State University. Uważany jest za czołowego światowego eksperta w dziedzinie wywierania wpływu.`,
    authorFact: `Cialdini przez trzy lata pracował pod przykrywką w różnych branżach opartych na perswazji, żeby zebrać materiały do tej książki. Mówi, że sam był podatny na techniki wpływu — dlatego zaczął je badać.`,
  },
  25: {
    summary: `Napoleon Hill przez 20 lat badał ludzi sukcesu na zlecenie Andrew Carnegiego i skondensował swoje obserwacje w 13 zasad myślenia nastawionego na bogactwo. Choć książka pochodzi z 1937 roku, jej fundamentalne przesłanie pozostaje aktualne: bogactwo zaczyna się od konkretnego, obsesyjnego pragnienia i wiary w jego realizację, poparte systematycznym działaniem.`,
    authorBio: `Napoleon Hill (1883–1970) był amerykańskim pisarzem i filozofem sukcesu. Jego kontakty z Andrewem Carnegiem i innymi magnatami przełomu XIX i XX wieku dały mu wyjątkową perspektywę na korzenie sukcesu.`,
    authorFact: `Hill spędził 20 lat na badaniach, zanim opublikował swoje wnioski. Przeprowadził setki wywiadów z najbogatszymi ludźmi Ameryki, w tym Henrym Fordem, Thomasem Edisonem i Woodrowem Wilsonem.`,
  },
  26: {
    summary: `Robert Kiyosaki opisuje dwie filozofie finansowe, których nauczył go jego biologiczny ojciec (wykształcony, ale zawsze biedny) i ojciec kolegi (przedsiębiorca bez wykształcenia, ale bogaty). Fundamentalna różnica: bogaci nie pracują dla pieniędzy — pieniądze pracują dla nich. Książka tłumaczy różnicę między aktywami a pasywami i pokazuje, dlaczego szkolny system edukacji nie uczy o pieniądzach.`,
    authorBio: `Robert T. Kiyosaki jest amerykańskim przedsiębiorcą, inwestorem i autorem. Jego firma inwestuje w nieruchomości, akcje i małe firmy.`,
    authorFact: `Kiyosaki walczył w Wietnamie jako pilot Marines, zanim rozpoczął karierę biznesową. Jego pierwsza firma — sprzedająca portfele z nylonu — zbankrutowała. Bogaty ojciec, biedny ojciec był początkowo samodzielnie wydawany i odrzucony przez wszystkich dużych wydawców.`,
  },
  27: {
    summary: `Greg McKeown, konsultant i mówca pracujący z Apple, Google i Twitter, stawia prowokacyjne pytanie: co gdybyś zamiast starać się zmieścić więcej rzeczy w swoim życiu, skupił się na tym, żeby robić mniej, ale lepiej? Esencjalista to filozofia i praktyczny system, który uczy rozróżniać to, co ważne, od tego, co po prostu pilne — i koncentrować zasoby na tym, co naprawdę ma znaczenie.`,
    authorBio: `Greg McKeown jest autorem, mówcą i konsultantem. Jego klientami są m.in. Apple, Google, Facebook i Twitter. Pochodzi z Anglii, studiował na Harvardzie.`,
    authorFact: `McKeown napisał Esencjalistę po tym, jak odmówił uczestnictwa w ważnym spotkaniu tuż po narodzinach córki — a potem poczuł, że i tak zawiódł żonę i klienta jednocześnie. To doświadczenie braku priorytetu stało się impulsem do napisania książki.`,
  },
  28: {
    summary: `Marshall Rosenberg, mediator i psycholog, stworzył język komunikacji oparty na czterech krokach: obserwacja (bez oceniania), uczucie, potrzeba i prośba. Porozumienie bez Przemocy (NVC) to nie tylko technika komunikacji — to filozofia zakładająca, że wszystkie ludzkie konflikty wynikają z niezaspokojonych potrzeb, a każde zachowanie, nawet agresywne, jest próbą zaspokojenia tych potrzeb.`,
    authorBio: `Marshall B. Rosenberg (1934–2015) był amerykańskim psychologiem, mediatorem i założycielem Centrum Porozumienia bez Przemocy. Pracował w strefach konfliktów na całym świecie.`,
    authorFact: `Rosenberg dorastał w Detroit w okresie zamieszek rasowych lat 40. Doświadczenie przemocy w dzieciństwie sprawiło, że całe życie poświęcił poszukiwaniu języka, który łączy zamiast dzielić.`,
  },
  29: {
    summary: `Héctor García i Francesc Miralles wyruszyli na japońską Okinawę, gdzie żyje więcej stulatków niż gdziekolwiek indziej na świecie, żeby odkryć ich sekret. Odpowiedź okazała się nie leżeć w diecie ani genetyce, lecz w ikigai — japońskim pojęciu oznaczającym powód wstawania rano, sens i cel życia. Książka łączy filozofię japońską z zachodnią psychologią pozytywną.`,
    authorBio: `Héctor García jest Hiszpanem mieszkającym w Japonii od 2004 roku, autorem i blogerem piszącym o kulturze japońskiej. Francesc Miralles jest katalonijskim pisarzem i dziennikarzem.`,
    authorFact: `García i Miralles pojechali na Okinawę bez z góry ustalonej tezy — wyłącznie z ciekawością. Rozmowy ze stulatkami, którzy nadal pracowali w ogrodach i grali na instrumentach, zaskoczyły ich bardziej niż jakiekolwiek dane naukowe.`,
  },
  30: {
    summary: `Matthew Walker, neurobiolog i dyrektor laboratorium snu na Uniwersytecie Kalifornijskim, przedstawia kompleksowy przegląd dwóch dekad badań nad snem. Wniosek jest alarmujący: śpimy za mało, nie zdajemy sobie sprawy z konsekwencji niedoboru snu, a przemysł kawy i kultura harówki aktywnie temu sprzyjają. Sen to nie luksus — to biologiczna konieczność warunkująca zdrowie, inteligencję i długość życia.`,
    authorBio: `Matthew Walker jest profesorem neurobiologii i psychologii na Uniwersytecie Kalifornijskim w Berkeley oraz dyrektorem Center for Human Sleep Science.`,
    authorFact: `Walker przestał używać budzika po tym, jak odkrył, że przerywanie snu w naturalnym rytmie jest jedną z najgorszych rzeczy, jakie można zrobić swojemu mózgowi. Dziś dostosowuje wszystkie obowiązki do naturalnego rytmu dobowego.`,
  },
  31: {
    summary: `Simon Sinek, obserwując firmy Apple, Southwest Airlines i liderów pokroju Martina Luthera Kinga, odkrył wzorzec, który odróżnia inspirujące organizacje od reszty: komunikują się od środka na zewnątrz, zaczynając od DLACZEGO — od celu i przekonania — zamiast od CO i JAK. Ta prosta zmiana w komunikacji zmienia wszystko: od sprzedaży po rekrutację i lojalność klientów.`,
    authorBio: `Simon Sinek jest brytyjsko-amerykańskim mówcą motywacyjnym, autorem i konsultantem organizacyjnym. Jego wykład TED o Golden Circle jest jednym z trzech najchętniej oglądanych w historii platformy.`,
    authorFact: `Sinek wpadł na koncepcję Golden Circle w chwili głębokiego wypalenia zawodowego — kiedy nie wiedział, dlaczego sam robi to, co robi. Szukanie własnego DLACZEGO stało się jednocześnie odkryciem teorii, która przyniosła mu sławę.`,
  },
  32: {
    summary: `Daniel Pink, badacz nauk behawioralnych i autor bestsellerów, obala mit, że premia finansowa jest najlepszym motywatorem. Na podstawie dziesiątek eksperymentów pokazuje, że dla zadań wymagających kreatywności i myślenia zewnętrzne nagrody finansowe często obniżają jakość pracy. Prawdziwą motywację — szczególnie w erze wiedzy — napędzają trzy czynniki: autonomia, mistrzostwo i cel.`,
    authorBio: `Daniel H. Pink jest autorem sześciu bestsellerów New York Times o pracy, biznesie i zachowaniu. Wcześniej pracował jako autor przemówień dla wiceprezydenta Al Gore'a.`,
    authorFact: `Pink odszedł z prestiżowej posady w Białym Domu, żeby zostać freelancerem — i odkrył, że motywacja zewnętrzna (prestiż, bezpieczeństwo, wynagrodzenie) była gorsza niż autonomia i własne projekty. To doświadczenie stało się materiałem badawczym dla tej książki.`,
  },
  33: {
    summary: `Jason Fried i David Heinemeier Hansson, twórcy Basecamp i frameworka Ruby on Rails, rozwalają w tej książce niemal każdy mit o tym, jak powinna działać firma. Nie potrzebujesz inwestorów, biura, długich planów ani wieloletnich roadmap. Potrzebujesz skupić się na robieniu mniej, ale dobrze — i zacząć sprzedawać wcześniej, niż ci się wydaje, że produkt jest gotowy.`,
    authorBio: `Jason Fried jest współzałożycielem i CEO Basecamp (dawniej 37signals). David Heinemeier Hansson jest duńskim programistą, twórcą Ruby on Rails i wspólnikiem w Basecamp.`,
    authorFact: `Basecamp przez lata celowo odmawiał przyjęcia zewnętrznego finansowania od inwestorów — w tym od firm venture capital oferujących miliony. Ta decyzja stała się fundamentem filozofii opisanej w książce.`,
  },
};

/* ── Per-category fallback data ─────────────────────── */
const categoryContent: Record<string, { learns: string[]; forWho: string }> = {
  "Produktywność": {
    learns: ["Jak projektować środowisko wspierające pożądane zachowania", "Dlaczego małe zmiany przynoszą większe efekty niż radykalne postanowienia", "Jak identyfikować i eliminować złe nawyki u źródła", "Techniki głębokiej koncentracji w świecie rozpraszaczy", "Jak mierzyć postęp w sposób motywujący"],
    forWho: "Dla osób, które chcą więcej osiągnąć w krótszym czasie — menedżerów, freelancerów, studentów i każdego, kto czuje, że doba jest za krótka.",
  },
  "Psychologia": {
    learns: ["Jak działają nieświadome mechanizmy wpływające na decyzje", "Dlaczego większość ludzi jest przewidywalnie irracjonalna", "Techniki budowania odporności psychicznej", "Jak rozumieć motywacje innych i skuteczniej komunikować", "Pułapki myślowe, które wszyscy popełniamy"],
    forWho: "Dla każdego, kto chce lepiej rozumieć siebie i innych — liderów, rodziców, sprzedawców, coachów i psychologów.",
  },
  "Biznes i przywództwo": {
    learns: ["Jak budować kulturę organizacyjną przyciągającą talenty", "Kluczowe cechy skutecznych liderów", "Strategie podejmowania decyzji w niepewności", "Jak komunikować wizję angażującą zespół", "Budowanie długoterminowej przewagi konkurencyjnej"],
    forWho: "Dla menedżerów, dyrektorów, przedsiębiorców i wszystkich zarządzających ludźmi lub budujących własną firmę.",
  },
  "Rozwój osobisty": {
    learns: ["Jak definiować sukces na własnych warunkach", "Metody budowania trwałej samooceny", "Jak wychodzić ze strefy komfortu w sposób mądry", "Techniki radzenia sobie z porażką", "Jak tworzyć życie zgodne z wartościami"],
    forWho: "Dla osób w każdym etapie życia, które chcą żyć bardziej świadomie.",
  },
  "Finanse": {
    learns: ["Jak zmienić relację z pieniędzmi", "Fundamenty budowania majątku niezależnie od dochodów", "Jak inwestować bez konieczności zostania ekspertem", "Psychologia finansowa — dlaczego robimy złe decyzje", "Strategie wolności finansowej"],
    forWho: "Dla każdego, kto chce mieć zdrowe finanse — niezależnie od poziomu zarobków.",
  },
  "Komunikacja i relacje": {
    learns: ["Techniki aktywnego słuchania", "Jak rozwiązywać konflikty bez ofiar", "Sztuka konstruktywnej informacji zwrotnej", "Jak budować głębokie zaufanie", "Komunikacja w trudnych sytuacjach emocjonalnych"],
    forWho: "Dla wszystkich, którzy chcą budować lepsze relacje — partnerów, rodziców, menedżerów i negocjatorów.",
  },
  "Przedsiębiorczość": {
    learns: ["Jak walidować pomysł biznesowy przed wydaniem złotówki", "Zasady budowania MVP i iteracji", "Jak zarządzać wzrostem firmy", "Błędy, które popełnia większość startupów", "Strategie finansowania i skalowania"],
    forWho: "Dla startupowców, solopreneurów i każdego, kto rozważa założenie firmy.",
  },
  "Zdrowie": {
    learns: ["Fundamenty zdrowia mające największy wpływ na jakość życia", "Jak sen, ruch i odżywianie współdziałają", "Strategie budowania zdrowych nawyków", "Jak chronić zdrowie psychiczne w świecie stresu", "Odkrycia nauki o zdrowiu z ostatniej dekady"],
    forWho: "Dla każdego, kto chce żyć dłużej i z większą energią.",
  },
};

/* ── Page ───────────────────────────────────────────── */
export default function BookPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { id } = use(params);
  const book = allBooks.find(b => b.id === Number(id));
  if (!book) notFound();

  const { isInList, toggle } = useBookStatus();
  const liked    = isInList(book.id, "favorites");
  const reading  = isInList(book.id, "reading");
  const finished = isInList(book.id, "finished");

  const data    = bookData[book.id];
  const catData = categoryContent[book.category] ?? categoryContent["Produktywność"];
  const related = allBooks.filter(b => b.category === book.category && b.id !== book.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">

      {/* Breadcrumb */}
      <div className="bg-[#FFD400] border-b border-[#e6bf00] px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-black/60 flex-wrap">
            <Link href="/" className="hover:text-black transition-colors">Strona główna</Link>
            <svg className="w-3.5 h-3.5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/ksiazki" className="hover:text-black transition-colors">Książki</Link>
            <svg className="w-3.5 h-3.5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold truncate max-w-[200px]">{book.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Hero card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-8">

            {/* Cover + actions */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="relative bg-[#F0F0F0] rounded-xl overflow-hidden flex items-center justify-center p-4"
                style={{ width: "180px", height: "240px" }}>
                <Image src={book.cover} alt={book.title} fill className="object-contain p-3 drop-shadow-lg" />
                {book.isFree && (
                  <div className="absolute top-2 left-2 bg-[#FFD400] text-black text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider">
                    BEZPŁATNA
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {[
                  { list: "favorites" as const, active: liked,    activeClass: "bg-red-50 border-red-300 text-red-500",         inactiveClass: "hover:border-red-300 hover:text-red-400",          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />, fill: liked },
                  { list: "reading"   as const, active: reading,  activeClass: "bg-[#FFFCED] border-[#FFD400] text-[#7a5f00]",  inactiveClass: "hover:border-[#FFD400] hover:text-[#7a5f00]",      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />, fill: false },
                  { list: "finished"  as const, active: finished, activeClass: "bg-green-50 border-green-300 text-green-600",   inactiveClass: "hover:border-green-300 hover:text-green-500",      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />, fill: false },
                ].map(({ list, active, activeClass, inactiveClass, icon, fill }) => (
                  <button key={list} onClick={() => toggle(book.id, list)}
                    className={`flex items-center justify-center w-9 h-9 rounded-xl border-2 transition-all ${active ? activeClass : `border-gray-200 text-gray-400 ${inactiveClass}`}`}>
                    <svg className="w-4 h-4" fill={fill && active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{icon}</svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FFD400] bg-[#FFFCED] px-2.5 py-1 rounded-md mb-3">
                {book.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight mb-2">{book.title}</h1>
              <p className="text-base text-gray-500 mb-5">Autor: <span className="font-semibold text-gray-700">{book.author}</span></p>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-5 h-5 ${book.rating >= s ? "fill-[#C32523]" : "fill-gray-200"}`} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-black">{book.rating.toFixed(2)}</span>
                {book.reviewCount && <span className="text-sm text-gray-400">({book.reviewCount} głosów)</span>}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {book.readTime} min czytania
                </span>
                {book.hasAudio && (
                  <span className="flex items-center gap-1.5 text-sm bg-black text-[#FFD400] px-3 py-1.5 rounded-lg font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-9 9v7a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4.07A8.003 8.003 0 0 1 12 5a8.003 8.003 0 0 1 7.93 7H18a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-7a9 9 0 0 0-9-9z"/></svg>
                    Wersja audio
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Wersja PDF
                </span>
                <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Infografika
                </span>
              </div>

              {book.isFree ? (
                <Link href={`/streszczenie/${book.id}/${book.slug}`}
                  className="inline-flex items-center gap-2 bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold px-6 py-3 rounded-xl transition-all text-sm">
                  Poznaj kluczowe idee
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/cennik"
                    className="inline-flex items-center justify-center gap-2 bg-[#FFD400] hover:bg-black hover:text-white text-black font-bold px-6 py-3 rounded-xl transition-all text-sm">
                    Odblokuj analizę
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </Link>
                  <p className="text-xs text-gray-400 self-center">Dostępna w planie miesięcznym i rocznym</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="flex flex-col gap-6">

            {/* Streszczenie książki */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="font-extrabold text-black text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#FFD400] rounded-full inline-block"></span>
                Streszczenie książki
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {data?.summary ?? "Analiza dostarcza kluczowych idei i praktycznych wniosków z tej książki, starannie opracowanych przez zespół ekspertów Lumeo."}
              </p>
            </div>

            {/* Czego się nauczysz */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="font-extrabold text-black text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#FFD400] rounded-full inline-block"></span>
                Czego się nauczysz
              </h2>
              <ul className="flex flex-col gap-3">
                {catData.learns.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FFD400] text-black shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dla kogo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="font-extrabold text-black text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#FFD400] rounded-full inline-block"></span>
                Dla kogo?
              </h2>
              <p className="text-gray-600 leading-relaxed">{catData.forWho}</p>
            </div>

            {/* O autorze */}
            {data && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                <h2 className="font-extrabold text-black text-lg mb-5 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#FFD400] rounded-full inline-block"></span>
                  O autorze
                </h2>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFCED] border border-[#FFD400]/30 flex items-center justify-center shrink-0 text-lg font-black text-[#7a5f00]">
                    {book.author.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-black mb-1">{book.author}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{data.authorBio}</p>
                    <div className="bg-[#F6F6F6] rounded-xl p-3">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        <span className="font-bold text-black">Ciekawostka: </span>
                        {data.authorFact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Co zawiera analiza</p>
              {[
                { icon: "📄", label: "Analiza PDF",        desc: "Pełny tekst do czytania" },
                ...(book.hasAudio ? [{ icon: "🎧", label: "Wersja audio", desc: "Do słuchania w ruchu" }] : []),
                { icon: "🗺️", label: "Infografika",        desc: "Wizualne podsumowanie" },
                { icon: "✅", label: "Zadania praktyczne", desc: "3 ćwiczenia do wdrożenia" },
                { icon: "💬", label: "Komentarz eksperta", desc: "Autorska perspektywa Lumeo" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-black leading-none mb-0.5">{f.label}</p>
                    <p className="text-xs text-gray-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {!book.isFree && (
              <div className="bg-black rounded-2xl p-5 text-center">
                <p className="text-white font-extrabold text-base mb-1">Odblokuj wszystkie analizy</p>
                <p className="text-gray-400 text-xs mb-4">Od 32 zł/miesiąc · Anuluj kiedy chcesz</p>
                <Link href="/cennik"
                  className="block w-full bg-[#FFD400] hover:bg-yellow-300 text-black font-bold py-2.5 rounded-xl text-sm transition-colors">
                  Wybierz plan
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Podobne analizy */}
        {related.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-black text-xl">Podobne analizy</h2>
              <Link href="/ksiazki" className="text-sm font-semibold text-gray-400 hover:text-black transition-colors">
                Zobacz wszystkie →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {related.map(b => (
                <Link key={b.id} href={`/p/${b.id}/${b.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#FFD400] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Cover */}
                  <div className="relative bg-[#F0F0F0] flex items-center justify-center p-3" style={{ height: "160px" }}>
                    <div className="relative h-full w-auto" style={{ aspectRatio: "3/4", maxHeight: "100%" }}>
                      <Image src={b.cover} alt={b.title} fill className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    {b.isFree && (
                      <div className="absolute top-2 left-2 bg-[#FFD400] text-black text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider">
                        BEZPŁATNA
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col flex-1 px-3 py-3 gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 truncate">{b.category}</span>
                    <p className="font-bold text-[13px] text-black leading-snug line-clamp-2 group-hover:text-[#7a5f00] transition-colors">{b.title}</p>
                    <p className="text-[11px] text-gray-400 truncate">{b.author}</p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3 h-3 ${b.rating >= s ? "fill-[#C32523]" : "fill-gray-200"}`} viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-[11px] font-semibold text-gray-600 ml-0.5">{b.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{b.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
