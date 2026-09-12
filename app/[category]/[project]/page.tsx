"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import ProjectDetail from "@/components/project-detail"
import { projectsData } from "@/lib/projects-data"
import { categorySlugToLabel, projectDataCategoryToSlug } from "@/lib/categories"

export default function CategoryProjectPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const projectSlug = params.project as string

  const project = projectsData[projectSlug as keyof typeof projectsData]
  const categoryLabel = categorySlugToLabel(categorySlug)
  const belongsToCategory = project && projectDataCategoryToSlug(project.category) === categorySlug

  if (!categoryLabel || !belongsToCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">Project not found</h1>
          <Link href="/" className="text-brand hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  return <ProjectDetail slug={projectSlug} backHref={`/${categorySlug}`} />
}
