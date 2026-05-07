"use client"

import { useEffect, useState } from "react"

interface TweetUser {
  name: string
  screen_name: string
  profile_image_url_https: string
}

interface TweetPhoto {
  url: string
  width: number
  height: number
}

interface TweetVideo {
  poster: string
}

interface TweetData {
  text: string
  user: TweetUser
  photos?: TweetPhoto[]
  video?: TweetVideo
  created_at: string
  favorite_count?: number
  retweet_count?: number
}

interface TweetEmbedCardProps {
  tweetUrl: string
}

function extractTweetId(url: string): string | null {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean)
    return parts[parts.length - 1] || null
  } catch {
    return null
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export default function TweetEmbedCard({ tweetUrl }: TweetEmbedCardProps) {
  const [tweet, setTweet] = useState<TweetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const id = extractTweetId(tweetUrl)
    if (!id) {
      setError(true)
      setLoading(false)
      return
    }

    fetch(`/api/tweet?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed")
        return res.json()
      })
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setTweet(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [tweetUrl])

  // Loading skeleton — matches the card's proportions
  if (loading) {
    return (
      <div
        className="bg-white border border-[#e2e2e2] overflow-hidden"
        style={{ width: "100%", fontFamily: "system-ui, sans-serif" }}
      >
        {/* header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0 animate-pulse" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        {/* body */}
        <div className="px-4 pb-3 space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-4/6 bg-gray-100 rounded animate-pulse" />
        </div>
        {/* media placeholder */}
        <div className="h-32 bg-gray-50 animate-pulse border-t border-[#e2e2e2]" />
        {/* footer */}
        <div className="px-4 py-3 flex justify-between border-t border-[#e2e2e2]">
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  // Error — minimal fallback that still links to the post
  if (error || !tweet) {
    return (
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-white border border-[#e2e2e2] px-4 py-3 hover:bg-gray-50 transition-colors"
        style={{ fontFamily: "system-ui, sans-serif" }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {/* X logo */}
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-[13px] text-[#6b7280]">View post on X</span>
        </div>
        <span className="text-[12px] text-[#6b7280]">↗</span>
      </a>
    )
  }

  const photos = tweet.photos ?? []
  const hasVideo = !!tweet.video
  const hasMedia = photos.length > 0 || hasVideo

  return (
    <div
      className="bg-white border border-[#e2e2e2] overflow-hidden"
      style={{ width: "100%", fontFamily: "system-ui, sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        {/* Avatar — the only element with border-radius */}
        {tweet.user.profile_image_url_https ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tweet.user.profile_image_url_https}
            alt={tweet.user.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#0f1a3c] leading-tight truncate">{tweet.user.name}</p>
          <p className="text-[13px] text-[#6b7280] leading-tight truncate">@{tweet.user.screen_name}</p>
        </div>

        {/* X logo — right-aligned */}
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] shrink-0 text-black"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* ── Tweet text ── */}
      <p
        className="px-4 pb-3 text-[14px] text-[#0f1a3c]"
        style={{ lineHeight: "1.6" }}
      >
        {tweet.text}
      </p>

      {/* ── Media ── */}
      {hasMedia && (
        <div className="border-t border-[#e2e2e2]">
          {hasVideo && tweet.video ? (
            /* Video: thumbnail + centered play icon */
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tweet.video.poster}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0f1a3c] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : photos.length === 1 ? (
            /* Single photo */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photos[0].url}
              alt="Tweet media"
              className="w-full object-cover"
              style={{ display: "block", maxHeight: "200px" }}
              crossOrigin="anonymous"
            />
          ) : (
            /* Multiple photos: 2-column grid, 1px gap */
            <div
              className="grid grid-cols-2"
              style={{ gap: "1px", background: "#e2e2e2" }}
            >
              {photos.slice(0, 4).map((photo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={photo.url}
                  alt={`Tweet media ${i + 1}`}
                  className="w-full object-cover"
                  style={{ display: "block", maxHeight: "120px" }}
                  crossOrigin="anonymous"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e2e2]">
        <span className="text-[12px] text-[#6b7280]">{formatDate(tweet.created_at)}</span>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#6b7280] hover:text-[#0f1a3c] transition-colors"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          aria-label="View original post on X"
        >
          View on X ↗
        </a>
      </div>
    </div>
  )
}
