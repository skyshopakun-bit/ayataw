import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Generator Hub",
  description: "Unified interface for AI-powered video and image generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
