"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { t, type Lang } from "@/lib/translations";

interface NavProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Nav({ lang, setLang }: NavProps) {
  const [open, setOpen] = useState(false);
  const tx = t[lang].nav;

  const links = [
    { label: tx.about, href: "#what-we-are" },
    { label: tx.initiatives, href: "#initiatives" },
    { label: tx.story, href: "#our-story" },
    { label: tx.involved, href: "#get-involved" },
    { label: tx.contact, href: "#footer" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#0F1E3D" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <span
              className="text-xl md:text-2xl font-bold tracking-wide"
              style={{ color: "#D4AF37", fontFamily: "Georgia, serif" }}
            >
              Gwags
            </span>
            <span
              className="text-[9px] md:text-[10px] tracking-widest uppercase"
              style={{ color: "#D4AF37", opacity: 0.8 }}
            >
              Global Impact Institution
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* EN/FR toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-sm font-medium px-3 py-1 rounded transition-colors hover:bg-white/10"
              style={{ color: "#D4AF37", border: "1px solid #D4AF37" }}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-4 space-y-3"
          style={{ backgroundColor: "#0F1E3D", borderColor: "rgba(212,175,55,0.2)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-white/80 hover:text-white py-2 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
