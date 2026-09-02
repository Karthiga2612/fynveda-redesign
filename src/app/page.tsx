import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import WhyFynVeda from "@/sections/WhyFynVeda";
import RealNetWorth from "@/sections/RealNetWorth";
import WealthGrowth from "@/sections/WealthGrowth";
import Technology from "@/sections/Technology";
import CTA from "@/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyFynVeda />
      <RealNetWorth />
      <WealthGrowth />
      <Technology />
      <CTA />
      <Footer />
    </main>
  );
}
