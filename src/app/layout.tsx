import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Vercel sets this in production; locally the OG image resolves against the dev server.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3002"
  ),
  title: "Anchit Boruah | Product Manager, AI & Automation",
  description: "Anchit Boruah, Senior Product Manager & Analyst at WPP Media, Bengaluru. Leads automation and AI products end to end, from discovery and execution to tracking and delivery, and builds AI products hands-on.",
  openGraph: {
    title: "Anchit Boruah | Product Manager, AI & Automation",
    description: "Anchit Boruah, Senior Product Manager & Analyst at WPP Media, Bengaluru. Leads automation and AI products end to end, from discovery and execution to tracking and delivery, and builds AI products hands-on.",
    images: [{ url: "/hero/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Anchit Boruah | Product Manager, AI & Automation", description: "Anchit Boruah, Senior Product Manager & Analyst at WPP Media, Bengaluru. Leads automation and AI products end to end, from discovery and execution to tracking and delivery, and builds AI products hands-on.", images: ["/hero/og.jpg"] },
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll />
          <Cursor />
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
