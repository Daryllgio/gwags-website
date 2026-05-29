import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function CTA({ lang }: Props) {
  const tx = t[lang].cta;

  return (
    <section
      className="py-20 md:py-24"
      style={{ backgroundColor: "#D4AF37" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold leading-snug mb-5"
          style={{ color: "#050F22" }}
        >
          {tx.h2}
        </h2>
        <p
          className="text-base md:text-lg leading-relaxed mb-10"
          style={{ color: "rgba(5,15,34,0.75)" }}
        >
          {tx.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-involved"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#050F22", color: "#D4AF37" }}
          >
            {tx.cta1}
          </a>
          <a
            href="#footer"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded transition-colors hover:bg-black/10"
            style={{ border: "1.5px solid #050F22", color: "#050F22" }}
          >
            {tx.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
