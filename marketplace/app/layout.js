import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import './layout.css';
import Navigation from './components/Navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marketplace - Shop Verified Vendors",
  description: "Premium marketplace with verified vendors and approved orders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* link to load the icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
