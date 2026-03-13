import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://luisinfante.com"),
  title: "Creative Strategist & Designer | Building Stories, Products & Objects",
  description:
    "Portfolio of a Creative Strategist & Designer with expertise in furniture design, AI marketing, and digital storytelling.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Luis Infante — Creative Strategist & Designer",
    description:
      "Portfolio of Luis Infante, Creative Strategist & Designer based in Lisbon.",
    url: "https://luisinfante.com",
    siteName: "Luis Infante Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luis Infante — Creative Strategist & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Infante — Creative Strategist & Designer",
    description:
      "Portfolio of Luis Infante, Creative Strategist & Designer based in Lisbon.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
