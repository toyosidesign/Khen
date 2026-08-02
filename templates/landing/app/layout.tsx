import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Template Platform — Landing",
  description:
    "A Next.js landing template built on the @tp shared design system (tokens + ui + config).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
