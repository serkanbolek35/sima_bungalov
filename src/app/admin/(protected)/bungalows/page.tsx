"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, Input, Label, Textarea, Button, Select } from "@/components/ui/primitives";
import type { Bungalow } from "@/lib/types";

const defaults: Bungalow[] = [1, 2, 3, 4].map((n) => ({
  id: `bungalow-${n}`,
  number: n,
  name: `Bungalov ${n}`,
  price: 0,
  maxGuests: 4,
  description: "",
  active: true,
  order: n,
}));

export default function BungalowsPage() {
  const [bungalows, setBungalows] = useState<Bungalow[]>(defaults);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bungalows"), (snap) => {
      const saved = snap.docs.reduce<Record<string, Bungalow>>((acc, d) => {
        acc[d.id] = { id: d.id, ...d.data() } as Bungalow;
        return acc;
      }, {});
      // Firestore'da kaydedilmiş olanları al, kaydedilmemiş olanlar için
      // varsayılanları göster — böylece 4 bungalov her zaman görünür.
      const merged = defaults.map((d) => saved[d.id] ?? d);
      setBungalows(merged);
    });
    return unsub;
  }, []);

  async function save(b: Bungalow) {
    setSavingId(b.id);
    try {
      await setDoc(doc(db, "bungalows", b.id), b, { merge: true });
    } finally {
      setSavingId(null);
    }
  }

  function update(id: string, patch: Partial<Bungalow>) {
    setBungalows((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-medium text-stone-900">Bungalovlar & Fiyat</h1>
      <p className="mt-1 text-sm text-stone-500">
        4 bungalov birbirinin aynısı — sadece fiyat, kapasite ve yayın durumunu ayrı ayrı yönetebilirsin.
      </p>

      <div className="mt-6 space-y-4">
        {bungalows.map((b) => (
          <Card key={b.id}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <Label>Ad</Label>
                <Input value={b.name} onChange={(e) => update(b.id, { name: e.target.value })} />
              </div>
              <div>
                <Label>Gecelik Fiyat (₺)</Label>
                <Input type="number" value={b.price} onChange={(e) => update(b.id, { price: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Maksimum Misafir</Label>
                <Input type="number" value={b.maxGuests} onChange={(e) => update(b.id, { maxGuests: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Durum</Label>
                <Select value={b.active ? "1" : "0"} onChange={(e) => update(b.id, { active: e.target.value === "1" })}>
                  <option value="1">Yayında</option>
                  <option value="0">Yayında Değil (bakım vb.)</option>
                </Select>
              </div>
              <div className="sm:col-span-4">
                <Label>Açıklama</Label>
                <Textarea rows={2} value={b.description} onChange={(e) => update(b.id, { description: e.target.value })} />
              </div>
              <div className="sm:col-span-4">
                <Button onClick={() => save(b)} disabled={savingId === b.id}>
                  {savingId === b.id ? "Kaydediliyor..." : "Kaydet"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
