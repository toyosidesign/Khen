import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khen — Beautiful analytics to grow smarter",
  description:
    "Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Built on the @tp shared design system.",
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
