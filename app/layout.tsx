// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nikodem Pankiewicz",
  description: "Personal site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
