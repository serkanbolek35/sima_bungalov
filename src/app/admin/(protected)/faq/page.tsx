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
import { Card, Input, Textarea, Button, Label } from "@/components/ui/primitives";
import type { FaqItem } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";

export default function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "faq"), orderBy("order", "asc")), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FaqItem)));
    });
    return unsub;
  }, []);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "faq"), { question, answer, order: items.length });
      setQuestion("");
      setAnswer("");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (confirm("Bu soruyu silmek istediğine emin misin?")) {
      await deleteDoc(doc(db, "faq", id));
    }
  }

  async function updateItem(id: string, patch: Partial<FaqItem>) {
    await updateDoc(doc(db, "faq", id), patch);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-medium text-stone-900">Sık Sorulan Sorular</h1>
      <p className="mt-1 text-sm text-stone-500">Detay sayfasındaki S.S.S. bölümünü buradan yönet.</p>

      <Card className="mt-6">
        <form onSubmit={addItem} className="space-y-3">
          <div>
            <Label>Soru</Label>
            <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Evcil hayvan kabul ediyor musunuz?" />
          </div>
          <div>
            <Label>Cevap</Label>
            <Textarea rows={2} value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
          <Button type="submit" disabled={saving}>
            <Plus size={16} /> Soru Ekle
          </Button>
        </form>
      </Card>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Input
                  value={item.question}
                  onChange={(e) => updateItem(item.id, { question: e.target.value })}
                  className="font-medium"
                />
                <Textarea
                  rows={2}
                  value={item.answer}
                  onChange={(e) => updateItem(item.id, { answer: e.target.value })}
                />
              </div>
              <button onClick={() => remove(item.id)} className="mt-1 text-stone-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-stone-400">Henüz soru eklenmedi.</p>}
      </div>
    </div>
  );
}
