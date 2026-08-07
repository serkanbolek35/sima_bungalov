export function whatsappLink(whatsappNumber: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

export const defaultWhatsappMessage =
  "Merhaba! Sima Bungalov hakkında bilgi almak istiyorum. Uygun tarihleri ve fiyatları öğrenebilir miyim?";

export function bungalowWhatsappMessage(bungalowName: string) {
  return `Merhaba! ${bungalowName} için müsaitlik ve fiyat bilgisi almak istiyorum.`;
}
