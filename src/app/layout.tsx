import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { ContextProvider } from "./context/ContextProvider";

const poppins = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  // display: "swap",
});

export const metadata: Metadata = {
  title: "Pokemon App",
  description:
    "Discover a world of Pokémon adventures with our immersive app. Catch, train, and battle Pokémon, explore diverse regions, and challenge other trainers. Join millions of fans worldwide in an epic journey to become the ultimate Pokémon Master. Download now and embark on your own Pokémon adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-primary antialiased font-sans", poppins.variable)}
      >
        <ContextProvider>
          <Toaster />
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
