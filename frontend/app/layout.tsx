import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "That Day Filter",
  description: "AI emotional photo diary service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}