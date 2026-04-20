import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anchit Boruah | Portfolio",
  description: "Anchit's high-end personal portfolio featuring his Career Journey, Case studies & Projects.",
  icons: {
    icon: [
      { url: "/favicon-hero.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-hero.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-hero.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-hero.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon-hero.png",
    shortcut: "/favicon-hero.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ServiceWorkerRegistrar />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}