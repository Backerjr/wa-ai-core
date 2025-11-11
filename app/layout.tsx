import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/providers/app-providers";
import { CommandCenter } from "@/components/core/command-center";
import { CommandFab } from "@/components/core/command-fab";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"]
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Next-Gen AI Education Platform",
  description:
    "Teacher, manager, and student experiences unified by an AI Command Center."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[var(--color-bg)]">
      <body className={cn(inter.variable, playfair.variable, outfit.variable)}>
        <a className="skip-link" href="#content">
          Skip to main content
        </a>
        <AppProviders>
          {children}
          <CommandCenter />
          <CommandFab />
        </AppProviders>
      </body>
    </html>
  );
}
