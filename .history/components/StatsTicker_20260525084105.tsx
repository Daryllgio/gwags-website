import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function StatsTicker({ lang }: Props) {
  const tx = t[lang].stats;
  const items = [tx.initiatives, tx.countries, tx.network];

  return (
    <section style={{ backgroundColor: "#0F1E3D" }}>
      <div
        className="border-t border-b"
        style={{ borderColor: "rgba(212,175,55,0.25)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center"
                style={i > 0 ? { borderLeft: "1px solid rgba(212,175,55,0.2)" } : {}}
              >
                <span
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
                >
                  {item.value}
                </span>
                <span
                  className="mt-1 text-sm tracking-wide uppercase"
                  style={{ color: "rgba(247,246,243,0.65)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
