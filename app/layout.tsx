import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dasanda Closet — We Dress the Globe",
  description:
    "Modest fashionable wears and free styling tips. Promoting modesty and exuding power and confidence through clothing. Based in Ghana.",
  keywords: [
    "modest fashion",
    "Ghana fashion",
    "Dasanda Closet",
    "hijab fashion",
    "modest clothing",
    "made-to-fit",
  ],
  openGraph: {
    title: "Dasanda Closet — We Dress the Globe",
    description:
      "Modest fashionable wears and free styling tips from Ghana's premier modest fashion house.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}