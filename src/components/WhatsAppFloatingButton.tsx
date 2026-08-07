"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/public-data";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton() {
  const settings = useSettings();
  return (
    <a
      href={whatsappLink(settings.whatsapp, defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan yaz"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
