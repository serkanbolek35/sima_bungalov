"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button, Input, Select, Label, Card, Textarea } from "@/components/ui/primitives";
import type { Reservation, ReservationStatus, Bungalow } from "@/lib/types";
import { Plus, Trash2, X } from "lucide-react";

const emptyForm = {
  guestName: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guestCount: 2,
  bungalowId: "bungalow-1",
  status: "pending" as ReservationStatus,
  notes: "",
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, "reservations"), orderBy("checkIn", "desc")), (snap) => {
      setReservations(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation)));
    });
    const unsub2 = onSnapshot(collection(db, "bungalows"), (snap) => {
      setBungalows(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Bungalow)).sort((a, b) => a.order - b.order));
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "reservations"), {
        ...form,
        guestCount: Number(form.guestCount),
        createdAt: Date.now(),
      });
      setForm(emptyForm);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: ReservationStatus) {
    await updateDoc(doc(db, "reservations", id), { status });
  }

  async function remove(id: string) {
    if (confirm("Bu rezervasyon kaydını silmek istediğine emin misin?")) {
      await deleteDoc(doc(db, "reservations", id));
    }
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-stone-900">Rezervasyonlar</h1>
          <p className="mt-1 text-sm text-stone-500">
            WhatsApp üzerinden gelen talepleri buradan manuel olarak kaydet ve takip et.
          </p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Vazgeç" : "Yeni Rezervasyon"}
        </Button>
      </div>

      {showForm && (
        <Card className="mt-5">
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Misafir Adı</Label>
              <Input required value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="05xx xxx xx xx" />
            </div>
            <div>
              <Label>Giriş Tarihi</Label>
              <Input required type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div>
              <Label>Çıkış Tarihi</Label>
              <Input required type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
            </div>
            <div>
              <Label>Misafir Sayısı</Label>
              <Input required type="number" min={1} value={form.guestCount} onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Bungalov</Label>
              <Select value={form.bungalowId} onChange={(e) => setForm({ ...form, bungalowId: e.target.value })}>
                {bungalows.length === 0 && <option value="bungalow-1">Bungalov 1</option>}
                {bungalows.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Durum</Label>
              <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ReservationStatus })}>
                <option value="pending">Beklemede</option>
                <option value="confirmed">Onaylandı</option>
                <option value="cancelled">İptal</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Not</Label>
              <Textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>{saving ? "Kaydediliyor..." : "Rezervasyonu Kaydet"}</Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-left text-xs text-stone-400">
              <th className="px-4 py-3 font-medium">Misafir</th>
              <th className="px-4 py-3 font-medium">Bungalov</th>
              <th className="px-4 py-3 font-medium">Giriş</th>
              <th className="px-4 py-3 font-medium">Çıkış</th>
              <th className="px-4 py-3 font-medium">Kişi</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-stone-50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-stone-800">{r.guestName}</p>
                  <p className="text-xs text-stone-400">{r.phone}</p>
                </td>
                <td className="px-4 py-3 text-stone-600">{r.bungalowId}</td>
                <td className="px-4 py-3 text-stone-600">{r.checkIn}</td>
                <td className="px-4 py-3 text-stone-600">{r.checkOut}</td>
                <td className="px-4 py-3 text-stone-600">{r.guestCount}</td>
                <td className="px-4 py-3">
                  <Select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value as ReservationStatus)}
                    className="w-32 !py-1 text-xs"
                  >
                    <option value="pending">Beklemede</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="cancelled">İptal</option>
                  </Select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(r.id)} className="text-stone-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-stone-400">
                  Henüz rezervasyon kaydı yok. &quot;Yeni Rezervasyon&quot; ile ilk kaydı ekle.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
