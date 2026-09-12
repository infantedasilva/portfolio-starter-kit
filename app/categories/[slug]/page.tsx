"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Portfolio from "@/components/portfolio"
import { categorySlugToLabel } from "@/lib/categories"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categorySlugToLabel(slug)

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">Category not found</h1>
          <Link href="/" className="text-brand hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  return <Portfolio initialCategory={category} />
}
