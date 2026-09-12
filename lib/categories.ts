// The categories that have a shareable subpage at /[slug].
// "Product Development" is intentionally excluded: its floating button has
// no visible label and isn't meant to be a public, linkable section.
//
// Two different vocabularies exist for the same 5 categories:
// - `label` is what the floating buttons in the SPA gallery use
//   (components/portfolio.tsx).
// - `projectDataCategory` is what each project's own `category` field uses
//   in lib/projects-data.tsx, and doesn't always match `label` exactly
//   (e.g. "Furniture" vs "Furniture Design").
export const CATEGORIES = [
  { label: "Interior Installations", slug: "interior-installations", projectDataCategory: "Interior Architecture" },
  {
    label: "Visual Communication & Media",
    slug: "visual-communication-media",
    projectDataCategory: "Visual Communication & Media",
  },
  { label: "Furniture", slug: "furniture", projectDataCategory: "Furniture Design" },
  { label: "Lighting", slug: "lighting", projectDataCategory: "Lighting" },
  { label: "Objects & Systems", slug: "objects-systems", projectDataCategory: "Objects & Systems" },
] as const

export function categorySlugToLabel(slug: string): string | null {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? null
}

export function categoryLabelToSlug(label: string): string | null {
  return CATEGORIES.find((c) => c.label === label)?.slug ?? null
}

export function projectDataCategoryToSlug(category: string): string | null {
  return CATEGORIES.find((c) => c.projectDataCategory === category)?.slug ?? null
}
