import { t, type Lang } from "@/lib/translations";

interface Props { lang: Lang }

export default function Footer({ lang }: Props) {
  const tx = t[lang].footer;

  return (
    <footer id="footer" style={{ backgroundColor: "#030B1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <div>
              <span
                className="text-2xl font-bold tracking-wide"
                style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
              >
                Gwags
              </span>
              <p
                className="text-[10px] tracking-widest uppercase mt-0.5"
                style={{ color: "rgba(212,175,55,0.7)" }}
              >
                Global Impact Institution
              </p>
            </div>
            <p
              className="text-sm leading-relaxed mt-2"
              style={{ color: "rgba(247,246,243,0.5)" }}
            >
              {tx.tagline}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(247,246,243,0.35)" }}
            >
              {tx.countries}
            </p>
          </div>

          {/* Institution links */}
          <div>
            <h5
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#D4AF37" }}
            >
              {tx.colInstitution}
            </h5>
            <ul className="flex flex-col gap-3">
              {tx.linksInstitution.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(247,246,243,0.55)" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get involved links */}
          <div>
            <h5
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#D4AF37" }}
            >
              {tx.colInvolve}
            </h5>
            <ul className="flex flex-col gap-3">
              {tx.linksInvolve.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(247,246,243,0.55)" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(247,246,243,0.1)" }}
        >
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "rgba(247,246,243,0.35)" }}
          >
            {tx.copyright}
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "rgba(247,246,243,0.35)" }}
            >
              {tx.privacy}
            </a>
            <a
              href="#"
              className="text-xs hover:text-white transition-colors"
              style={{ color: "rgba(247,246,243,0.35)" }}
            >
              {tx.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
