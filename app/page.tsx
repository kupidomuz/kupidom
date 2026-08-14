import CategorySection from "@/components/CategorySection/CategorySection";
import Hero from "@/components/Hero/Hero";
import PropertiesCatalog from "@/components/PropertiesCatalog/PropertiesCatalog";
import AboutSection from "@/components/AboutSection/AboutSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import ContactSection from "@/components/ContactSection/ContactSection";

export default function HomePage() {
  return (
    <main>

      <Hero />

      <CategorySection />

      <PropertiesCatalog />

      <AboutSection />

      <ServicesSection />

      <ContactSection />

    </main>
  );
}