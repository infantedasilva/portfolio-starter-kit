import { NextRequest, NextResponse } from "next/server"

export const revalidate = 3600 // cache for 1 hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing tweet id" }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch tweet" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 500 })
  }
}
