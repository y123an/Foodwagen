import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import RestaurantFooter from "@/components/RestaurantFooter";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import RestaurantNavbar from "@/components/RestaurantNavbar";
import { ToastProvider } from "@/lib/context/ToastContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FoodWagen",
    template: "%s | FoodWagen",
  },
  description:
    "Discover, add, and explore delicious meals from your favorite restaurants on FoodWagen.",
  keywords: [
    "FoodWagen",
    "food",
    "restaurant",
    "meals",
    "delivery",
    "pickup",
    "menu",
  ],
  applicationName: "FoodWagen",
  authors: [{ name: "FoodWagen" }],
  creator: "FoodWagen",
  publisher: "FoodWagen",
  openGraph: {
    title: "FoodWagen",
    description:
      "Discover, add, and explore delicious meals from your favorite restaurants on FoodWagen.",
    url: "/",
    siteName: "FoodWagen",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "FoodWagen logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodWagen",
    description:
      "Discover, add, and explore delicious meals from your favorite restaurants on FoodWagen.",
  images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },
  alternates: {
    canonical: "/",
  },
  category: "Food & Drink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FoodWagen",
    url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
    sameAs: [] as string[],
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSans.variable} antialiased`}
      >
        <ReduxProvider>
          <ToastProvider>
            <RestaurantNavbar />
            {children}
            <RestaurantFooter />
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
