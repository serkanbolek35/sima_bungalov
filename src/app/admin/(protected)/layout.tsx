"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  CalendarClock,
  CalendarDays,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Rezervasyonlar", icon: CalendarClock },
  { href: "/admin/availability", label: "Müsaitlik Takvimi", icon: CalendarDays },
  { href: "/admin/bungalows", label: "Bungalovlar & Fiyat", icon: Home },
  { href: "/admin/faq", label: "S.S.S.", icon: HelpCircle },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [loading, user, isAdmin, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-sm text-stone-500">
        Yükleniyor...
      </div>
    );
  }

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-5">
        <div>
          <p className="font-display text-lg font-medium text-stone-900">Sima Bungalov</p>
          <p className="text-xs text-stone-400">Yönetim Paneli</p>
        </div>
        <button
          className="text-stone-400 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Menüyü kapat"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-pine-deep text-white" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-200 p-3">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-stone-500 hover:bg-stone-100"
        >
          <LogOut size={16} />
          Çıkış Yap
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-stone-200 bg-white md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 md:hidden">
        <p className="font-display text-base font-medium text-stone-900">Sima Bungalov</p>
        <button onClick={() => setMobileOpen(true)} aria-label="Menüyü aç" className="text-stone-600">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col bg-white shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 pt-20 md:p-6 md:pt-6">{children}</main>
    </div>
  );
}
