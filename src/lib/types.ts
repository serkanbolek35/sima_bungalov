// Firestore veri modelleri

export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type BungalowAvailability = "available" | "reserved" | "pending" | "maintenance";

export interface Bungalow {
  id: string; // "bungalow-1" | "bungalow-2" | "bungalow-3" | "bungalow-4"
  number: number; // 1-4
  name: string; // "Bungalov 1"
  price: number; // TL / gece
  maxGuests: number;
  description: string;
  active: boolean; // false = geçici olarak yayından kaldır (bakım vb.)
  order: number;
}

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string; // ISO date "YYYY-MM-DD"
  checkOut: string; // ISO date "YYYY-MM-DD"
  guestCount: number;
  bungalowId: string; // Bungalow.id
  status: ReservationStatus;
  notes?: string;
  createdAt: number; // epoch ms
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string; // ülke kodu + numara, boşluksuz (örn. 905xxxxxxxxx)
  instagram: string;
  email: string;
  address: string;
  workingHours: string;
  mapEmbedUrl?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
}
