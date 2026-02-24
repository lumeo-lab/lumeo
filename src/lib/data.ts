export const categories = [
  { id: 1, name: "Rozwój osobisty", slug: "rozwoj-osobisty", icon: "🌱", count: 38 },
  { id: 2, name: "Produktywność", slug: "produktywnosc", icon: "⚡", count: 27 },
  { id: 3, name: "Komunikacja i relacje", slug: "komunikacja", icon: "💬", count: 21 },
  { id: 4, name: "Finanse", slug: "finanse", icon: "💰", count: 19 },
  { id: 5, name: "Przedsiębiorczość", slug: "przedsiebiorczosc", icon: "🚀", count: 24 },
  { id: 6, name: "Psychologia", slug: "psychologia", icon: "🧠", count: 22 },
  { id: 7, name: "Biznes i przywództwo", slug: "biznes", icon: "📊", count: 18 },
  { id: 8, name: "Zdrowie", slug: "zdrowie", icon: "💪", count: 14 },
];

export const freeBooks = [
  {
    id: 1,
    title: "Jak zdobyć przyjaciół i zjednać sobie ludzi",
    author: "Dale Carnegie",
    rating: 4.70,
    reviewCount: 124,
    readTime: 37,
    category: "Komunikacja i relacje",
    hasAudio: true,
    slug: "jak-zdobyc-przyjaciol",
    cover: "/covers/1.png",
  },
  {
    id: 4,
    title: "Atomowe nawyki",
    author: "James Clear",
    rating: 4.82,
    reviewCount: 69,
    readTime: 31,
    category: "Produktywność",
    hasAudio: true,
    slug: "atomowe-nawyki",
    cover: "/covers/3.png",
  },
  {
    id: 7,
    title: "Praca Głęboka",
    author: "Cal Newport",
    rating: 4.44,
    reviewCount: 53,
    readTime: 31,
    category: "Produktywność",
    hasAudio: true,
    slug: "praca-gleboka",
    cover: "/covers/2.png",
  },
];

export const recentBooks = [
  { id: 10, title: "Przewaga szczęścia", author: "Shawn Achor", rating: 4.40, reviewCount: 47, readTime: 31, category: "Rozwój osobisty", hasAudio: true, slug: "przewaga-szczescia", cover: "/covers/20.png" },
  { id: 11, title: "Sięgaj jak najdalej", author: "David Epstein", rating: 4.70, reviewCount: 89, readTime: 34, category: "Rozwój osobisty", hasAudio: true, slug: "siegaj-jak-najdalej", cover: "/covers/24.png" },
  { id: 12, title: "Siła nawyku", author: "Charles Duhigg", rating: 4.60, reviewCount: 156, readTime: 38, category: "Produktywność", hasAudio: true, slug: "sila-nawyku", cover: "/covers/6.png" },
  { id: 13, title: "Szum", author: "Daniel Kahneman", rating: 4.50, reviewCount: 38, readTime: 43, category: "Psychologia", hasAudio: true, slug: "szum", cover: "/covers/40.png" },
  { id: 14, title: "Spowiedź nałogowego przedsiębiorcy", author: "Artur Racicki", rating: 4.60, reviewCount: 22, readTime: 46, category: "Przedsiębiorczość", hasAudio: false, slug: "spowiedz-nalogowego", cover: "/covers/44.png" },
  { id: 15, title: "Czarna skrzynka myślenia", author: "Matthew Syed", rating: 4.30, reviewCount: 61, readTime: 35, category: "Biznes i przywództwo", hasAudio: true, slug: "czarna-skrzynka", cover: "/covers/46.png" },
  { id: 16, title: "Antykruchość", author: "Nassim Taleb", rating: 4.50, reviewCount: 44, readTime: 48, category: "Finanse", hasAudio: false, slug: "antykrychosc", cover: "/covers/52.png" },
  { id: 17, title: "Potęga woli", author: "Kelly McGonigal", rating: 4.70, reviewCount: 93, readTime: 36, category: "Psychologia", hasAudio: true, slug: "potega-woli", cover: "/covers/48.png" },
  { id: 18, title: "Zjedz tę żabę", author: "Brian Tracy", rating: 4.70, reviewCount: 77, readTime: 26, category: "Produktywność", hasAudio: true, slug: "zjedz-te-zabe", cover: "/covers/32.png" },
  { id: 19, title: "Jedna rzecz", author: "Gary Keller", rating: 4.60, reviewCount: 68, readTime: 32, category: "Produktywność", hasAudio: true, slug: "jedna-rzecz", cover: "/covers/16.png" },
  { id: 20, title: "Reguła 5 sekund", author: "Mel Robbins", rating: 3.90, reviewCount: 112, readTime: 28, category: "Rozwój osobisty", hasAudio: true, slug: "regula-5-sekund", cover: "/covers/34.png" },
  { id: 21, title: "Mądrzej, szybciej, lepiej", author: "Charles Duhigg", rating: 4.30, reviewCount: 29, readTime: 36, category: "Produktywność", hasAudio: false, slug: "madrzej-szybciej", cover: "/covers/36.png" },
];

const moreBooks = [
  { id: 22, title: "7 nawyków skutecznego działania", author: "Stephen R. Covey", rating: 4.60, reviewCount: 184, readTime: 44, category: "Biznes i przywództwo", hasAudio: true, slug: "7-nawykow-skutecznego-dzialania", cover: "/covers/10.png" },
  { id: 23, title: "Mindset. Nowa psychologia sukcesu", author: "Carol S. Dweck", rating: 4.50, reviewCount: 97, readTime: 35, category: "Psychologia", hasAudio: true, slug: "mindset", cover: "/covers/5.png" },
  { id: 24, title: "Wywieranie wpływu na ludzi", author: "Robert B. Cialdini", rating: 4.80, reviewCount: 213, readTime: 39, category: "Psychologia", hasAudio: true, slug: "wywieranie-wplywu", cover: "/covers/7.png" },
  { id: 25, title: "Myśl i bogać się", author: "Napoleon Hill", rating: 4.20, reviewCount: 76, readTime: 41, category: "Finanse", hasAudio: true, slug: "mysl-i-bogac-sie", cover: "/covers/8.png" },
  { id: 26, title: "Bogaty ojciec, biedny ojciec", author: "Robert T. Kiyosaki", rating: 4.40, reviewCount: 148, readTime: 33, category: "Finanse", hasAudio: true, slug: "bogaty-ojciec-biedny-ojciec", cover: "/covers/9.png" },
  { id: 27, title: "Esencjalista", author: "Greg McKeown", rating: 4.60, reviewCount: 62, readTime: 36, category: "Produktywność", hasAudio: true, slug: "esencjalista", cover: "/covers/11.png" },
  { id: 28, title: "Porozumienie bez przemocy", author: "Marshall B. Rosenberg", rating: 4.70, reviewCount: 83, readTime: 38, category: "Komunikacja i relacje", hasAudio: false, slug: "porozumienie-bez-przemocy", cover: "/covers/12.png" },
  { id: 29, title: "Ikigai. Japoński sekret długiego i szczęśliwego życia", author: "Héctor García", rating: 4.30, reviewCount: 54, readTime: 28, category: "Rozwój osobisty", hasAudio: true, slug: "ikigai", cover: "/covers/13.png" },
  { id: 30, title: "Dlaczego śpimy", author: "Matthew Walker", rating: 4.80, reviewCount: 167, readTime: 42, category: "Zdrowie", hasAudio: true, slug: "dlaczego-spimy", cover: "/covers/15.png" },
  { id: 31, title: "Zacznij od dlaczego", author: "Simon Sinek", rating: 4.70, reviewCount: 129, readTime: 34, category: "Biznes i przywództwo", hasAudio: true, slug: "zacznij-od-dlaczego", cover: "/covers/17.png" },
  { id: 32, title: "Drive. Kompletny przewodnik po tym, co nas motywuje", author: "Daniel H. Pink", rating: 4.40, reviewCount: 71, readTime: 35, category: "Biznes i przywództwo", hasAudio: true, slug: "drive", cover: "/covers/21.png" },
  { id: 33, title: "Rework. Zignoruj stare zasady, zacznij działać", author: "Jason Fried", rating: 4.30, reviewCount: 41, readTime: 27, category: "Przedsiębiorczość", hasAudio: false, slug: "rework", cover: "/covers/22.png" },
];

export const allBooks = [
  ...freeBooks.map(b => ({ ...b, isFree: true as const })),
  ...recentBooks.map(b => ({ ...b, isFree: false as const })),
  ...moreBooks.map(b => ({ ...b, isFree: false as const })),
];

export const howItWorks = [
  {
    step: 1,
    title: "Wybieramy najlepsze książki",
    description: "Selekcjonujemy tysiące tytułów i wybieramy tylko te, które naprawdę warto przeczytać.",
    icon: "📚",
  },
  {
    step: 2,
    title: "Transformujemy teorię w praktykę",
    description: "Przekształcamy wiedzę w konkretne, actionable insights gotowe do zastosowania od razu.",
    icon: "⚙️",
  },
  {
    step: 3,
    title: "Dodajemy komentarz autorski",
    description: "Każda analiza zawiera nasz unikalny komentarz, który nadaje kontekst i perspektywę.",
    icon: "✍️",
  },
  {
    step: 4,
    title: "Dostarczamy w wielu formatach",
    description: "Tekst PDF, wersja audio, infografiki i zadania wdrożeniowe — wybierz swój styl nauki.",
    icon: "🎯",
  },
];

export const whyLumeo = [
  {
    title: "Esencja w 30 minut",
    description: "Zamiast czytać 300 stron, w 30 minut poznajesz kluczowe idee i możesz działać.",
    icon: "⏱️",
  },
  {
    title: "Unikalny komentarz",
    description: "Nie streszczamy — analizujemy. Każda analiza zawiera nasz autorski komentarz i perspektywę.",
    icon: "💡",
  },
  {
    title: "Infografiki",
    description: "Wizualne podsumowania najważniejszych koncepcji, które łatwo zapamiętasz i zachowasz.",
    icon: "🎨",
  },
  {
    title: "Wersje audio",
    description: "Słuchaj analiz podczas jazdy samochodem, biegania lub przerwy w pracy.",
    icon: "🎧",
  },
  {
    title: "Zadania wdrożeniowe",
    description: "Każda analiza kończy się konkretnymi zadaniami, które pomagają zastosować wiedzę w życiu.",
    icon: "✅",
  },
  {
    title: "Lumeo Lab",
    description: "Społeczność, która współtworzy platformę. Twój głos ma wpływ na to, co czytamy następne.",
    icon: "🔬",
  },
];

export const reviews = [
  {
    name: "Jacek P.",
    text: "Lumeo to oszczędność czasu i jakość w jednym. Zamiast czytać książkę przez tydzień, w 30 minut mam to, czego potrzebuję do działania.",
    avatar: "JP",
  },
  {
    name: "Przemysław K.",
    text: "Próbowałem Blinkist, ale Lumeo jest po prostu lepsze. Analizy są głębsze, komentarz autorski daje dodatkowy kontekst, a wersja polska to ogromny plus.",
    avatar: "PK",
  },
  {
    name: "Daria M.",
    text: "Format jest idealny — czytam podczas kawy, słucham audio w drodze do pracy. Zadania wdrożeniowe naprawdę pomagają zastosować wiedzę.",
    avatar: "DM",
  },
  {
    name: "David P.",
    text: "Kupiłem subskrypcję roczną i to jedna z najlepszych decyzji tego roku. Każdy tydzień nowa analiza, każda warta swojej ceny.",
    avatar: "DP",
  },
  {
    name: "Krystian H.",
    text: "Infografiki są genialne. Wieszam je w biurze i codziennie przypominają mi kluczowe zasady z przeczytanych analiz.",
    avatar: "KH",
  },
  {
    name: "Anna Z.",
    text: "Polecam każdemu, kto chce się rozwijać, ale nie ma czasu na czytanie całych książek. Jakość analiz jest naprawdę wysoka.",
    avatar: "AZ",
  },
];

export const blogPosts = [
  { title: "Tragedia wspólnych pastwisk", slug: "tragedia-wspolnych-pastwisk", date: "15 sty 2026", category: "Psychologia", image: "/covers/40.png", excerpt: "Dlaczego racjonalne działanie jednostek prowadzi do katastrofy dla całej grupy? To jedno z najważniejszych odkryć w psychologii społecznej." },
  { title: "Nomofobia — uzależnienie od telefonu", slug: "nomofobia", date: "10 sty 2026", category: "Psychologia", image: "/covers/48.png", excerpt: "Strach przed rozstaniem z telefonem dotyka już ponad 70% dorosłych. Sprawdź, jak to wpływa na Twoją produktywność i relacje." },
  { title: "Paradoks Abilene", slug: "paradoks-abilene", date: "5 sty 2026", category: "Biznes i przywództwo", image: "/covers/46.png", excerpt: "Grupa ludzi podejmuje decyzję, której nikt tak naprawdę nie chciał. Jak ten mechanizm sabotuje Twój zespół i jak go uniknąć?" },
  { title: "Prawo Galla", slug: "prawo-galla", date: "2 sty 2026", category: "Przedsiębiorczość", image: "/covers/44.png", excerpt: "Każdy działający złożony system wyewoluował z prostszego systemu, który działał. Co to oznacza dla Twojego biznesu?" },
  { title: "Ikigai — sens życia po japońsku", slug: "ikigai", date: "28 gru 2025", category: "Rozwój osobisty", image: "/covers/13.png", excerpt: "Japończycy z Okinawy żyją najdłużej na świecie. Ich sekret kryje się w jednym słowie, które łączy pasję, misję i powołanie." },
  { title: "Cykl zadłużenia Dalio", slug: "cykl-zadluzenia", date: "22 gru 2025", category: "Finanse", image: "/covers/9.png", excerpt: "Ray Dalio przez dekady badał wzorce gospodarcze. Jego model cyklu długu pomaga przewidzieć kryzysy, zanim nadejdą." },
  { title: "Prawo Goodharta", slug: "prawo-goodharta", date: "18 gru 2025", category: "Biznes i przywództwo", image: "/covers/52.png", excerpt: "Kiedy miara staje się celem, przestaje być dobrą miarą. Dlaczego KPI mogą niszczyć firmy i jak ustalać właściwe cele?" },
  { title: "Dlaczego Rockefeller był tak bogaty?", slug: "rockefeller", date: "14 gru 2025", category: "Finanse", image: "/covers/8.png", excerpt: "Nie chodziło tylko o ropę naftową. Rockefeller stosował zasady, które do dziś są podstawą budowania trwałego majątku." },
];

export const faqItems = [
  {
    question: "Jak często pojawiają się nowe analizy?",
    answer: "Nowe analizy dodajemy regularnie — co najmniej 2-4 nowe tytuły miesięcznie. Możesz śledzić nowości w sekcji 'Ostatnio dodane' lub zapisać się na newsletter.",
  },
  {
    question: "Czy wszystkie analizy mają wersje audio?",
    answer: "Większość analiz posiada wersje audio. Przy każdej analizie bez audio aktywnie pracujemy nad nagraniem. Przy opisie każdej książki widnieje ikona słuchawek, jeśli audio jest dostępne.",
  },
  {
    question: "Czy subskrypcja odnawia się automatycznie?",
    answer: "Tak, subskrypcja odnawia się automatycznie po upływie okresu rozliczeniowego. Możesz ją anulować w dowolnym momencie z poziomu swojego konta — bez żadnych konsekwencji.",
  },
  {
    question: "Czy potrzebuję karty kredytowej do okresu próbnego?",
    answer: "Tak, przy rejestracji prosimy o dane karty, ale przez 7 dni próbnych nie pobieramy żadnych opłat. Jeśli anulujesz przed końcem trialu, nie zostaniesz obciążony.",
  },
  {
    question: "Czy Lumeo narusza prawa autorskie?",
    answer: "Nie. Lumeo dostarcza oryginalne analizy, komentarze i syntezy — nie reprodukujemy treści książek. Nasze analizy uzupełniają oryginalne dzieła i zachęcają do zakupu pełnych wydań.",
  },
  {
    question: "Czy mogę otrzymać fakturę VAT?",
    answer: "Tak, wystawiamy faktury VAT. Podczas rejestracji lub w ustawieniach konta możesz podać dane firmowe i otrzymasz fakturę na każdą płatność.",
  },
  {
    question: "Czym Lumeo różni się od Blinkist?",
    answer: "Lumeo to platforma w języku polskim z autorskim komentarzem, infografikami i zadaniami wdrożeniowymi. Nie tylko streszczamy — analizujemy i pomagamy wdrożyć wiedzę w życie. Dodatkowo jako subskrybent masz wpływ na rozwój platformy przez Lumeo Lab.",
  },
];

export const partners = [
  "Dawid Haracz",
  "Studio Emka",
  "Czarna Owca",
  "PWN",
  "Galaktyka",
  "Freedom Publishing",
  "Znak",
  "Agora",
  "MT Biznes",
];

export const stats = [
  { value: "133", label: "przeanalizowanych książek" },
  { value: "74h", label: "zaoszczędzonych na notatkach" },
  { value: "2520", label: "autorskich komentarzy" },
];
