import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "A modern, animated portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
      <body className={`${inter.variable} ${poppins.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}