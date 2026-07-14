"use client"

import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projectsData } from "@/lib/projects-data"

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const lightboxScrollRef = useRef<HTMLDivElement | null>(null)
  const lightboxScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false)
    }
    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isLightboxOpen])

  // Jump the scroll strip to the opened slide instantly (no animation) once
  // the lightbox has mounted with its images.
  useEffect(() => {
    if (!isLightboxOpen) return
    const container = lightboxScrollRef.current
    if (!container) return
    container.scrollLeft = lightboxIndex * container.clientWidth
  }, [isLightboxOpen])

  const project = projectsData[slug as keyof typeof projectsData]

  if (!project) {
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = project.images[currentImageIndex]

  // The lightbox only swipes between plain images (video/YouTube slides
  // can't render inside it), so it keeps its own filtered index and syncs
  // the main carousel back to the matching slide as you swipe.
  const lightboxSlides = project.images.filter((img) => !img.isYouTube && !img.isVideo)

  const openLightbox = () => {
    const idx = lightboxSlides.findIndex((img) => img === currentImage)
    setLightboxIndex(idx >= 0 ? idx : 0)
    setIsLightboxOpen(true)
  }

  const handleLightboxScroll = () => {
    const container = lightboxScrollRef.current
    if (!container) return
    if (lightboxScrollTimeoutRef.current) clearTimeout(lightboxScrollTimeoutRef.current)
    lightboxScrollTimeoutRef.current = setTimeout(() => {
      const newIndex = Math.round(container.scrollLeft / container.clientWidth)
      setLightboxIndex((prev) => {
        if (newIndex === prev) return prev
        const originalIndex = project.images.indexOf(lightboxSlides[newIndex])
        if (originalIndex >= 0) setCurrentImageIndex(originalIndex)
        return newIndex
      })
    }, 100)
  }

  return (
    <div className="flex flex-col h-[100dvh] md:block md:h-auto md:min-h-screen bg-background">
      {/* Mobile-only header */}
      <div className="md:hidden shrink-0 flex flex-col items-center gap-2 px-6 pt-5 pb-3">
        <Link href="/" aria-label="Back to homepage">
          <Image
            src="/images/new-20logo.png"
            alt="Luis Infante"
            width={200}
            height={80}
            priority
            quality={90}
            className="h-12 w-auto cursor-pointer"
            sizes="120px"
          />
        </Link>
        <div className="px-3 py-1 text-sm rounded-full whitespace-nowrap border text-brand border-brand font-medium">
          Creative Strategist & Designer
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full bg-muted overflow-hidden flex-[1.6] min-h-0 md:flex-none md:h-[200vh]">
        <div className="relative w-full h-full flex items-center justify-center">
          {project.images[currentImageIndex].isYouTube ? (
            <iframe
              src={project.images[currentImageIndex].src}
              className="w-full h-full object-contain"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.images[currentImageIndex].isVideo ? (
            <video
              src={project.images[currentImageIndex].src}
              className="w-full h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          ) : (
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              className="object-contain"
              quality={95}
              unoptimized={currentImage.src?.endsWith(".gif")}
              sizes="100vw"
            />
          )}

          {!currentImage.isYouTube && !currentImage.isVideo && (
            <button
              onClick={openLightbox}
              className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              aria-label="Expand image"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation Arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {project.images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-foreground w-6" : "bg-foreground/30"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="flex-1 min-h-0 overflow-y-auto md:flex-none md:overflow-visible w-full max-w-2xl mx-auto px-6 py-4 md:py-12 pb-24 md:pb-12">
        <div className="mb-3 md:mb-8">
          <h1 className="text-xl md:text-3xl font-medium text-foreground mb-0.5 md:mb-2 text-balance">
            {project.name}
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg">{project.year}</p>
        </div>

        <div className="prose prose-neutral max-w-none">
          <p className="text-xs leading-relaxed md:text-base text-foreground md:leading-relaxed text-pretty">
            {project.description}
          </p>
        </div>

        {project.blogUrl && (
          <div className="mt-4 md:mt-8">
            <a
              href={project.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-lg hover:shadow-xl transition-all border border-border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              <span className="text-sm font-medium text-foreground">Read the Full Story</span>
            </a>
          </div>
        )}
      </div>

      {/* Back Button - Use Link for proper navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-lg hover:shadow-xl transition-all border border-border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm font-medium text-foreground">Back</span>
        </Link>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-background/80"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-image"
        >
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-lg border border-border"
              aria-label="Close lightbox"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Native horizontal scroll-snap strip so swiping between images is a
              real, visible scroll (with momentum) instead of an instant swap. */}
          <div
            ref={lightboxScrollRef}
            onScroll={handleLightboxScroll}
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {lightboxSlides.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={1920}
                  height={1080}
                  quality={95}
                  unoptimized={img.src?.endsWith(".gif")}
                  className="w-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  sizes="95vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
