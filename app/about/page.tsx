"use client"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <nav className="px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>

            <Image
              src="/luis-signature-new.png"
              alt="Luis Infante"
              width={200}
              height={48}
              className="h-12 w-auto"
              quality={85}
            />
          </div>
        </div>
      </nav>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Quote about Luis */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground max-w-3xl">
              "For Creative Strategist Luis Infante, bridging the physical and digital worlds is not only a question of
              creating meaningful connections but also maintaining a human-centered approach to design. Treading a fine
              line between traditional craftsmanship and modern technology, the talented designer is able to
              reinvigorate design practices while taking user experience to new heights. Luis implements both his
              foundational training in design strategy and the latest digital tools to demonstrate how this hybrid
              approach creates lasting impact."
            </p>
            <p className="text-muted-foreground font-medium">Maria Rodriguez, Design Director</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <p className="text-foreground">
              Say hello:
              <br />
              <a href="mailto:hello@luisinfante.com" className="text-brand hover:underline">
                hello@luisinfante.com
              </a>
            </p>

            <p className="text-foreground">
              instagram:{" "}
              <a
                href="https://instagram.com/luisinfante"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                @luisinfante
              </a>
            </p>

            <p className="text-muted-foreground text-sm">currently available for new projects</p>
          </div>

          {/* Copyright and Credits */}
          <div className="pt-12 border-t border-border space-y-2 text-sm text-muted-foreground">
            <p>This website and all its content are owned by Luis Infante ©2025</p>

            <p>
              credits:
              <br />
              Design & Development: Luis Infante
              <br />
              Built with Next.js and Tailwind CSS
            </p>
          </div>

          {/* Navigation Links */}
          <div className="pt-8">
            <div className="flex space-x-6 text-foreground">
              <Link href="/" className="hover:text-brand transition-colors">
                Projects
              </Link>
              <Link href="/about" className="text-brand">
                About
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
