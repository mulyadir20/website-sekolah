import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";

import { schoolAddress, site, siteDescription } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: siteDescription,
  applicationName: site.name,
  keywords: [
    "sekolah islam",
    "sekolah Islam terpadu",
    "tahfidz",
    "pendidikan islam",
    site.shortName,
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: siteDescription,
  },
};

/** Data terstruktur schema.org/School agar rich result terindeks mesin pencari. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: siteDescription,
    foundingDate: site.established,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolAddress.street,
      addressLocality: schoolAddress.city,
      postalCode: schoolAddress.postalCode,
      addressRegion: schoolAddress.province,
      addressCountry: schoolAddress.countryCode,
    },
    sameAs: [`https://wa.me/${site.whatsapp}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-950">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}