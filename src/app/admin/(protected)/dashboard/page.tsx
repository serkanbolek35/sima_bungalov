"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/primitives";
import type { Reservation } from "@/lib/types";
import { CalendarClock, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reservations"), (snap) => {
      setReservations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation)));
    });
    return unsub;
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = reservations
    .filter((r) => r.status !== "cancelled" && r.checkIn >= today)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))
    .slice(0, 6);
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-medium text-stone-900">Genel Bakış</h1>
      <p className="mt-1 text-sm text-stone-500">Sima Bungalov yönetim paneline hoş geldin.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <CalendarClock size={18} />
          </div>
          <div>
            <p className="text-xs text-stone-500">Bekleyen Talep</p>
            <p className="text-xl font-semibold text-stone-900">{pendingCount}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Users size={18} />
          </div>
          <div>
            <p className="text-xs text-stone-500">Onaylı Rezervasyon</p>
            <p className="text-xl font-semibold text-stone-900">{confirmedCount}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-xs text-stone-500">Toplam Kayıt</p>
            <p className="text-xl font-semibold text-stone-900">{reservations.length}</p>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium text-stone-900">Yaklaşan Girişler</h2>
          <Link href="/admin/reservations" className="text-sm font-medium text-pine-deep hover:underline">
            Tümünü Gör
          </Link>
        </div>
        <Card className="divide-y divide-stone-100 p-0">
          {upcoming.length === 0 && (
            <p className="p-5 text-sm text-stone-400">Yaklaşan rezervasyon bulunmuyor.</p>
          )}
          {upcoming.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-5 py-3 text-sm">
              <div>
                <p className="font-medium text-stone-800">{r.guestName}</p>
                <p className="text-xs text-stone-400">{r.bungalowId} · {r.guestCount} kişi</p>
              </div>
              <div className="text-right">
                <p className="text-stone-700">{r.checkIn} → {r.checkOut}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
