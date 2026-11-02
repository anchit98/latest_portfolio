import Header from "@/components/Header";
import Hero, { MobileProof } from "@/components/Hero";
import Career from "@/components/Career";
import Startup from "@/components/Startup";
import Builder from "@/components/Builder";
import BeyondWork from "@/components/BeyondWork";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Principles from "@/components/Principles";
import Contact from "@/components/Contact";
import { CaseStudyProvider } from "@/components/Projects";

// The page reads top to bottom like a biography: cover, then chapters 00 to 10.
export default function Home() {
  return (
    <main className="relative w-full">
      <Header />
      <Hero />
      <MobileProof />
      <CaseStudyProvider>
        <Career />
        <Startup />
        <Builder />
        <BeyondWork />
        <Work />
      </CaseStudyProvider>
      <TechStack />
      <Principles />
      <Contact />
    </main>
  );
}
