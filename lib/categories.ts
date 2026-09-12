// The categories that have a shareable subpage at /categories/[slug].
// "Product Development" is intentionally excluded: its floating button has
// no visible label and isn't meant to be a public, linkable section.
export const CATEGORIES = [
  { label: "Interior Installations", slug: "interior-installations" },
  { label: "Visual Communication & Media", slug: "visual-communication-media" },
  { label: "Furniture", slug: "furniture" },
  { label: "Lighting", slug: "lighting" },
  { label: "Objects & Systems", slug: "objects-systems" },
] as const

export function categorySlugToLabel(slug: string): string | null {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? null
}

export function categoryLabelToSlug(label: string): string | null {
  return CATEGORIES.find((c) => c.label === label)?.slug ?? null
}
