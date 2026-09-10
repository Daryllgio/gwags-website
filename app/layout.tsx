import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading-serif",
});

export const metadata: Metadata = {
  title: "Gwags Global Impact Institution",
  description:
    "Empowering communities worldwide through education, health, and youth development.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSerif4.variable} style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      <body style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>{children}</body>
    </html>
  );
}
