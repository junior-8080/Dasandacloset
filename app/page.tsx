import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import Advantage from "@/components/Advantage";
import OurStory from "@/components/OurStory";
import SocialProof from "@/components/SocialProof";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Offerings />
      <Advantage />
      <OurStory />
      <SocialProof />
      <CTABanner />
      <Footer />
    </main>
  );
}