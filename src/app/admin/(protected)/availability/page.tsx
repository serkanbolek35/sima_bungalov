"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mergeBungalows } from "@/lib/bungalow-defaults";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { Reservation, Bungalow } from "@/lib/types";
import { Card, Select } from "@/components/ui/primitives";

const statusColor: Record<string, string> = {
  confirmed: "#dc2626", // Kırmızı — Rezerve
  pending: "#d97706", // Sarı — Beklemede
  cancelled: "#9ca3af", // Gri — İptal / kullanılmıyor
};

export default function AvailabilityPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "reservations"), (snap) => {
      setReservations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation)));
    });
    const unsub2 = onSnapshot(collection(db, "bungalows"), (snap) => {
      setBungalows(mergeBungalows(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Bungalow))));
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const events = useMemo(() => {
    return reservations
      .filter((r) => filter === "all" || r.bungalowId === filter)
      .filter((r) => r.status !== "cancelled")
      .map((r) => {
        const bungalow = bungalows.find((b) => b.id === r.bungalowId);
        return {
          id: r.id,
          title: `${bungalow?.name ?? r.bungalowId} — ${r.guestName}`,
          start: r.checkIn,
          end: r.checkOut,
          color: statusColor[r.status] ?? "#9ca3af",
        };
      });
  }, [reservations, bungalows, filter]);

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-stone-900">Müsaitlik Takvimi</h1>
          <p className="mt-1 text-sm text-stone-500">Hangi bungalovun ne zaman dolu olduğunu tek bakışta gör.</p>
        </div>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
          <option value="all">Tüm Bungalovlar</option>
          {bungalows.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </Select>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Onaylı</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-600" /> Beklemede</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Boş gün = müsait</span>
      </div>

      <Card className="mt-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          locale="tr"
          firstDay={1}
          events={events}
          headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
        />
      </Card>
    </div>
  );
}
