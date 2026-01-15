import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just Like Dad's Barbecue | Authentic Smoked BBQ Catering",
  description: "Low and slow. The way it's meant to be. Professional BBQ catering for weddings, corporate events, and private parties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
