import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function LeadershipQuote({ lang }: Props) {
  const tx = t[lang].quote;

  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: "#0A1128" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Large quotation mark */}
        <div
          className="text-7xl md:text-8xl leading-none mb-4 select-none"
          style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
          aria-hidden
        >
          &ldquo;
        </div>

        {/* Quote */}
        <blockquote
          className="text-lg md:text-2xl leading-relaxed italic mb-8"
          style={{ color: "#F7F6F3", fontFamily: "Georgia, serif" }}
        >
          {tx.text}
        </blockquote>

        {/* Divider */}
        <div
          className="mx-auto mb-6"
          style={{ width: 60, height: 1, backgroundColor: "#D4AF37" }}
        />

        {/* Name */}
        <p
          className="font-semibold text-base"
          style={{ color: "#D4AF37" }}
        >
          {tx.name}
        </p>

        {/* Role */}
        <p
          className="text-sm mt-1"
          style={{ color: "rgba(247,246,243,0.6)" }}
        >
          {tx.role}
        </p>
      </div>
    </section>
  );
}
