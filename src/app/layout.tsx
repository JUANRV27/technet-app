import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Kdam_Thmor_Pro } from "next/font/google";
import Script from "next/script";

const kdam = Kdam_Thmor_Pro({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kdam",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechNet",
  description: "Conecta más allá de la tecnología",
  icons: {
    icon: "favicon.ico", // o .png si lo prefieres
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kdam.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
