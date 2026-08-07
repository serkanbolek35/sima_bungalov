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

        <Amenities />
        <Faq />
        <LocationContact />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
