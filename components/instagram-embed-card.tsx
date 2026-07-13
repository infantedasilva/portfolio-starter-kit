"use client"

import { useEffect, useRef } from "react"

// Declare Instagram embeds API on window
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: (element?: HTMLElement) => void
      }
    }
  }
}

export default function InstagramEmbedCard({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const processEmbed = () => {
      window.instgrm?.Embeds.process(containerRef.current ?? undefined)
    }

    if (window.instgrm) {
      processEmbed()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]')
    if (existingScript) {
      existingScript.addEventListener("load", processEmbed)
      return () => existingScript.removeEventListener("load", processEmbed)
    }

    const script = document.createElement("script")
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    script.onload = processEmbed
    document.body.appendChild(script)
  }, [url])

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "320px", minHeight: "200px" }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#fff", margin: 0, width: "100%" }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          Loading Instagram post…
        </a>
      </blockquote>
    </div>
  )
}
