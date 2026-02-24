import { reviews } from "@/lib/data";

const featured = reviews[0];
const rest = reviews.slice(1, 5);

export default function Reviews() {
  return (
    <section className="bg-[#0a0a0a] py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className="w-5 h-5 fill-[#FFD400]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-white font-bold text-sm ml-1">4.8 / 5.0</span>
              <span className="text-gray-500 text-sm">· ponad 300 opinii</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Co mówią czytelnicy?</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">Tysiące osób uczy się efektywniej dzięki Lumeo każdego tygodnia.</p>
        </div>

        {/* Featured review */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-4 relative overflow-hidden">
          <div className="absolute top-4 right-6 text-[6rem] font-black text-white/5 leading-none select-none">&ldquo;</div>
          <div className="flex gap-0.5 mb-4">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className="w-4 h-4 fill-[#FFD400]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-white text-lg font-medium leading-relaxed mb-6 max-w-3xl">
            &ldquo;{featured.text}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD400] flex items-center justify-center font-black text-sm text-black">
              {featured.avatar}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{featured.name}</div>
              <div className="text-xs text-gray-500">Subskrybent Lumeo ✓</div>
            </div>
          </div>
        </div>

        {/* 4 smaller reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((review) => (
            <div key={review.name} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:bg-white/8 transition-colors">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-3 h-3 fill-[#FFD400]" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-xs leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-[#FFD400] flex items-center justify-center font-black text-[10px] text-black">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{review.name}</div>
                  <div className="text-gray-600 text-[10px]">Subskrybent ✓</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
