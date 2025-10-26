import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

// Import Google Fonts
import { Great_Vibes, Cookie } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Define Google Fonts
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cookie",
});

export const metadata: Metadata = {
  title: "Chiranjeevi | Portfolio",
  description: "A futuristic, professional, and aesthetic personal portfolio showcasing innovation, precision, and creativity in digital engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${greatVibes.variable} ${cookie.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}