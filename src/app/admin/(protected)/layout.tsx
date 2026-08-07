"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [loading, user, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 text-sm text-stone-500">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="flex w-60 shrink-0 flex-col border-r border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-5 py-5">
          <p className="font-display text-lg font-medium text-stone-900">Sima Bungalov</p>
          <p className="text-xs text-stone-400">Yönetim Paneli</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100"
          >
            <LogOut size={16} />
            Çıkış Yap
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
