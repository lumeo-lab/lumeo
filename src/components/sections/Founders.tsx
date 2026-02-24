export default function Founders() {
  const founders = [
    {
      name: "Tomasz Zieliński",
      role: "CEO & Co-founder",
      initials: "TZ",
      bio: "Przedsiębiorca, absolwent Handlu Międzynarodowego i Informatyki Stosowanej. Ultramaratończyk, który przeczytał 300+ książek. Stworzył pierwszą wersję platformy (i-read.it) z pasji do porządkowania wiedzy.",
    },
    {
      name: "Mateusz Kamiński",
      role: "CTO & Co-founder",
      initials: "MK",
      bio: "Przedsiębiorca-samouk, absolwent Finansów i Rachunkowości. Twórca marki Petcom. Dołączył do projektu Tomka i nadał mu formę platformy — by wszyscy mogli oceniać i przyswajać najlepsze książki.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-black mb-3">Poznaj twórców</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Lumeo pochodzi od łacińskiego słowa „lumeo" — świecić. Stworzyliśmy tę platformę, bo sami potrzebowaliśmy lepszego sposobu na przyswajanie wiedzy z książek.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {founders.map((founder) => (
            <div key={founder.name} className="bg-[#F6F6F6] rounded-2xl p-8 flex flex-col items-center text-center gap-4 border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-[#FFD400] flex items-center justify-center text-2xl font-black text-black">
                {founder.initials}
              </div>
              <div>
                <div className="font-extrabold text-lg text-black">{founder.name}</div>
                <div className="text-sm text-[#8a6e00] font-semibold">{founder.role}</div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{founder.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
