"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, Input, Label, Button, Textarea } from "@/components/ui/primitives";
import type { SiteSettings } from "@/lib/types";

const defaults: SiteSettings = {
  phone: "",
  whatsapp: "",
  instagram: "",
  email: "",
  address: "",
  workingHours: "7/24 WhatsApp üzerinden ulaşılabilir",
  mapEmbedUrl: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "settings", "general")).then((snap) => {
      if (snap.exists()) setSettings(snap.data() as SiteSettings);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "settings", "general"), settings, { merge: true });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-stone-900">İletişim & İşletme Ayarları</h1>
      <p className="mt-1 text-sm text-stone-500">Bu bilgiler site genelinde (iletişim, footer, WhatsApp butonları) kullanılır.</p>

      <Card className="mt-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Telefon</Label>
            <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} placeholder="05xx xxx xx xx" />
          </div>
          <div>
            <Label>WhatsApp Numarası (ülke kodu ile, boşluksuz)</Label>
            <Input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="905xxxxxxxxx" />
          </div>
          <div>
            <Label>Instagram Linki</Label>
            <Input value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <Label>E-posta</Label>
            <Input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
          <div>
            <Label>Adres</Label>
            <Textarea rows={2} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} placeholder="Sapanca, Sakarya" />
          </div>
          <div>
            <Label>Çalışma Saatleri</Label>
            <Input value={settings.workingHours} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} />
          </div>
          <div>
            <Label>Google Maps Embed URL (isteğe bağlı)</Label>
            <Input value={settings.mapEmbedUrl} onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
            {saved && <span className="text-sm text-emerald-600">Kaydedildi ✓</span>}
          </div>
        </form>
      </Card>
    </div>
  );
}
