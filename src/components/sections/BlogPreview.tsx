import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Psychologia":           "bg-purple-100 text-purple-700",
  "Biznes i przywództwo":  "bg-blue-100 text-blue-700",
  "Finanse":               "bg-green-100 text-green-700",
  "Przedsiębiorczość":     "bg-orange-100 text-orange-700",
  "Rozwój osobisty":       "bg-yellow-100 text-yellow-800",
};

function categoryClass(cat: string) {
  return categoryColors[cat] ?? "bg-gray-100 text-gray-600";
}

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="bg-[#F6F6F6] py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Wiedza w pigułce</p>
            <h2 className="text-2xl font-extrabold text-black">Na blogu Lumeo</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors flex items-center gap-1">
            Wszystkie artykuły
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#FFD400] hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative bg-[#F0F0F0] flex items-center justify-center overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass(post.category)}`}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>

                <h3 className="font-bold text-base text-black leading-snug group-hover:text-[#7a5f00] transition-colors mb-3">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-black hover:text-[#7a5f00] transition-colors"
                >
                  Czytaj więcej
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
