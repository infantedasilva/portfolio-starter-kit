// Server Component — no "use client" directive
// Fetches directly from the Twitter syndication endpoint at render time.
// Falls back to static data when the API is unavailable (503, rate-limited, etc.)

// ── Types ──────────────────────────────────────────────────────────────────

interface SyndicationUser {
  name?: string
  screen_name?: string
  profile_image_url_https?: string
}

interface SyndicationPhoto {
  url?: string
  width?: number
  height?: number
}

interface SyndicationVideo {
  poster?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawTweet = Record<string, any>

interface NormalisedTweet {
  text: string
  name: string
  screenName: string
  avatarUrl: string
  photos: { url: string }[]
  videoPoster: string | null
  createdAt: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const TWEET_ID = "1836349828218966327"
const SYNDICATION_URL = `https://cdn.syndication.twimg.com/tweet-result?id=${TWEET_ID}&lang=en`
const TWEET_URL = `https://x.com/BitteProtocol/status/${TWEET_ID}`

// Static fallback data for when the syndication API is unavailable (503, rate-limited, etc.)
// This ensures the card always renders with real content.
const STATIC_FALLBACK: NormalisedTweet = {
  text: "The Eleven Collection x @FKAtwigs\n\nBitte worked with @onchainvisions to build the AI agent powering The Eleven Collection, an on-chain art experience launching today.",
  name: "Bitte",
  screenName: "BitteProtocol",
  avatarUrl: "https://pbs.twimg.com/profile_images/1780635251233665024/Us8LLdmB_400x400.jpg",
  photos: [
    { url: "https://pbs.twimg.com/media/GX4V6hxXwAAnz1a?format=jpg&name=medium" }
  ],
  videoPoster: null,
  createdAt: "Sep 18, 2024",
}

// ── Normaliser ─────────────────────────────────────────────────────────────

function normalise(raw: RawTweet): NormalisedTweet | null {
  if (!raw || typeof raw !== "object") return null

  // Author — the syndication API puts author fields directly on `raw.user`
  const userObj: SyndicationUser =
    raw.user ??
    raw.author ??
    raw.core?.user_results?.result?.legacy ??
    {}

  const name: string = userObj.name ?? raw.name ?? ""
  const screenName: string = userObj.screen_name ?? raw.screen_name ?? ""
  const avatarUrl: string = userObj.profile_image_url_https ?? raw.profile_image_url_https ?? ""

  // Text
  const text: string = raw.text ?? raw.full_text ?? raw.legacy?.full_text ?? ""

  // Photos
  const rawPhotos: SyndicationPhoto[] = Array.isArray(raw.photos) ? raw.photos : []
  const photos = rawPhotos
    .filter((p) => typeof p?.url === "string")
    .map((p) => ({ url: p.url as string }))

  // Video poster
  const videoObj: SyndicationVideo | null =
    raw.video ?? raw.extended_entities?.media?.[0] ?? null
  const videoPoster: string | null =
    typeof videoObj?.poster === "string" ? videoObj.poster : null

  // Date
  const createdAt: string = raw.created_at ?? raw.legacy?.created_at ?? ""

  // Require at minimum some text or a name to consider this valid
  if (!text && !name) return null

  return { text, name, screenName, avatarUrl, photos, videoPoster, createdAt }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  try {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

// ── X Logo SVG ─────────────────────────────────────────────────────────────

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[17px] h-[17px] shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ── Tweet Card UI ──────────────────────────────────────────────────────────

function TweetCardUI({ tweet }: { tweet: NormalisedTweet }) {
  const { text, name, screenName, avatarUrl, photos, videoPoster, createdAt } = tweet
  const hasVideo = !!videoPoster
  const hasMedia = photos.length > 0 || hasVideo

  return (
    <div
      className="bg-white border border-[#e2e2e2] overflow-hidden"
      style={{ width: "100%", fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" aria-hidden="true" />
        )}

        <div className="flex-1 min-w-0">
          {name && (
            <p className="text-[14px] font-semibold text-[#0f172a] leading-tight truncate">
              {name}
            </p>
          )}
          {screenName && (
            <p className="text-[12px] text-[#6b7280] leading-tight truncate">
              @{screenName}
            </p>
          )}
        </div>

        <span className="text-black">
          <XLogo />
        </span>
      </div>

      {/* Tweet text */}
      {text && (
        <p
          className="px-4 pb-3 text-[13px] text-[#0f172a] whitespace-pre-line"
          style={{ lineHeight: "1.55" }}
        >
          {text}
        </p>
      )}

      {/* Media */}
      {hasMedia && (
        <div className="border-t border-[#e2e2e2]">
          {hasVideo && videoPoster ? (
            <div className="relative w-full aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoPoster}
                alt="Video thumbnail"
                className="w-full h-full object-cover block"
                loading="eager"
                style={{ borderRadius: 0 }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#0f172a] ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : photos.length === 1 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photos[0].url}
              alt="Tweet media"
              className="w-full object-cover block"
              loading="eager"
              style={{ borderRadius: 0 }}
            />
          ) : (
            <div className="grid grid-cols-2 gap-px bg-[#e2e2e2]">
              {photos.slice(0, 4).map((photo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={photo.url}
                  alt={`Tweet media ${i + 1}`}
                  className="w-full h-[100px] object-cover block"
                  loading="eager"
                  style={{ borderRadius: 0 }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e2e2]">
        <span className="text-[11px] text-[#6b7280]">{formatDate(createdAt)}</span>
        <a
          href={TWEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#6b7280] hover:text-[#0f172a] transition-colors"
          style={{ textDecoration: "none" }}
          aria-label="View original post on X"
        >
          View on X ↗
        </a>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default async function TweetEmbedCard() {
  let tweet: NormalisedTweet | null = null

  try {
    const res = await fetch(SYNDICATION_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    })

    if (res.ok) {
      const raw: RawTweet = await res.json()
      tweet = normalise(raw)
    }
  } catch {
    // Network error — fall through to static fallback
  }

  // Use static fallback when API fails or returns unusable data
  const tweetData = tweet ?? STATIC_FALLBACK

  return <TweetCardUI tweet={tweetData} />
}
