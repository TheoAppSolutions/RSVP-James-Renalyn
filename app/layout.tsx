import type { Metadata } from "next";
import localFont from "next/font/local";
import { EVENT } from "@/lib/event";
import "./globals.css";

const serif = localFont({ src: "../fonts/cormorant-garamond-latin.woff2", weight: "300 600", variable: "--font-serif" });
const sans = localFont({ src: "../fonts/jost-latin.woff2", weight: "300 500", variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${EVENT.honoree} — Wedding RSVP`,
  description: `Celebrate with ${EVENT.honoree} on ${EVENT.dateFooter} at ${EVENT.venue.name}, ${EVENT.venue.address}. RSVP by ${EVENT.rsvpDeadline}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
