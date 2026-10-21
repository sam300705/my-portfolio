import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import CreativeMotion from "@/components/CreativeMotion";
import { MotionEnhancements, MotionToggle } from "@/components/Motion";
import "./globals.scss";
const manrope = localFont({
  src: "../public/assets/fonts/manrope-latin.woff",
  display: "swap",
  weight: "200 800",
  variable: "--font-body",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://sambhavcodes.in"),
  title: {
    default: "Kumar Sambhav — Software with intent",
    template: "%s · Kumar Sambhav",
  },
  description:
    "Kumar Sambhav is a CSIT student graduating in 2027, building practical web applications and learning through real engineering projects.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kumar Sambhav",
    title: "Kumar Sambhav — Software with intent",
    description:
      "Practical software. Considered decisions. Selected projects, engineering stories, and a learning journey.",
    images: [
      {
        url: "/assets/og-card.png",
        width: 1200,
        height: 630,
        alt: "Kumar Sambhav software engineering portfolio",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/favicon.svg" },
  manifest: "/site.webmanifest",
};
export const viewport: Viewport = {
  themeColor: "#141a17",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <noscript>
          <style>{`@media(max-width:800px){.nav{height:auto;flex-wrap:wrap;padding-block:16px}.navigation{position:static;visibility:visible;max-height:none;flex-direction:row;flex-wrap:wrap;flex-basis:100%;padding:0;gap:8px 20px;border:0}.navigation>a{font-size:11px}.menu-button{display:none}}.copy-button,.motion-toggle,.comparison input,.comparison label,[role=tablist]{display:none!important}`}</style>
        </noscript>
        {children}
        <MotionToggle />
        <MotionEnhancements />
        <CreativeMotion />
      </body>
    </html>
  );
}
