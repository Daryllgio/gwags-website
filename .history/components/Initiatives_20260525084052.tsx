import {
  IconSchool,
  IconSeeding,
  IconStethoscope,
  IconHeart,
} from "@tabler/icons-react";
import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

const icons = [
  <IconSchool size={28} key="school" />,
  <IconSeeding size={28} key="seed" />,
  <IconStethoscope size={28} key="steth" />,
  <IconHeart size={28} key="heart" />,
];

export default function Initiatives({ lang }: Props) {
  const tx = t[lang].initiatives;

  return (
    <section
      id="initiatives"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#050F22" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#D4AF37" }}
          >
            {tx.eyebrow}
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-snug mb-4"
            style={{ color: "#F7F6F3" }}
          >
            {tx.h2}
          </h2>
          <p style={{ color: "rgba(247,246,243,0.65)" }} className="leading-relaxed">
            {tx.body}
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid rgba(212,175,55,0.2)", borderBottom: "1px solid rgba(212,175,55,0.2)" }}
        >
          {tx.cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col p-7 md:p-8 gap-4"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(212,175,55,0.2)" : undefined,
                borderBottom: "1px solid rgba(212,175,55,0.08)",
              }}
            >
              {/* Icon */}
              <div style={{ color: "#D4AF37" }}>{icons[i]}</div>

              {/* Title */}
              <h3
                className="text-base font-bold leading-snug"
                style={{ color: "#F7F6F3", fontFamily: "Georgia, serif" }}
              >
                {card.title}
              </h3>

              {/* Desc */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "rgba(247,246,243,0.6)" }}
              >
                {card.desc}
              </p>

              {/* Tag */}
              <span
                className="text-xs font-bold tracking-widest gold-underline self-start"
                style={{ color: "#D4AF37" }}
              >
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
