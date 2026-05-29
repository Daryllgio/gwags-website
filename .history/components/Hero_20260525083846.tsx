import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function Hero({ lang }: Props) {
  const tx = t[lang].hero;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20"
      style={{ backgroundColor: "#0F1E3D" }}
    >
      {/* Decorative gold rings — top right */}
      <div className="absolute top-0 right-0 pointer-events-none select-none">
        <div
          className="absolute"
          style={{
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "1.5px solid rgba(212,175,55,0.18)",
            top: -120,
            right: -120,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1.5px solid rgba(212,175,55,0.12)",
            top: -60,
            right: -60,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1.5px solid rgba(212,175,55,0.08)",
            top: 0,
            right: 0,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-5"
            style={{ color: "#D4AF37" }}
          >
            {tx.eyebrow}
          </p>

          {/* H1 */}
          <h1
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 5vw, 62px)",
              color: "#ffffff",
            }}
          >
            {tx.h1a}
            <br />
            <span style={{ color: "#D4AF37" }}>{tx.h1gold}</span>
          </h1>

          {/* Body */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: "rgba(247,246,243,0.75)" }}
          >
            {tx.body}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#initiatives"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D4AF37", color: "#050F22" }}
            >
              {tx.cta1}
            </a>
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded transition-colors hover:bg-white/10"
              style={{ border: "1.5px solid rgba(247,246,243,0.5)", color: "#F7F6F3" }}
            >
              {tx.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
