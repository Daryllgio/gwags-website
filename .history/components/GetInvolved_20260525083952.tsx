import {
  IconBuilding,
  IconCoins,
  IconNetwork,
} from "@tabler/icons-react";
import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

const icons = [
  <IconBuilding size={32} key="building" />,
  <IconCoins size={32} key="coins" />,
  <IconNetwork size={32} key="network" />,
];

export default function GetInvolved({ lang }: Props) {
  const tx = t[lang].getInvolved;

  return (
    <section
      id="get-involved"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#0A1128" }}
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tx.cards.map((card, i) => (
            <div
              key={i}
              className="rounded-sm p-8 flex flex-col items-center text-center gap-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <div style={{ color: "#D4AF37" }}>{icons[i]}</div>
              <h3
                className="font-bold text-base"
                style={{ color: "#F7F6F3", fontFamily: "Georgia, serif" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(247,246,243,0.6)" }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
