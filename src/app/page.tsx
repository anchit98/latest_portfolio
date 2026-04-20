import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import SocialBar from "@/components/SocialBar";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Career from "@/components/Career";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  return (
    <main className="w-full bg-background min-h-screen selection:bg-foreground selection:text-background relative">
      <CustomCursor />
      <Header />
      <SocialBar />
      <ScrollToTop />
      <ScrollIndicator />

      <section className="relative">
        <ScrollyCanvas />
      </section>

      <Career />

      <div className="relative h-px w-full max-w-7xl mx-auto px-6 md:px-12 my-2 flex items-center justify-center">
        <div className="absolute inset-x-6 md:inset-x-12 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 z-10" />
      </div>

      <Projects />

      <div className="relative h-px w-full max-w-7xl mx-auto px-6 md:px-12 my-2 flex items-center justify-center">
        <div className="absolute inset-x-6 md:inset-x-12 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 z-10" />
      </div>

      <TechStack />

      <div className="relative h-px w-full max-w-7xl mx-auto px-6 md:px-12 my-2 flex items-center justify-center">
        <div className="absolute inset-x-6 md:inset-x-12 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 z-10" />
      </div>

      <Contact />

      <footer className="w-full py-12 border-t border-foreground/5 bg-background text-center text-foreground/50 font-light text-sm pm-zone">
        <p>© 2026 Anchit Boruah. All Rights Reserved.</p>
        <p className="mt-2">Built with Next.js & Framer Motion in Google Antigravity.</p>
      </footer>
    </main>
  );
}