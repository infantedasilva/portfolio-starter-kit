"use client"

import { useEffect, useState } from "react"

// ── Types ─────────────────────────────────────────────────────────────────────
// The Twitter/X syndication API has changed its schema over time.
// We normalise whatever shape comes back into this flat structure.
interface NormalizedTweet {
  name: string
  screenName: string
  avatar: string
  text: string
  photos: string[]
  videoPoster: string | null
  createdAt: string
  tweetUrl: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return ""
  }
}

/**
 * Normalise the raw syndication API payload into a flat, safe structure.
 * Handles both the old shape (top-level `user` object) and newer shapes
 * where author data lives elsewhere or is missing entirely.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalise(raw: any, fallbackUrl: string): NormalizedTweet | null {
  if (!raw || typeof raw !== "object") return null

  // ── Author ─────────────────────────────────────────────────────────────────
  // Try every known location for author data
  const user =
    raw.user ??                                    // old syndication shape
    raw.core?.user_results?.result?.legacy ??      // newer GraphQL shape
    raw.author ??                                  // possible future shape
    null

  const name: string =
    user?.name ??
    raw.name ??
    "Unknown"

  const screenName: string =
    user?.screen_name ??
    user?.screenName ??
    raw.screen_name ??
    raw.screenName ??
    "unknown"

  const avatar: string =
    user?.profile_image_url_https ??
    user?.profile_image_url ??
    raw.profile_image_url_https ??
    ""

  // ── Text ───────────────────────────────────────────────────────────────────
  const text: string =
    raw.text ??
    raw.full_text ??
    raw.legacy?.full_text ??
    ""

  // ── Media ──────────────────────────────────────────────────────────────────
  // photos array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawPhotos: any[] = Array.isArray(raw.photos) ? raw.photos : []
  const photos: string[] = rawPhotos
    .map((p) => p?.url ?? p?.media_url_https ?? p?.src ?? "")
    .filter(Boolean)

  // video poster
  const videoPoster: string | null =
    raw.video?.poster ??
    raw.video?.thumbnail?.url ??
    null

  // ── Date ───────────────────────────────────────────────────────────────────
  const createdAt: string =
    raw.created_at ??
    raw.legacy?.created_at ??
    ""

  return { name, screenName, avatar, text, photos, videoPoster, createdAt, tweetUrl: fallbackUrl }
}

// ── Component ─────────────────────────────────────────────────────────────────
interface TweetEmbedCardProps {
  tweetUrl: string
}

export default function TweetEmbedCard({ tweetUrl }: TweetEmbedCardProps) {
  const [tweet, setTweet] = useState<NormalizedTweet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Extract tweet ID from the URL
    let id: string | null = null
    try {
      const parts = new URL(tweetUrl).pathname.split("/").filter(Boolean)
      id = parts[parts.length - 1] ?? null
    } catch {
      // tweetUrl might already be an ID string
      if (/^\d+$/.test(tweetUrl)) id = tweetUrl
    }

    if (!id) {
      setError(true)
      setLoading(false)
      return
    }

    fetch(`/api/tweet?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((raw) => {
        if (raw?.error) throw new Error(raw.error)
        const normalized = normalise(raw, tweetUrl)
        if (!normalized) throw new Error("empty payload")
        setTweet(normalized)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [tweetUrl])

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="bg-white border border-[#e2e2e2] overflow-hidden"
        style={{ width: "100%", fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0 animate-pulse" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-4 pb-3 space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-4/6 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-32 bg-gray-50 animate-pulse border-t border-[#e2e2e2]" />
        <div className="px-4 py-3 flex justify-between border-t border-[#e2e2e2]">
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  // ── Error / fallback ──────────────────────────────────────────────────────
  if (error || !tweet) {
    return (
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-white border border-[#e2e2e2] px-4 py-3 hover:bg-gray-50 transition-colors"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-[13px] text-[#6b7280]">View post on X</span>
        </div>
        <span className="text-[12px] text-[#6b7280]">↗</span>
      </a>
    )
  }

  const hasMedia = tweet.photos.length > 0 || tweet.videoPoster !== null

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="bg-white border border-[#e2e2e2] overflow-hidden"
      style={{ width: "100%", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        {tweet.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tweet.avatar}
            alt={tweet.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#0f1a3c] leading-tight truncate">{tweet.name}</p>
          <p className="text-[13px] text-[#6b7280] leading-tight truncate">@{tweet.screenName}</p>
        </div>
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] shrink-0 text-black"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Tweet text */}
      {tweet.text && (
        <p
          className="px-4 pb-3 text-[14px] text-[#0f1a3c]"
          style={{ lineHeight: "1.6" }}
        >
          {tweet.text}
        </p>
      )}

      {/* Media */}
      {hasMedia && (
        <div className="border-t border-[#e2e2e2]">
          {tweet.videoPoster ? (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tweet.videoPoster}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0f1a3c] ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : tweet.photos.length === 1 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tweet.photos[0]}
              alt="Tweet media"
              className="w-full object-cover block"
              style={{ maxHeight: "220px" }}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="grid grid-cols-2" style={{ gap: "1px", background: "#e2e2e2" }}>
              {tweet.photos.slice(0, 4).map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`Tweet media ${i + 1}`}
                  className="w-full object-cover block"
                  style={{ maxHeight: "120px" }}
                  crossOrigin="anonymous"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e2e2]">
        <span className="text-[12px] text-[#6b7280]">{formatDate(tweet.createdAt)}</span>
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
