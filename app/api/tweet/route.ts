import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid tweet id" }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) {
      return NextResponse.json({ error: "Tweet not found" }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to fetch tweet" }, { status: 500 })
  }
}
