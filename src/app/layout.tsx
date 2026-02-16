import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGS Travels — Travel with Confidence | International Travel Services",
  description:
    "UGS Travels is your trusted partner for international travel. Explore top destinations worldwide with expert visa assistance, flight booking, hotel reservations and personalized tour packages. Contact us on WhatsApp for instant support.",
  keywords: "travel agency, international travel, visa assistance, flight booking, hotel reservation, tour packages, UGS Travels",
  openGraph: {
    title: "UGS Travels — Travel with Confidence",
    description: "Your trusted partner for international travel. Explore destinations and connect on WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/hero-video.mp4" as="fetch" type="video/mp4" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
