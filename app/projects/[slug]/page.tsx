"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projectsData } from "@/lib/projects-data"

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  return (
    <div className="min-h-screen bg-background">
      {/* Image Carousel */}
      <div className="relative w-full h-[70vh] md:h-[80vh] bg-muted overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8">
          {project.images[currentImageIndex].isYouTube ? (
            <iframe
              src={project.images[currentImageIndex].src}
              className="w-full h-full object-contain max-w-7xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.images[currentImageIndex].isVideo ? (
            <video
              src={project.images[currentImageIndex].src}
              className="w-full h-full object-contain max-w-7xl"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          ) : (
            <Image
              src={project.images[currentImageIndex].src || "/placeholder.svg"}
              alt={project.images[currentImageIndex].alt}
              fill
              className="object-contain px-4 md:px-8"
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            />
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
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">{project.name}</h1>
          <p className="text-muted-foreground text-lg">{project.year}</p>
        </div>

        <div className="prose prose-neutral max-w-none">
          <p className="text-foreground leading-relaxed">{project.description}</p>
        </div>

        {project.blogUrl && (
          <div className="mt-8">
            <a
              href={project.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Read the Full Story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
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
    </div>
  )
}
