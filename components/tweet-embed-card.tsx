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

function extractTweetId(tweetUrl: string): string {
  const clean = tweetUrl.split("?")[0]
  const parts = clean.split("/")
  return parts[parts.length - 1]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className="text-[#0f1a3c] shrink-0"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function TweetEmbedCard({ tweetUrl }: { tweetUrl: string }) {
  const [tweet, setTweet] = useState<TweetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const tweetId = extractTweetId(tweetUrl)
    fetch(`/api/tweet?id=${tweetId}`)
      .then((r) => {
        if (!r.ok) throw new Error("failed")
        return r.json()
      })
      .then((data) => {
        setTweet(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [tweetUrl])

  const baseStyle: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  }

  if (loading) {
    return (
      <div
        className="border border-[#e2e2e2] bg-white"
        style={baseStyle}
      >
        <div className="px-4 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 animate-pulse w-24" />
            <div className="h-3 bg-gray-100 animate-pulse w-16" />
          </div>
        </div>
        <div className="px-4 pb-5 space-y-2">
          <div className="h-3 bg-gray-100 animate-pulse w-full" />
          <div className="h-3 bg-gray-100 animate-pulse w-4/5" />
          <div className="h-3 bg-gray-100 animate-pulse w-3/5" />
        </div>
      </div>
    )
  }

  if (error || !tweet) {
    return (
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-[#e2e2e2] bg-white px-4 py-4 hover:bg-gray-50 transition-colors"
        style={baseStyle}
      >
        <span className="text-[13px] text-gray-400">View post on X</span>
        <XLogo />
      </a>
    )
  }

  const hasPhotos = tweet.photos && tweet.photos.length > 0
  const hasVideo = !!tweet.video

  return (
    <div className="border border-[#e2e2e2] bg-white" style={baseStyle}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        {tweet.user?.profile_image_url_https && (
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tweet.user.profile_image_url_https}
              alt={tweet.user.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[14px] font-bold text-[#0f1a3c] leading-tight truncate">
            {tweet.user?.name}
          </span>
          <span className="text-[13px] text-gray-400 leading-tight truncate">
            @{tweet.user?.screen_name}
          </span>
        </div>
        <XLogo />
      </div>

      {/* Tweet text */}
      <p className="px-4 pb-3 text-[14px] leading-[1.6] text-[#0f1a3c] whitespace-pre-wrap break-words">
        {tweet.text}
      </p>

      {/* Media */}
      {(hasPhotos || hasVideo) && (
        <div className="border-t border-[#e2e2e2]">
          {hasVideo && tweet.video?.poster && (
            <div className="relative w-full aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tweet.video.poster}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 bg-white/90 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-[#0f1a3c] ml-0.5"
                    aria-hidden="true"
                  >
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {hasPhotos && !hasVideo && (
            <>
              {tweet.photos!.length === 1 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tweet.photos![0].url}
                  alt="Tweet photo"
                  className="w-full object-cover block"
                />
              ) : (
                <div className="grid grid-cols-2" style={{ gap: "1px", background: "#e2e2e2" }}>
                  {tweet.photos!.map((photo, i) => (
                    <div key={i} className="aspect-square overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={`Tweet photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e2e2]">
        <span className="text-[12px] text-gray-400">
          {tweet.created_at ? formatDate(tweet.created_at) : ""}
        </span>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-gray-400 hover:text-[#0f1a3c] transition-colors"
        >
          View on X ↗
        </a>
      </div>
    </div>
  )
}
