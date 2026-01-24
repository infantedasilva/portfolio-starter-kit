"use client"

import Link from "next/link"
import { useState } from "react"

interface Project {
  name: string
  year: string
  category: string
  slug: string
}

export default function ProjectsIndex() {
  const projects: Project[] = [
    // Furniture Design
    { name: "Mars Chair", year: "2017", category: "Furniture Design", slug: "Mars Chair" },
    { name: "Stone Soup", year: "2020", category: "Furniture Design", slug: "Stone Soup" },
    { name: "Tiles Table", year: "2020", category: "Furniture Design", slug: "Tiles Table" },
    { name: "Onio", year: "2016", category: "Furniture Design", slug: "Onio" },
    { name: "Glass Plates", year: "2020", category: "Furniture Design", slug: "Glass Plates" },
    { name: "Graf", year: "2017", category: "Furniture Design", slug: "Graf" },
    { name: "Calabashes", year: "2021", category: "Furniture Design", slug: "Calabashes" },
    { name: "Pool Guard", year: "2023", category: "Furniture Design", slug: "Pool Guard" },
    { name: "Pala Shelves", year: "2023", category: "Furniture Design", slug: "Pala Shelves" },
    { name: "Occulo", year: "2022", category: "Furniture Design", slug: "Occulo" },
    { name: "Rock Sofa", year: "2022", category: "Furniture Design", slug: "Rock Sofa" },
    { name: "Disk Shelves", year: "2023", category: "Furniture Design", slug: "Disk Shelves" },
    { name: "Nonu", year: "2021", category: "Furniture Design", slug: "Nonu" },

    // Interior Architecture
    { name: "Santos Play Room", year: "2023", category: "Interior Architecture", slug: "Santos Play Room" },
    { name: "MUDE", year: "2017", category: "Interior Architecture", slug: "MUDE" },
    { name: "Birre Kitchen", year: "2024", category: "Interior Architecture", slug: "Birre Kitchen" },

    // Visual Communication & Media
    { name: "Branca Lisboa", year: "2019", category: "Visual Communication & Media", slug: "Branca Lisboa" },
    {
      name: "Mintbase Interviews",
      year: "2022",
      category: "Visual Communication & Media",
      slug: "Mintbase Interviews",
    },
    { name: "A Vida Portuguesa", year: "2024", category: "Visual Communication & Media", slug: "A Vida Portuguesa" },
  ]

  const categories = Array.from(new Set(projects.map((p) => p.category))).sort()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const filteredProjects = activeFilter ? projects.filter((p) => p.category === activeFilter) : projects

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const yearDiff = Number.parseInt(b.year) - Number.parseInt(a.year)
    return sortOrder === "newest" ? yearDiff : -yearDiff
  })

  return (
    <main className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            A selection of work across furniture design, interior architecture, and visual communication.
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-1 text-xs md:text-sm font-light transition-all ${
                activeFilter === null
                  ? "text-brand border-b border-brand"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1 text-xs md:text-sm font-light transition-all whitespace-nowrap ${
                  activeFilter === category
                    ? "text-brand border-b border-brand"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="text-muted-foreground">Sort:</span>
            <button
              onClick={() => setSortOrder("newest")}
              className={`px-2 py-1 font-light transition-all ${
                sortOrder === "newest"
                  ? "text-brand border-b border-brand"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Newest
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => setSortOrder("oldest")}
              className={`px-2 py-1 font-light transition-all ${
                sortOrder === "oldest"
                  ? "text-brand border-b border-brand"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4 md:space-y-3">
          {sortedProjects.map((project, index) => (
            <div
              key={`${project.slug}-${index}`}
              className="group py-4 md:py-3 border-b border-border last:border-b-0 transition-all"
            >
              <Link href="/">
                <a className="block">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    {/* Project Name */}
                    <h2 className="text-base md:text-lg font-light text-foreground group-hover:text-brand transition-colors flex-1">
                      {project.name}
                    </h2>

                    {/* Category & Year */}
                    <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                      <span className="hidden sm:inline">{project.category}</span>
                      <span className="text-xs md:text-sm font-light">{project.year}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">No projects found in this category.</p>
          </div>
        )}

        {/* Project Count */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {sortedProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </main>
  )
}
