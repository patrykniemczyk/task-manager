import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Smarter Task Manager",
  description: "A simple task manager app",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased dark min-h-screen  magicpattern`}
      >
        <Provider>
          <main className="w-4xl ml-auto mr-auto mb-30">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
