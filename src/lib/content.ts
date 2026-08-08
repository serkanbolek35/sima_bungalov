// Sima Bungalov — merkezi içerik ve görsel referans dosyası

export const site = {
  name: "Sima Bungalov",
  location: "Sapanca, Sakarya",
  phone: "+90 5xx xxx xx xx", // TODO: gerçek numarayla değiştirin
  whatsapp: "905xxxxxxxxx", // TODO: gerçek WhatsApp numarasıyla değiştirin (ülke kodu ile, boşluksuz)
  instagram: "https://instagram.com/simabungalov", // TODO: doğrula
  email: "info@simabungalov.com", // TODO: gerçek e-posta ile değiştirin
};

export type GalleryImage = { src: string; alt: string; caption?: string };

const img = (category: string, file: string) => `/images/${category}/${file}`;

export const heroImages: GalleryImage[] = [
  { src: img("hero", "hero-01.webp"), alt: "Sapanca'da ısıtmalı özel havuzlu A-frame bungalov, gece manzarası" },
  { src: img("hero", "hero-06.webp"), alt: "Sima Bungalov kuş bakışı gece görünümü, aydınlatılmış havuz" },
  { src: img("hero", "hero-03.webp"), alt: "Sima Bungalov gece dış cephe ve özel havuz" },
];

export const heroVideo = {
  src: "/video/hero-night.mp4",
  poster: "/video/hero-01.webp",
};

export const bungalowUnits = [
  {
    name: "Bungalov I",
    tagline: "Bahçeye ve gün batımına bakan sakin köşe",
    image: img("exterior", "exterior-01.webp"),
  },
  {
    name: "Bungalov II",
    tagline: "Geniş terası ve havuz manzarasıyla öne çıkan seçenek",
    image: img("exterior", "exterior-05.webp"),
  },
  {
    name: "Bungalov III",
    tagline: "Sapanca'nın yeşiline en yakın, en sakin konum",
    image: img("exterior", "exterior-08.webp"),
  },
];

export const gallerySections: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  images: GalleryImage[];
}[] = [
  {
    id: "havuz",
    eyebrow: "Isıtmalı Özel Havuz",
    title: "Isıtmalı Özel Havuz Keyfi",
    subtitle: "Sapanca gecelerinde size ait tamamen özel bir havuz deneyimi",
    description:
      "Korunaklı bahçenizde yer alan ısıtmalı özel havuz sayesinde yılın her döneminde konforlu ve huzurlu bir tatil yaşayabilirsiniz. Gündüz güneşin tadını çıkarın, gece yıldızların altında suyun keyfini sürün.",
    images: [
      { src: img("pool", "pool-01.webp"), alt: "Sapanca'da ısıtmalı özel havuz, bungalov teras havuzu" },
      { src: img("pool", "pool-02.webp"), alt: "Sima Bungalov havuz kenarı ahşap deck" },
      { src: img("pool", "pool-03.webp"), alt: "Sima Bungalov havuz gün batımı" },
      { src: img("pool", "pool-04.webp"), alt: "Sima Bungalov havuz merdiveni detay" },
      { src: img("pool", "pool-05.webp"), alt: "Sima Bungalov havuz kuş bakışı" },
      { src: img("pool", "pool-06.webp"), alt: "Sima Bungalov jakuzili havuz alanı" },
      { src: img("pool", "pool-07.webp"), alt: "Sima Bungalov havuz şelale detayı" },
      { src: img("pool", "pool-08.webp"), alt: "Sima Bungalov havuz gündüz manzarası" },
    ],
  },
  {
    id: "bahce",
    eyebrow: "Özel Bahçe",
    title: "Özel Bahçenizde Doğayla Baş Başa",
    subtitle: "Barbekü keyfi ve yeşillikler içinde huzurlu anlar",
    description:
      "Çevresi yeşil çitlerle çevrili özel bahçemizde sabah kahvenizi yudumlayabilir, akşamları barbekü eşliğinde sevdiklerinizle keyifli vakit geçirebilirsiniz. Sapanca'nın temiz havası, bahçemizde sizi karşılıyor.",
    images: [
      { src: img("garden", "garden-01.webp"), alt: "Sima Bungalov özel bahçe alanı" },
      { src: img("garden", "garden-02.webp"), alt: "Sima Bungalov bahçe salıncak" },
      { src: img("garden", "garden-03.webp"), alt: "Sima Bungalov barbekü alanı" },
      { src: img("garden", "garden-04.webp"), alt: "Sima Bungalov bahçe oturma grubu" },
      { src: img("garden", "garden-05.webp"), alt: "Sima Bungalov bahçe yürüyüş yolu" },
      { src: img("garden", "garden-06.webp"), alt: "Sima Bungalov yeşil bahçe manzarası" },
    ],
  },
  {
    id: "ic-mekan",
    eyebrow: "İç Mekan",
    title: "Sıcak ve Şık Yaşam Alanı",
    subtitle: "Sevdiklerinizle unutulmaz anlar için tasarlandı",
    description:
      "Ahşap tavan detayları, geniş cam cepheleri ve modern mobilyalarıyla yaşam alanımız, hem gündüz doğal ışıkla hem de gece samimi atmosferiyle konforlu bir ortam sunar. Modern donanımlı mutfağımız kahvaltıdan akşam yemeğine kadar tüm ihtiyaçlarınızı karşılar.",
    images: [
      { src: img("living-room", "living-room-01.webp"), alt: "Sima Bungalov modern iç mekan oturma alanı" },
      { src: img("living-room", "living-room-02.webp"), alt: "Sima Bungalov oturma alanı cam cephe" },
      { src: img("kitchen", "kitchen-01.webp"), alt: "Sima Bungalov modern mutfak" },
      { src: img("kitchen", "kitchen-02.webp"), alt: "Sima Bungalov mutfak detay" },
      { src: img("living-room", "living-room-03.webp"), alt: "Sima Bungalov çatı katı oturma alanı" },
      { src: img("kitchen", "kitchen-03.webp"), alt: "Sima Bungalov kahve köşesi" },
    ],
  },
  {
    id: "yatak-odasi",
    eyebrow: "Yatak Odası",
    title: "Huzurlu Uyku, Yenilenmiş Uyanış",
    subtitle: "Doğanın sessizliğinde dinlendirici bir gece",
    description:
      "Her yatak odası, Sapanca'da geçirdiğiniz günün ardından size maksimum konfor ve dinginlik sunacak şekilde özenle tasarlanmıştır. Yumuşak tekstiller ve sade dekorasyon, huzurlu bir uyku deneyimi vaat ediyor.",
    images: [
      { src: img("bedroom", "bedroom-01.webp"), alt: "Sima Bungalov yatak odası ahşap tavan" },
      { src: img("bedroom", "bedroom-02.webp"), alt: "Sima Bungalov çift kişilik yatak odası" },
      { src: img("bedroom", "bedroom-03.webp"), alt: "Sima Bungalov tek kişilik yatak odaları" },
      { src: img("bedroom", "bedroom-04.webp"), alt: "Sima Bungalov yatak odası pencere manzarası" },
      { src: img("bedroom", "bedroom-05.webp"), alt: "Sima Bungalov yatak odası detay" },
    ],
  },
];

export const nightSection = {
  eyebrow: "Gece Atmosferi",
  title: "Sapanca Gecelerinin Büyülü Hali",
  subtitle: "Aydınlatılmış havuz ve romantik atmosfer",
  description:
    "Gün batımıyla birlikte bungalovlarımız büyülü bir atmosfere bürünür. Aydınlatılmış havuz, mum ışığı ve yıldızların altında unutulmaz bir akşam sizi bekliyor.",
  images: [
    { src: img("night", "night-01.webp"), alt: "Sima Bungalov gece havuz aydınlatması" },
    { src: img("night", "night-02.webp"), alt: "Sima Bungalov gece dış cephe ışıkları" },
    { src: img("night", "night-03.webp"), alt: "Sima Bungalov gece kuş bakışı aydınlatılmış havuz" },
    { src: img("night", "night-04.webp"), alt: "Sima Bungalov gece romantik atmosfer" },
    { src: img("night", "night-05.webp"), alt: "Sima Bungalov gece bahçe ışıkları" },
    { src: img("night", "night-06.webp"), alt: "Sima Bungalov gece genel görünüm" },
  ] as GalleryImage[],
};

export const droneSection = {
  eyebrow: "Kuş Bakışı",
  title: "Yukarıdan Sima Bungalov",
  subtitle: "Sapanca'nın yeşil dokusunda ayrıcalıklı konum",
  description:
    "Kuş bakışı görüntülerde bungalovlarımızın Sapanca'nın eşsiz doğasıyla nasıl bütünleştiğini keşfedin. Geniş yeşil alanlar ve özel havuzlarla çevrili konumumuz, huzurlu bir tatilin ilk adımı. İstanbul'a yakın, şehrin gürültüsünden uzak.",
  images: [
    { src: img("drone", "drone-01.webp"), alt: "Sima Bungalov Sapanca drone havadan görünüm" },
    { src: img("drone", "drone-02.webp"), alt: "Sima Bungalov drone gece görünümü" },
    { src: img("drone", "drone-03.webp"), alt: "Sima Bungalov drone bahçe ve havuz" },
    { src: img("drone", "drone-04.webp"), alt: "Sima Bungalov drone genel yerleşim" },
    { src: img("drone", "drone-05.webp"), alt: "Sima Bungalov drone Sapanca manzarası" },
    { src: img("drone", "drone-06.webp"), alt: "Sima Bungalov drone doğa manzarası" },
  ] as GalleryImage[],
};

export const lifestyleImages: GalleryImage[] = [
  { src: img("lifestyle", "lifestyle-01.webp"), alt: "Sima Bungalov havuz başında yaşam tarzı fotoğrafı" },
  { src: img("lifestyle", "lifestyle-02.webp"), alt: "Sima Bungalov kahvaltı keyfi" },
  { src: img("lifestyle", "lifestyle-03.webp"), alt: "Sima Bungalov şarap eşliğinde huzurlu an" },
  { src: img("lifestyle", "lifestyle-04.webp"), alt: "Sima Bungalov gece mum ışığı" },
  { src: img("lifestyle", "lifestyle-05.webp"), alt: "Sima Bungalov kahvaltı sofrası" },
];

export const amenities = [
  { label: "Isıtmalı Özel Havuz", note: "Yılın her dönemi kullanılabilir" },
  { label: "Özel Bahçe & Barbekü", note: "Tamamen size özel dış alan" },
  { label: "Ücretsiz Otopark", note: "Bungalov önünde park imkânı" },
  { label: "Ücretsiz Wi-Fi", note: "Tüm bungalovlarda" },
  { label: "Jakuzi", note: "Seçili bungalovlarda" },
  { label: "Kahvaltı Seçeneği", note: "Talep üzerine hazırlanır" },
];
