import type { Metadata, Viewport } from "next";
import { Geist_Mono, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { jsonLdScript, localBusiness } from "@/lib/jsonld";
import { rootMetadata } from "@/lib/seo";

/* D4: Host Grotesk 400/500 for everything, Geist Mono 400 for eyebrows and
   specs. Suisse Int'l replaces Host Grotesk later via this one import. */
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-host",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#6556B8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} ${geistMono.variable}`}>
      <body>
        {/* Without JS the reveal components never run: show their end state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusiness()) }}
        />
        {children}
      </body>
    </html>
  );
}
