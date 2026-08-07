"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/public-data";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";

const navItems = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#bungalovlar", label: "Bungalovlar" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#konum", label: "Konum" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const settings = useSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink-night/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg tracking-wide text-mist-cream">
          Sima <span className="text-amber-soft">Bungalov</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-mist-cream/80 transition-colors hover:text-amber-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink(settings.whatsapp, defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-amber-ember px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-soft md:flex"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <button
          className="text-mist-cream md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-night px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-mist-cream/90"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink(settings.whatsapp, defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-amber-ember px-4 py-2.5 text-sm font-medium text-white"
            >
              <MessageCircle size={16} />
              WhatsApp&apos;tan Ulaş
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
