import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function OurStory({ lang }: Props) {
  const tx = t[lang].ourStory;

  return (
    <section id="our-story" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#D4AF37" }}
          >
            {tx.eyebrow}
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-snug"
            style={{ color: "#0A1128" }}
          >
            {tx.h2}
          </h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          {/* Connector line */}
          <div className="relative mb-4">
            <div
              className="absolute top-[10px] left-0 right-0 h-px"
              style={{ backgroundColor: "rgba(212,175,55,0.35)" }}
            />
            <div className="grid grid-cols-3">
              {tx.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center relative pt-0">
                  {/* Dot */}
                  <div
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 z-10 mb-8"
                    style={{
                      backgroundColor: "#D4AF37",
                      borderColor: "#D4AF37",
                    }}
                  />
                  <div className="text-center px-6">
                    <h4
                      className="font-bold text-base mb-0.5"
                      style={{ color: "#0A1128" }}
                    >
                      {step.label}
                    </h4>
                    <p
                      className="text-xs font-semibold tracking-wide uppercase mb-3"
                      style={{ color: "#D4AF37" }}
                    >
                      {step.sublabel}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden flex flex-col gap-0">
          {tx.steps.map((step, i) => (
            <div
              key={i}
              className="pl-6 pb-10 relative"
              style={{ borderLeft: "2px solid rgba(212,175,55,0.4)" }}
            >
              {/* Dot */}
              <div
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                style={{ backgroundColor: "#D4AF37" }}
              />
              <h4
                className="font-bold text-base mb-0.5"
                style={{ color: "#0A1128" }}
              >
                {step.label}
              </h4>
              <p
                className="text-xs font-semibold tracking-wide uppercase mb-3"
                style={{ color: "#D4AF37" }}
              >
                {step.sublabel}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
