import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just Like Dad's BBQ",
  description: "Premium BBQ catering for your events",
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
