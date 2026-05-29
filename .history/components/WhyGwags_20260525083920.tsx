import {
  IconAward,
  IconWorld,
  IconRocket,
  IconCash,
  IconBulb,
  IconShield,
} from "@tabler/icons-react";
import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

const icons = [
  <IconAward size={28} key="award" />,
  <IconWorld size={28} key="world" />,
  <IconRocket size={28} key="rocket" />,
  <IconCash size={28} key="cash" />,
  <IconBulb size={28} key="bulb" />,
  <IconShield size={28} key="shield" />,
];

export default function WhyGwags({ lang }: Props) {
  const tx = t[lang].whyGwags;

  return (
    <section
      id="why-gwags"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#F7F6F3" }}
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
            style={{ color: "#0A1128" }}
          >
            {tx.h2}
          </h2>
          <p className="text-gray-600 leading-relaxed">{tx.body}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tx.cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-sm p-7 flex flex-col gap-4"
              style={{ borderTop: "2px solid #D4AF37" }}
            >
              <div
                className="self-center"
                style={{ color: "#D4AF37" }}
              >
                {icons[i]}
              </div>
              <h3
                className="text-center font-bold text-base"
                style={{ color: "#0A1128" }}
              >
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 text-center leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
