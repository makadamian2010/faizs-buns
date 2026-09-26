import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faiz’s Buns | Fresh Grilled Event Experiences",
  description: "Student-led event catering with fresh grilled food, drinks, and memorable community experiences.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
