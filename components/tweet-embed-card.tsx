"use client"

import { useEffect, useRef } from "react"

// Declare Twitter widgets API on window
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement>
      }
    }
  }
}

const TWEET_ID = "1836349828218966327"
const TWEET_URL = `https://x.com/BitteProtocol/status/${TWEET_ID}`

export default function TweetEmbedCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const loadTwitterWidget = async () => {
      // Load Twitter widgets.js if not already loaded
      if (!window.twttr) {
        const script = document.createElement("script")
        script.src = "https://platform.twitter.com/widgets.js"
        script.async = true
        script.charset = "utf-8"
        document.body.appendChild(script)

        // Wait for script to load
        await new Promise<void>((resolve) => {
          script.onload = () => resolve()
        })
      }

      // Wait for twttr to be available
      const waitForTwitter = (): Promise<void> => {
        return new Promise((resolve) => {
          const check = () => {
            if (window.twttr?.widgets) {
              resolve()
            } else {
              setTimeout(check, 100)
            }
          }
          check()
        })
      }

      await waitForTwitter()

      // Create the tweet embed
      if (containerRef.current && window.twttr) {
        // Clear container first
        containerRef.current.innerHTML = ""
        
        await window.twttr.widgets.createTweet(TWEET_ID, containerRef.current, {
          theme: "light",
          dnt: true,
          width: 300,
        })
      }
    }

    loadTwitterWidget()
  }, [])

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ 
        width: "100%", 
        maxWidth: "300px",
        minHeight: "200px",
        borderRadius: 0,
      }}
    >
      {/* Container for Twitter embed */}
      <div 
        ref={containerRef} 
        className="twitter-embed-container"
        style={{ 
          width: "100%",
          borderRadius: 0,
        }}
      >
        {/* Fallback link while loading */}
        <div className="p-4 text-center">
          <a
            href={TWEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1d9bf0] hover:underline"
          >
            Loading tweet...
          </a>
        </div>
      </div>

      {/* Strip all borders and rounded corners from the Twitter embed */}
      <style jsx global>{`
        .twitter-embed-container {
          border-radius: 0 !important;
          border: none !important;
        }
        .twitter-embed-container .twitter-tweet {
          margin: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          border: none !important;
        }
        .twitter-embed-container iframe {
          border-radius: 0 !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .twitter-embed-container > div {
          margin: 0 !important;
          border-radius: 0 !important;
          border: none !important;
        }
        /* Target all nested elements */
        .twitter-embed-container * {
          border-radius: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  )
}
