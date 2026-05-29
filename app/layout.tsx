import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gwags Global Impact Institution",
  description:
    "Empowering communities worldwide through education, health, and youth development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      <body style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>{children}</body>
    </html>
  );
}
