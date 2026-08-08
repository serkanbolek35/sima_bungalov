"use client";

import Link from "next/link";
import { AtSign, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { useSettings } from "@/lib/public-data";
import { Logo } from "./Logo";

export default function Footer() {
  const settings = useSettings();
  return (
    <footer className="bg-ink-night px-5 py-14 text-mist-cream/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <Logo markClassName="h-8 w-8 text-mist-cream" textClassName="font-display text-xl text-mist-cream" />
          <p className="mt-3 text-sm leading-relaxed text-mist-cream/60">
            Sapanca&apos;nın doğasında, ısıtmalı özel havuzlu 4 bağımsız bungalov.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-amber-soft">Keşfet</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#hakkimizda" className="hover:text-amber-soft">Hakkımızda</Link></li>
            <li><Link href="/#bungalovlar" className="hover:text-amber-soft">Bungalovlar</Link></li>
            <li><Link href="/#galeri" className="hover:text-amber-soft">Galeri</Link></li>
            <li><Link href="/#konum" className="hover:text-amber-soft">Konum</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-amber-soft">İletişim</p>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-amber-soft" /> {settings.phone || "05xx xxx xx xx"}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-amber-soft" /> {settings.email || "info@simabungalov.com"}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-amber-soft" /> {settings.address || "Sapanca, Sakarya"}
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-amber-soft">Sosyal Medya</p>
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-amber-soft"
            >
              <AtSign size={16} /> Instagram
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6">
        <a
          href="https://savibu.org.tr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-amber-soft/30 px-4 py-2 text-xs font-medium text-amber-soft transition-colors hover:border-amber-soft/60"
        >
          <ShieldCheck size={14} />
          SAVİBU Üyesidir — Sapanca Villa ve Bungalov İşletmecileri Derneği
        </a>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-white/10 pt-6 text-xs text-mist-cream/40">
        © {new Date().getFullYear()} Sima Bungalov. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
