import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineRate - Movie Rating System",
  description: "Explore movies, view ratings, and submit reviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-stone-50 text-stone-800 antialiased">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between`}>
        <div>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}