"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { projectsData } from "@/lib/projects-data"
import { projectDataCategoryToSlug } from "@/lib/categories"

// Projects now live at /[category]/[project] so their link matches where
// they actually sit in the site. Redirect any old /projects/[slug] link
// (in case one's already been shared) to that canonical URL.
export default function LegacyProjectRedirect() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    const project = projectsData[slug as keyof typeof projectsData]
    const categorySlug = project ? projectDataCategoryToSlug(project.category) : null
    router.replace(categorySlug ? `/${categorySlug}/${slug}` : "/")
  }, [slug, router])

  return null
}
