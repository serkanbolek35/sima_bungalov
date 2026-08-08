import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import BungalowsOverview from "@/components/BungalowsOverview";
import GallerySection from "@/components/GallerySection";
import Amenities from "@/components/Amenities";
import Faq from "@/components/Faq";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { gallerySections, nightSection } from "@/lib/content";

export default function Home() {
  const poolGarden = gallerySections.filter((s) => s.id === "havuz" || s.id === "bahce");
  const interior = gallerySections.filter((s) => s.id === "ic-mekan" || s.id === "yatak-odasi");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BungalowsOverview />

        <div id="galeri">
          {poolGarden.map((s) => (
            <GallerySection key={s.id} {...s} />
          ))}
        </div>

        <GallerySection
          id="gece"
          eyebrow={nightSection.eyebrow}
          title={nightSection.title}
          subtitle={nightSection.subtitle}
          description={nightSection.description}
          images={nightSection.images}
          dark
        />

        {interior.map((s) => (
          <GallerySection key={s.id} {...s} />
        ))}

        <section className="bg-mist-cream px-5 pb-20 pt-4 text-center">
          <a
            href="/galeri"
            className="inline-flex items-center gap-2 rounded-full border border-pine-deep px-6 py-3 text-sm font-medium text-pine-deep transition-colors hover:bg-pine-deep hover:text-white"
          >
            Tüm 135 Fotoğrafı ve 35 Videoyu Gör
          </a>
        </section>

        <Amenities />
        <Faq />
        <LocationContact />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
