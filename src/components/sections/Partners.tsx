import { partners } from "@/lib/data";

export default function Partners() {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          Współpracujemy z wydawnictwami
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
