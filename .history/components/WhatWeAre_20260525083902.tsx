import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function WhatWeAre({ lang }: Props) {
  const tx = t[lang].whatWeAre;

  return (
    <section id="what-we-are" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#D4AF37" }}
            >
              {tx.eyebrow}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-snug mb-6"
              style={{ color: "#0A1128" }}
            >
              {tx.h2}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{tx.p1}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{tx.p2}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{tx.p3}</p>
            <a
              href="#our-story"
              className="text-sm font-semibold gold-underline"
              style={{ color: "#0A1128" }}
            >
              {tx.link} →
            </a>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
            {tx.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#D4AF37" }}
                />
                <div>
                  <h4
                    className="font-bold text-base mb-1"
                    style={{ color: "#0A1128" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
