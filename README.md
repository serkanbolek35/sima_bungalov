# Sima Bungalov — Web Sitesi

Sapanca'da ısıtmalı özel havuzlu 4 bağımsız bungalov için üretime hazır web sitesi.

## Stack
- Next.js 15 (App Router, static export)
- TypeScript, Tailwind CSS v4, Framer Motion
- Firebase (Auth + Firestore) — Storage kullanılmıyor, medya `/public` altında statik
- yet-another-react-lightbox, FullCalendar (admin müsaitlik takvimi)

## Kurulum

```bash
npm install
cp .env.example .env.local   # Firebase config değerlerini doldur
npm run dev
```

`.env.local` asla git'e commit edilmez (`.gitignore` içinde).

## Vercel'de Deploy

1. Bu repoyu GitHub'a push et (GitHub Desktop ile).
2. vercel.com → "Add New Project" → bu repoyu seç.
3. **Environment Variables** kısmına `.env.example`'daki 7 değişkeni gerçek Firebase config değerleriyle ekle.
4. Deploy'a bas.
5. Domain aldığında: Vercel proje ayarları → Domains → domain'i ekle, DNS kayıtlarını domain sağlayıcında güncelle.

## Firebase Kurulumu (bir kereye mahsus)

Firestore güvenlik kurallarını `firestore.rules` dosyasından Firebase Console → Firestore → Rules sekmesine yapıştır ve yayınla.

Admin girişi için Firebase Console → Authentication → Users kısmından e-posta/şifre ile kullanıcı oluştur, sonra Firestore → `admins` koleksiyonuna, **doküman ID'si o kullanıcının UID'si olacak şekilde** boş bir doküman ekle (örn. herhangi bir alan, sadece dokümanın var olması yeterli).

## Admin Panel

`/admin/login` adresinden giriş yapılır. İlk girişte:
1. **Bungalovlar** sayfasından 4 bungalovun fiyat/kapasite bilgisini gir ve kaydet (ilk kayıtta Firestore'da otomatik oluşturulur).
2. **Ayarlar** sayfasından telefon, WhatsApp numarası, adres, Google Maps embed linkini gir.
3. **S.S.S.** sayfasından sık sorulan soruları ekle.
4. **Rezervasyonlar / Müsaitlik Takvimi** WhatsApp üzerinden gelen talepleri manuel kaydetmek için kullanılır.

## Medya Kütüphanesi

`public/images` ve `public/video` altındaki dosyalar, orijinal 178 dosyalık arşivden kalite/kategori analiziyle seçilip optimize edilmiş 63 görsel + 1 hero videodur. Yeni görsel eklemek/değiştirmek kod güncellemesi gerektirir (Storage kullanılmadığı için).

## Yapı

```
src/
  app/                  → public sayfalar + admin panel (route groups)
  components/           → paylaşılan public bileşenler
  components/ui/        → admin panel için sade UI primitifleri
  lib/                  → firebase.ts, content.ts (TR içerik), types.ts, hooks
public/
  images/, video/        → statik medya
firestore.rules          → Firestore güvenlik kuralları
