import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rêveur | DAO Duy Manh Ha — AI Engineer",
  description:
    "Portfolio of DAO Duy Manh Ha (Rêveur) — AI Engineer & ML Researcher at eUp Technology, Master in AI at QUT. Computer Vision, NLP, Deep Learning, and the cosmos.",
  keywords: ["AI Engineer", "Machine Learning", "Computer Vision", "Deep Learning", "portfolio", "astronomy", "Python", "PyTorch"],
  authors: [{ name: "DAO Duy Manh Ha", url: "https://github.com/r1verrdao" }],
  openGraph: {
    title: "Rêveur | DAO Duy Manh Ha",
    description: "AI Engineer & Astronomer — Exploring intelligence and the cosmos.",
    type: "website",
    url: "https://r1verrdao.id.vn/",
    images: [
      {
        url: "/thumbnail.png",
        width: 1920,
        height: 1022,
        alt: "Rêveur Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAO Duy Manh Ha | Homepage ",
    description: "River's Portfolio",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
