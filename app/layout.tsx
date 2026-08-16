import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KupiDom — агентство недвижимости в Ташкенте",
  description:
    "KupiDom — агентство недвижимости в Ташкенте. Поможем купить, продать, снять или сдать квартиру, дом, участок и коммерческую недвижимость. Консультация и полное сопровождение сделок.",
  keywords: [
    "агентство недвижимости Ташкент",
    "купить квартиру Ташкент",
    "продать квартиру Ташкент",
    "аренда квартиры Ташкент",
    "купить дом Ташкент",
    "купить участок Ташкент",
    "коммерческая недвижимость Ташкент",
    "новостройки Ташкент",
    "KupiDom",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}