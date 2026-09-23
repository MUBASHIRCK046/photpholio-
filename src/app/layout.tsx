import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mubashir CK — Liquid Portfolio | AI · Cybersecurity · Digital Systems",
  description:
    "Immersive liquid-glass portfolio of Mubashir CK — IT professional passionate about AI, cybersecurity, and digital marketing. Based in Fujairah, UAE.",
  keywords: [
    "Mubashir CK",
    "Portfolio",
    "AI",
    "Cybersecurity",
    "Digital Marketing",
    "WebGL",
    "Liquid Glass",
    "Fujairah",
    "UAE",
  ],
  authors: [{ name: "Mubashir CK" }],
  openGraph: {
    title: "Mubashir CK — Liquid Portfolio",
    description: "AI · Cybersecurity · Digital Marketing — Fujairah, UAE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir CK — Liquid Portfolio",
    description: "AI · Cybersecurity · Digital Marketing — Fujairah, UAE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster />
        <SonnerToaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(40px) saturate(220%)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#f8fafc",
            },
          }}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
