"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import TweetEmbedCard from "@/components/tweet-embed-card"

const projectNameToSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false)

  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [clickedButton, setClickedButton] = useState<string | null>(null)
  const [showAboutMe, setShowAboutMe] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

  const [isVideoPlaying, setIsVideoPlaying] = useState<{ [key: number]: boolean }>({})
  const [isInteractingWithVideo, setIsInteractingWithVideo] = useState<{ [key: number]: boolean }>({})

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const [draggedImage, setDraggedImage] = useState<number | null>(null)
  const draggedImageRef = useRef<number | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  const [imageZIndices, setImageZIndices] = useState<number[]>([])
  const maxZIndexRef = useRef(100)

  // Mobile filter state
  const [mobileFilterCategory, setMobileFilterCategory] = useState<string>("All")

  const homepagePositions = [
    { top: "10%", left: "15%" },
    { top: "15%", left: "65%" },
    { top: "45%", left: "10%" },
    { top: "45%", left: "70%" },
    { top: "70%", left: "20%" },
    { top: "70%", left: "60%" },
    { top: "25%", left: "40%" },
    { top: "55%", left: "45%" },
    { top: "35%", left: "75%" },
    { top: "65%", left: "15%" },
    { top: "75%", left: "70%" },
  ]

  const projectPositions = [
    { top: "5%", left: "15%" }, // Left side, top
    { top: "12%", left: "75%" }, // Right side, top
    { top: "20%", left: "10%" }, // Left side
    { top: "35%", left: "80%" }, // Right side
    { top: "45%", left: "20%" }, // Left side
    { top: "55%", left: "75%" }, // Right side
    { top: "65%", left: "15%" }, // Left side
    { top: "75%", left: "70%" }, // Right side, bottom
    { top: "30%", left: "85%" }, // Far right
    { top: "50%", left: "8%" }, // Far left
    { top: "80%", left: "25%" }, // Left side, bottom
  ]

  const projectPagePositions = [
    { top: "5%", left: "55%" },
    { top: "15%", left: "70%" },
    { top: "25%", left: "60%" },
    { top: "35%", left: "75%" },
    { top: "45%", left: "65%" },
    { top: "55%", left: "80%" },
    { top: "65%", left: "58%" },
    { top: "75%", left: "72%" },
    { top: "10%", left: "85%" },
    { top: "50%", left: "68%" },
    { top: "80%", left: "62%" },
  ]

  const [imagePositions, setImagePositions] = useState(homepagePositions)

  useEffect(() => {
    if (selectedProject) {
      setImagePositions(projectPagePositions)
    } else if (clickedButton) {
      setImagePositions(projectPositions)
    } else {
      setImagePositions(homepagePositions)
    }
  }, [selectedProject, clickedButton])

  const marsChairProject = {
    name: "Mars Chair",
    year: "2017",
    description:
      "This chair was born by mistake during a research at Branca Lisboa studio for an armchair for a hospital office. Is the reflection that when we are in search of an answer to design problems, we discover other pleasures and relevances from which we want to give life and we develop them in the background. Materials: Oak, Walnut",
    images: [
      {
        src: "/images/img-1882.jpg",
        alt: "Mars Chair - Two Chairs Side by Side",
      },
      {
        src: "/images/mars-2b7.jpg",
        alt: "Mars Chair - At Desk Context",
      },
      {
        src: "/images/img-1873.jpg",
        alt: "Mars Chair - Top Angle View",
      },
      {
        src: "/images/img-1847.jpg",
        alt: "Mars Chair - Stacked Detail",
      },
      {
        src: "/images/img-1755.jpg",
        alt: "Mars Chair - Joinery Detail",
      },
    ],
  }

  const stoneSoupProject = {
    name: "Stone Soup",
    year: "2020",
    description:
      "Born from a school research project where I 3D scanned and replicated stones. Through constellation patterns, the machine distinguished each side of the scanned objects. I fell in love with these transparent relationships visible in the glass. The tops are handcrafted in northern Portugal with customizable color compositions. Materials: Fused Glass, Lacquered Iron.",
    images: [
      {
        src: "/images/1.jpg",
        alt: "Stone Soup - Red Glass Table",
      },
      {
        src: "/images/dsc-0294.jpeg",
        alt: "Stone Soup - Glass Edge Detail",
      },
      {
        src: "/images/img-9238.png",
        alt: "Stone Soup - Transparency Study",
      },
    ],
  }

  const tilesTableProject = {
    name: "Tiles Table",
    year: "2020",
    description:
      "Graphic ceramic table designed for outdoor use. The tabletop was developed using four distinct clay bodies (terracotta, yellow, white, and black stoneware) each with unique shrinkage and texture qualities. Created in collaboration with Qatalyse.",
    images: [
      {
        src: "/images/editada-201.jpg",
        alt: "Tiles Table - Overhead Pattern View",
      },
      {
        src: "/images/editada-202.jpg",
        alt: "Tiles Table - Outdoor Context",
      },
      {
        src: "/images/img-8296.jpeg",
        alt: "Tiles Table - Assembly Process",
      },
      {
        src: "/images/ezgif-com-gif-maker.gif",
        alt: "Tiles Table - Animated 3D Rendering Rotating View",
      },
    ],
  }

  const onioProject = {
    name: "Onio",
    year: "2016",
    description:
      "A wood folding technique developed through successive cutting that allows curved corners in wooden frames. The mechanized process leaves visible traces that blend parametric precision with artisanal warmth. Materials: Oak, Burnt Oak",
    images: [
      {
        src: "/images/dsc0265.jpg",
        alt: "Onio - Burnt Oak Stool Context",
      },
      {
        src: "/images/2.jpg",
        alt: "Onio - Oak Frame with Curved Corners",
      },
      {
        src: "/images/dsc0263.jpg",
        alt: "Onio - Vertical Frame Installation",
      },
      {
        src: "/images/dsc0351.jpg",
        alt: "Onio - Corner Detail Showing Cutting Technique",
      },
    ],
  }

  const glassPlatesProject = {
    name: "Glass Plates",
    year: "2020",
    description:
      "My first design for the glass blowing industry that responds in a fun way through overlapping colors and shapes dictated by the technique itself. Projected to several bathrooms in a Qatalyse project. The luminaires can be suspended from the ceiling or installed on walls. Materials: Colored Glass, Lacquered Iron",
    images: [
      {
        src: "/images/33.jpg",
        alt: "Glass Plates - Ceiling Installation Orange",
      },
      {
        src: "/images/11.jpg",
        alt: "Glass Plates - Ceiling Installation Yellow",
      },
      {
        src: "/images/captura-20de-20ecra-cc-83-202021-02-10-2c-20a-cc-80s-2011.png",
        alt: "Glass Plates - Artisan Working with Molten Glass",
      },
      {
        src: "/images/captura-20de-20ecra-cc-83-202021-02-10-2c-20a-cc-80s-2011.jpeg",
        alt: "Glass Plates - Glowing Furnace with Glass",
      },
      {
        src: "/images/captura-20de-20ecra-cc-83-202021-02-10-2c-20a-cc-80s-2012.png",
        alt: "Glass Plates - Glassblowing Process Detail",
      },
      {
        src: "/images/4.png",
        alt: "Glass Plates - Turquoise Blue with Green Center",
      },
      {
        src: "/images/3.png",
        alt: "Glass Plates - Coral Peach Gradient Design",
      },
      {
        src: "/images/44.jpg",
        alt: "Glass Plates - Green Ceiling Installation with Ambient Glow",
      },
    ],
  }

  const grafProject = {
    name: "Graf",
    year: "2017",
    description:
      "The first project I developed at Branca began as fabric displays for furniture fairs, evolving into decorative and acoustic panels. We developed a system with four usage applications: Wall, Floor, Ceiling (Suspension), and furniture integration. A production plan was created to reduce material waste and ensure cost-effective manufacturing. Materials: Fabrics, Valcromat, Lacquered Metal",
    images: [
      {
        src: "/images/luisinfacnte-28l-2911-20-281-29.jpg",
        alt: "Graf - Technical Panel Configuration Diagram",
      },
      {
        src: "/images/color2.jpg",
        alt: "Graf - Black Acoustic Panels with Furniture Integration",
      },
      {
        src: "/images/biomboconjunto.jpg",
        alt: "Graf - Freestanding Panel System Configuration",
      },
    ],
  }

  const calabashesProject = {
    name: "Calabashes",
    year: "2025",
    description:
      "Magic Objects Collection is an ongoing research into ordinary tools and vessels charged with ritual, symbolism, or myth. For centuries, calabashes have been used as vessels, instruments, and ritual symbols. This project appropriates that heritage by transforming them into suspended lights. Through artisanal reconfiguration, it seeks to preserve their presence while translating it into a contemporary design language. Materials: painted calabashes with glossy finish, repurposed climbing rope.",
    images: [
      {
        src: "/images/speculating-20on-20-20foam-20noodles-20-2b-20sand-20casting.jpg",
        alt: "Calabashes - Design Process and Construction Method",
      },
      {
        src: "/images/dsc07964.jpg",
        alt: "Calabashes - Natural Gourd Inspiration",
      },
      {
        src: "/images/img-6958.jpeg",
        alt: "Calabashes - Artisan Painting Process",
      },
      {
        src: "/images/dsc09509-edit.jpg",
        alt: "Calabashes - Clustered Pendant Configuration with Golden Cord",
      },
    ],
  }

  const santosPlayRoomProject = {
    name: "Santos Play Room",
    year: "2023",
    description:
      "Project for a series of children's rooms and play areas, each designed with a focus on softness, functionality, and imaginative expression with custom-built elements, such as: beds, shelving systems, desks, integrated lighting, giving each space its own character while maintaining a cohesive aesthetic throughout the home. Playful architectural gestures, including curved walls, interior circular windows (oculi), and sculptural lighting features, create moments of discovery and connection between spaces.",
    images: [
      {
        src: "/images/cama-201.jpg",
        alt: "Santos Play Room - Bedroom Overview with Pink Headboard, Wardrobes, and Pink Door",
      },
      {
        src: "/images/secretaria-20detail-202.jpg",
        alt: "Santos Play Room - Mobile Desk Detail with Storage",
      },
      {
        src: "/images/detalhe-20cama.jpg",
        alt: "Santos Play Room - Platform Bed Construction Detail",
      },
      {
        src: "/images/apartamento-20tvshel-20es.jpg",
        alt: "Santos Play Room - Semi-Circular Wall Shelves",
      },
      {
        src: "/images/desk.jpg",
        alt: "Santos Play Room - Mobile Desk Full View",
      },
    ],
  }

  const furniturePortfolioImages = [
    {
      src: "/images/mars-2.jpg",
      alt: "Mars Chair",
      project: "Mars Chair",
      category: "Furniture Design",
    },
    {
      src: "/graf2017-circular-panel.jpeg",
      alt: "Graf Acoustic Panel",
      project: "Graf",
      category: "Objects & Systems",
    },
    {
      src: "/images/tilestablethu.jpg",
      alt: "Tiles Table",
      project: "Tiles Table",
      category: "Furniture Design",
    },
    {
      src: "/images/asset-201-402x-100.jpg",
      alt: "Glass Plates Lighting",
      project: "Glass Plates",
      category: "Lighting",
    },
    {
      src: "/onio-detail.jpg",
      alt: "Onio Furniture Detail",
      project: "Onio",
      category: "Objects & Systems",
    },
    {
      src: "/stone-soup-modular.jpg",
      alt: "Stone Soup Modular Tables",
      project: "Stone Soup",
      category: "Furniture Design",
    },
    {
      src: "/images/dsc09509-edit.jpg",
      alt: "Calabashes Pendant Lamps",
      project: "Calabashes",
      category: "Lighting",
    },
    {
      src: "/images/350090826-960386571671209-3283063603139759009-n.jpeg",
      alt: "Pool Guard",
      project: "Pool Guard",
      category: "Objects & Systems",
    },
    {
      src: "/images/ficheiro-002.jpeg",
      alt: "Pala Shelves",
      project: "Pala Shelves",
      category: "Furniture Design",
    },
    {
      src: "/images/occulo.jpg",
      alt: "Occulo",
      project: "Occulo",
      category: "Lighting",
    },
    {
      src: "/images/rocksofa.jpg",
      alt: "Rock Sofa",
      project: "Rock Sofa",
      category: "Furniture Design",
    },
    {
      src: "/images/disk-shelves.jpg",
      alt: "Disk Shelves",
      project: "Disk Shelves",
      category: "Furniture Design",
    },
    {
      src: "/images/nonu.jpg",
      alt: "Nonu",
      project: "Nonu",
      category: "Objects & Systems",
    },
  ]

  const interiorPortfolioImages = [
    {
      src: "/images/qatalyse-20portfolio.jpeg",
      alt: "Santos Play Room",
      project: "Santos Play Room",
      category: "Interior Architecture",
    },
    {
      src: "/images/mude-logo-model.jpg",
      alt: "MUDE",
      project: "MUDE",
      category: "Interior Architecture",
    },
    {
      src: "/images/birre-kitchen.jpg",
      alt: "Birre Kitchen",
      project: "Birre Kitchen",
      category: "Interior Architecture",
    },
  ]

  const productDesignPortfolioImages: {
    src: string
    alt: string
    project: string
    category: string
  }[] = []

  const visualCommPortfolioImages: {
    src: string
    alt: string
    project: string
    category: string
  }[] = [
    {
      src: "/images/img-9010t.jpg",
      alt: "Branca Lisboa",
      project: "Branca Lisboa",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/copy-20of-20nearcon-20interview-20plans-20-20-20-289-29.jpg",
      alt: "Mintbase Interviews",
      project: "Mintbase Interviews",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/a-vida-portuguesa.jpg",
      alt: "A Vida Portuguesa",
      project: "A Vida Portuguesa",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/dsc04217.jpg",
      alt: "FNAC",
      project: "FNAC",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/fka-twigs-eleven-collection.webp",
      alt: "The Eleven Collection, FKA twigs",
      project: "The Eleven Collection",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/accepting-nfts-here.jpg",
      alt: "Accepting NFTs Here",
      project: "Accepting NFTs Here",
      category: "Visual Communication & Media",
    },
    {
      src: "/images/qatalyze-sofa-full.jpg",
      alt: "Qatalyze Interiors",
      project: "Qatalyze Interiors",
      category: "Visual Communication & Media",
    },
  ]

  const videoPortfolioImages: { src: string; alt: string; project: string; category: string }[] = []

  const acceptingNftsProject = {
    name: "Accepting NFTs Here",
    year: "2022",
    description:
      "The 'Accepting NFTs Here' project by Mintbase tested how NFTs could be used in real life in Lisbon. Local businesses like cafés, bars, and shops accepted NFTs as a way for customers to redeem real products, such as drinks, food, or other items. Instead of being only digital collectibles, the NFTs worked like vouchers. The project showed how blockchain and NFTs can be used in everyday situations and help connect digital ownership with physical places.",
    blogUrl: "https://medium.com/mintbase/accepting-nfts-here-bringing-nfts-to-real-life-in-the-streets-of-lisbon-2de5e0892062",
    images: [
      { src: "/images/accepting-nfts-here.jpg", alt: "Accepting NFTs Here signage at restaurant" },
      { src: "/images/accepting-nfts-table.jpg", alt: "Accepting NFTs Here sign on table" },
      { src: "/images/accepting-nfts-dumplings.jpg", alt: "Accepting NFTs Here at dumplings restaurant" },
      { src: "/images/accepting-nfts-map.jpg", alt: "Accepting NFTs Here map of Lisbon locations" },
    ],
  }

  const qatalyzeInteriorsProject = {
    name: "Qatalyze Interiors",
    year: "2020",
    description:
      "At Qatalyze I was mainly designing and managing production of bespoke furniture for interior projects. The studio never had a virtual presence, neither in social media or a website. Anyway, there was the need of registering the process and some finished products we delivered to our clients. I was doing this through photography and video.",
    images: [
      { src: "/images/qatalyze-sofa-full.jpg", alt: "Qatalyze Interiors - Organic Sofa with Dome Backrests" },
      { src: "/images/qatalyze-tv-wall.jpg", alt: "Qatalyze Interiors - Curved Blue TV Wall with Decorative Elements" },
      { src: "/images/qatalyze-kitchen.jpg", alt: "Qatalyze Interiors - Bespoke Kitchen with Curved Cabinetry" },
      { src: "/images/qatalyze-shelving.jpeg", alt: "Qatalyze Interiors - Modular Brass Shelving System" },
      { src: "/images/qatalyze-oculos.jpg", alt: "Qatalyze Interiors - Decorative Bowl with Radial Pattern" },
      { src: "/images/qatalyze-sofa-detail.jpg", alt: "Qatalyze Interiors - Sofa Fabric and Construction Detail" },
    ],
  }

  const elevenCollectionProject = {
    name: "The Eleven Collection",
    year: "2021",
    description:
      "This collaboration aimed to translate selected moments from FKA twigs' The Eleven performance at Sotheby's into collectible digital works. The project focused on authorship, performance, and digital ownership. I worked directly with the agency managing the partnership, producing visual assets to communicate the concept and mechanics of the release. I also authored the accompanying blog post explaining the collaboration and its cultural context.",
    blogUrl: "https://bitteprotocol.substack.com/p/the-eleven-collection-by-fka-twigs",
    images: [
      { src: "/images/fka-twigs-eleven-collection.webp", alt: "FKA twigs - The Eleven Collection" },
      { src: "/images/eleven-collection-interface.jpg", alt: "The Eleven Collection interface and visuals" },
      { src: "/images/eleven-collection-performance.gif", alt: "FKA twigs performance from The Eleven Collection" },
    ],
  }

  const brancaLisboaProject = {
    name: "Branca Lisboa",
    year: "2019",
    description:
      "After finishing the Product Design course, I had my first professional contact in Branca-Lisboa, directed by Marco Sousa Santos. For two years I was related with several departments that compose Branca-Lisboa studio. From the participation in interior projects to the elaboration of new products for the brand. It was also in the range of my responsibilities in the company communication as newsletters development, product campaigns and management of social networks and the brand site.",
    images: [
      {
        src: "/images/branca-lisboa-two-chairs.gif",
        alt: "Branca Lisboa - Animated Rotation of Gray and Black Ergonomic Chairs",
      },
      {
        src: "/images/branca-lisboa-overhead.jpg",
        alt: "Branca Lisboa - Overhead View of Multiple Chair Backs with Red Chair Accent",
      },
      {
        src: "/images/branca-lisboa-white-stool.gif",
        alt: "Branca Lisboa - Animated Rotation of White Wooden Stool with Branca Branding",
      },
      {
        src: "/images/branca-lisboa-red-chair.jpg",
        alt: "Branca Lisboa - Single Red Chair Front View",
      },
      {
        src: "/images/branca-lisboa-overhead-black.jpg",
        alt: "Branca Lisboa - Overhead View of Black Ergonomic Kneeling Chair",
      },
      {
        src: "/images/branca-lisboa-desk.jpg",
        alt: "Branca Lisboa - Walnut Wood Desk with Curved Detail",
      },
    ],
  }

  const mintbaseProject = {
    name: "Mintbase Interviews",
    year: "2022",
    description:
      "During NEARcon 2022, I conducted a series of interviews to showcase the Mintbase ecosystem. More than an NFT marketplace, Mintbase provides toolkits for developers to build NFT products and explore utility NFTs across ticketing, fan engagement, and Web 3.0 platforms.",
    images: [
      {
        src: "https://www.youtube.com/embed/S7JwKm8u1qY",
        alt: "Mintbase Interviews - Video 1",
        isYouTube: true,
      },
      {
        src: "https://www.youtube.com/embed/ybzxiLHOHgQ",
        alt: "Mintbase Interviews - Video 2",
        isYouTube: true,
      },
      {
        src: "https://www.youtube.com/embed/rQALGqiXiLk",
        alt: "Mintbase Interviews - Video 3",
        isYouTube: true,
      },
      {
        src: "https://www.youtube.com/embed/ulG7-d5M02o?autoplay=1&mute=1&loop=1&playlist=ulG7-d5M02o",
        alt: "Mintbase Interviews - Featured Video",
        isYouTube: true,
        isLarger: true,
      },
    ],
  }

  const aVidaPortuguesaProject = {
    name: "A Vida Portuguesa",
    year: "2024",
    description:
      "For the Non Fungible Conference, we partnered with A Vida Portuguesa to bring their iconic traditional products onto the blockchain. We helped tokenize a selection of items as redeemable NFTs, enabling visitors to purchase them on Mintbase and collect the physical goods onsite. Minting on their own smart contract ensured instant payments and perpetual royalties, highlighting how NFTs can support real-world commerce while preserving cultural heritage in a modern, accessible way.",
    blogUrl: "https://medium.com/mintbase/the-future-is-a-thing-of-the-past-tokenising-old-portuguese-products-in-lisbon-a6b365670842",
    descriptionJSX: (
      <>
        For the Non Fungible Conference, we partnered with{" "}
        <a
          href="https://www.avidaportuguesa.com/en"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 transition-colors"
        >
          A Vida Portuguesa
        </a>{" "}
        to bring their iconic traditional products onto the blockchain. We helped tokenize a selection of items as redeemable NFTs, enabling visitors to purchase them on Mintbase and collect the physical goods onsite. Minting on their own smart contract ensured instant payments and perpetual royalties, highlighting how NFTs can support real-world commerce while preserving cultural heritage in a modern, accessible way.
      </>
    ),
    images: [
      {
        src: "/images/vida-portuguesa-branding.jpg",
        alt: "A Vida Portuguesa - Branding collateral with swallow bird illustrations and NFT redemption materials",
      },
      {
        src: "/images/vida-portuguesa-palette.gif",
        alt: "A Vida Portuguesa - Grayscale color palette animation",
      },
    ],
    video: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avidaportuguesaexplainer-zofCQoM5tEkm5Nhmsx5Cnbk3K9rd27.mp4",
      alt: "A Vida Portuguesa - Project explainer video showcasing the NFT redemption experience",
    },
  }

  const mudeProject = {
    name: "MUDE",
    year: "2017",
    description:
      "Wall Panels project for Museu do Design e da Moda, Lisbon, who delegated to Branca-Lisboa the design for some new spaces that the museum would assume. The Panel that I helped develop would cover 14 meters of continuous wall, and is constructed under the same technology as some of Branca's plywood products in the collection. Materials: Oak Plywood",
    images: [
      {
        src: "/images/mude-logo-model.jpg",
        alt: "MUDE - Architectural Wood Relief with Geometric and Organic Forms",
      },
      {
        src: "/images/portfoldddio-20-20luis-20x-20quentin.jpeg",
        alt: "MUDE - Oak Plywood Panel with Concentric Arc Pattern",
      },
    ],
  }

  const birreKitchenProject = {
    name: "Birre Kitchen",
    year: "2024",
    description:
      "In this interior project, designed entirely by Qatalyse, where most of the elements were designed by measure. A demanding project in terms of detail, where we designed lighting, handles, wine cabinet, sofas, shelving systems, tables, beds, mirrors, showers, among other details.",
    images: [
      {
        src: "/images/birre-kitchen-handle-detail.jpg",
        alt: "Birre Kitchen - Custom burgundy red elongated handle detail on wood grain cabinet",
      },
      {
        src: "/images/birre-kitchen-full-view.jpg",
        alt: "Birre Kitchen - Full view with beige cabinets, burgundy accents, curved island, and geometric lighting",
      },
      {
        src: "/images/birre-kitchen-concept.jpg",
        alt: "Birre Kitchen - Conceptual rendering with white minimalist design and sculptural lighting",
      },
    ],
  }

  const poolGuardProject = {
    name: "Pool Guard",
    year: "2023",
    description:
      "Embarked on a journey with laminated glass for a Qatalyse project. The aim was to create a unique and playful piece that not only injects a sense of light-heartedness but also enhances the safety of our client's pool area. Drawing inspiration from church stained glass puzzles, we dared to reinvent the concept, fusing a small workshop in Ancião and the leading glass industry in Aveiro.",
    images: [
      {
        src: "/images/img-4943.jpeg",
        alt: "Pool Guard - Color Sample Mockup with Red, Orange, and Pink Glass Panels",
      },
      {
        src: "/images/2022-05-25-2010.jpg",
        alt: "Pool Guard - Installed by Infinity Pool with Lisbon Harbor View",
      },
      {
        src: "/images/whatsapp-20image-202021-10-21-20at-2011.jpeg",
        alt: "Pool Guard - Workshop Fabrication Layout with Curved Patterns",
      },
    ],
    video: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4944-ZJGLNVCWFJYWeUqcoABVDc8nfQ4ATC.MOV",
      alt: "Pool Guard - Installation Video",
    },
  }

  const palaShelvesProject = {
    name: "Pala Shelves",
    year: "2023",
    description:
      "In response to a simple movement of linking a way into function, this shelf is born within the Qatalyse Santos Project. Two half brass circles with 25 cm diameter meeting in a corner. Decoration and the reflection of the function. Material: Brass",
    images: [
      {
        src: "/images/pala-shelv.jpg",
        alt: "Pala Shelves - Gold Brass Finish with Ceramic Vase on Blue Wall",
      },
      {
        src: "/images/apartamento-tvshel-es.jpg",
        alt: "Pala Shelves - Multiple Sizes Composition on Teal Wall",
      },
    ],
  }

  const occuloProject = {
    name: "Occulo",
    year: "2024",
    description:
      "Circular windows developed in partnership with a handmade glass workshop located in Marinha Grande, Portugal, assuming a rough glass with a graphic design that reflects this light transmission, almost like a star, bringing dynamic visual interest to interior spaces while providing ambient lighting. Materials: Brass, Artisanal Glass",
    images: [
      {
        src: "/images/dsc-0171.jpg",
        alt: "Occulo - Workshop Process: Artisan Assembling Red Burgundy Glass Discs",
      },
      {
        src: "/images/dsc-0163.jpg",
        alt: "Occulo - Workshop Process: Blue Turquoise Glass Discs with Brass Frame",
      },
      {
        src: "/images/dsc-0183.jpg",
        alt: "Occulo - Finished Red Burgundy Glass Discs with Brass Circular Frame",
      },
      {
        src: "/images/untitled-design-3.gif",
        alt: "Occulo - Animated Rotating View of Luminaire with Sunburst Pattern",
      },
    ],
  }

  const rockSofaProject = {
    name: "Rock Sofa",
    year: "2024",
    description:
      "Designed for a room in a Qatalyse project with an organic lifestyle we created this sofa where the user can decide the position of the back, these large pillows with the right weight to remain static when sitting but light enough to be lifted. It is a sofa that can seat 4 or more people, depending on the arrangement of the pillows. Materials: Oak, foams and fabric.",
    images: [
      {
        src: "/images/rock-sofa-side-view.jpg",
        alt: "Rock Sofa - Side View with Rounded Pillows and Wooden Frame",
      },
      {
        src: "/images/rock-sofa-front-view.jpg",
        alt: "Rock Sofa - Front View with Four Grey Cushion Elements",
      },
      {
        src: "/images/rock-sofa-seated.jpg",
        alt: "Rock Sofa - Seating View Demonstrating Modular Cushion Arrangement",
      },
    ],
  }

  const diskShelvesProject = {
    name: "Disk Shelves",
    year: "2024",
    description:
      "A custom shelving system designed and fabricated in collaboration with Qatalyse. The structure is defined by a series of circular wooden shelves and modular storage boxes, all elegantly suspended between slim brass tubes. The brass elements extend from floor to ceiling, providing both structural support and a refined vertical rhythm throughout the space. The result is a light, sculptural storage solution that blends functional display with a clean, contemporary aesthetic. Material: Brass, oak or walnut.",
    images: [
      {
        src: "/images/disk-shelves-full-system.jpg",
        alt: "Disk Shelves - Complete Modular Shelving System with Brass Rods and Walnut Storage",
        containerClassName: "max-w-[24rem]",
      },
    ],
  }

  const nonuProject = {
    name: "Nonu",
    year: "2024",
    description:
      "It's the dish dryer inspired by the most practical choices of the users, made to think about the visual respect that the objects have with the space and the ease of use. This object wants to provide a more organic organization at the moment the dishes need to dry before being tidied up, so NONU can take various forms to receive different types of dishes and even to be tidy. Materials: RuberCork, Acrilic",
    images: [
      {
        src: "/images/nonu-with-plate.jpg",
        alt: "NONU cork dish drainer holding white ceramic plate",
      },
      {
        src: "/images/nonu-empty.jpg",
        alt: "NONU cork dish drainer empty view showing textured interior",
      },
      {
        src: "/images/nonu-collapsed.jpg",
        alt: "NONU cork dish drainer in collapsed folded state",
      },
    ],
  }

  const projectsMetadata = [
    // Furniture Design projects (from furniturePortfolioImages)
    { name: "Mars Chair", year: "2017", category: "Furniture Design" },
    { name: "Tiles Table", year: "2020", category: "Furniture Design" },
    { name: "Stone Soup", year: "2020", category: "Furniture Design" },
    { name: "Pala Shelves", year: "2023", category: "Furniture Design" },
    { name: "Rock Sofa", year: "2024", category: "Furniture Design" },
    { name: "Disk Shelves", year: "2024", category: "Furniture Design" },

    // Lighting projects (from furniturePortfolioImages)
    { name: "Glass Plates", year: "2020", category: "Lighting" },
    { name: "Calabashes", year: "2025", category: "Lighting" },
    { name: "Occulo", year: "2024", category: "Lighting" },

    // Objects & Systems projects (from furniturePortfolioImages)
    { name: "Graf", year: "2017", category: "Objects & Systems" },
    { name: "Onio", year: "2016", category: "Objects & Systems" },
    { name: "Pool Guard", year: "2023", category: "Objects & Systems" },
    { name: "Nonu", year: "2024", category: "Objects & Systems" },

    // Interior Architecture projects (from interiorPortfolioImages)
    { name: "Santos Play Room", year: "2023", category: "Interior Architecture" },
    { name: "MUDE", year: "2017", category: "Interior Architecture" },
    { name: "Birre Kitchen", year: "2024", category: "Interior Architecture" },

    // Visual Communication & Media projects (from visualCommunicationPortfolioImages)
    { name: "Branca Lisboa", year: "2019", category: "Visual Communication & Media" },
    { name: "Qatalyze Interiors", year: "2020", category: "Visual Communication & Media" },
    { name: "Mintbase Interviews", year: "2022", category: "Visual Communication & Media" },
    { name: "A Vida Portuguesa", year: "2024", category: "Visual Communication & Media" },
    { name: "FNAC", year: "2022", category: "Visual Communication & Media" },
  ]

  const projects = [
    ...furniturePortfolioImages,
    ...interiorPortfolioImages,
    ...visualCommPortfolioImages,
    ...productDesignPortfolioImages,
    ...videoPortfolioImages,
  ]

  const getCurrentImages = () => {
    if (selectedProject === "Mars Chair") {
      const originalMarsChair = furniturePortfolioImages.find((img) => img.project === "Mars Chair")
      return [
        originalMarsChair,
        ...marsChairProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Mars Chair",
          category: "Furniture Design",
        })),
      ]
    }

    if (selectedProject === "Stone Soup") {
      const originalStoneSoup = furniturePortfolioImages.find((img) => img.project === "Stone Soup")
      return [
        originalStoneSoup,
        ...stoneSoupProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Stone Soup",
          category: "Furniture Design",
        })),
      ]
    }

    if (selectedProject === "Tiles Table") {
      const originalTilesTable = furniturePortfolioImages.find((img) => img.project === "Tiles Table")
      return [
        originalTilesTable,
        ...tilesTableProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Tiles Table",
          category: "Furniture Design",
        })),
      ]
    }

    if (selectedProject === "Onio") {
      const originalOnio = furniturePortfolioImages.find((img) => img.project === "Onio")
      return [
        originalOnio,
        ...onioProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Onio",
          category: "Objects & Systems",
        })),
      ]
    }

    if (selectedProject === "Glass Plates") {
      const originalGlassPlates = furniturePortfolioImages.find((img) => img.project === "Glass Plates")
      return [
        originalGlassPlates,
        ...glassPlatesProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Glass Plates",
          category: "Lighting",
        })),
      ]
    }

    if (selectedProject === "Graf") {
      const originalGraf = furniturePortfolioImages.find((img) => img.project === "Graf")
      return [
        originalGraf,
        ...grafProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Graf",
          category: "Objects & Systems",
        })),
      ]
    }

    if (selectedProject === "Calabashes") {
      const originalCalabashes = furniturePortfolioImages.find((img) => img.project === "Calabashes")
      return [
        originalCalabashes,
        ...calabashesProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Calabashes",
          category: "Lighting",
        })),
      ]
    }

    if (selectedProject === "Santos Play Room") {
      const originalSantosPlayRoom = interiorPortfolioImages.find((img) => img.project === "Santos Play Room")
      return [
        originalSantosPlayRoom,
        ...santosPlayRoomProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Santos Play Room",
          category: "Interior Architecture",
        })),
      ]
    }

    if (selectedProject === "MUDE") {
      const originalMude = interiorPortfolioImages.find((img) => img.project === "MUDE")
      return [
        originalMude,
        ...mudeProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "MUDE",
          category: "Interior Architecture",
        })),
      ]
    }

    if (selectedProject === "Birre Kitchen") {
      const originalBirreKitchen = interiorPortfolioImages.find((img) => img.project === "Birre Kitchen")
      return [
        originalBirreKitchen,
        ...birreKitchenProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Birre Kitchen",
          category: "Interior Architecture",
        })),
      ]
    }

    if (selectedProject === "Branca Lisboa") {
      const originalBrancaLisboa = visualCommPortfolioImages.find((img) => img.project === "Branca Lisboa")
      return [
        originalBrancaLisboa,
        ...brancaLisboaProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Branca Lisboa",
          category: "Visual Communication & Media",
        })),
      ]
    }

    if (selectedProject === "Mintbase Interviews") {
      const originalMintbase = visualCommPortfolioImages.find((img) => img.project === "Mintbase Interviews")
      return [
        originalMintbase,
        ...mintbaseProject.images.map((img) => ({
          ...img,
          project: "Mintbase Interviews",
          category: "Visual Communication & Media",
        })),
      ]
    }

    if (selectedProject === "A Vida Portuguesa") {
      const originalAVidaPortuguesa = visualCommPortfolioImages.find((img) => img.project === "A Vida Portuguesa")
      return [
        originalAVidaPortuguesa,
        ...aVidaPortuguesaProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "A Vida Portuguesa",
          category: "Visual Communication & Media",
        })),
        ...(aVidaPortuguesaProject.video
          ? [
              {
                src: aVidaPortuguesaProject.video.src,
                alt: aVidaPortuguesaProject.video.alt,
                project: "A Vida Portuguesa",
                isVideo: true,
                category: "Visual Communication & Media",
              },
            ]
          : []),
      ]
    }

    if (selectedProject === "FNAC") {
      const originalFNAC = visualCommPortfolioImages.find((img) => img.project === "FNAC")
      return [
        originalFNAC,
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fnac%20usecase-oo7QBLp55jYyCXmnei9Mt7z2VL2wrZ.mp4",
          alt: "FNAC Use Case Video",
          project: "FNAC",
          category: "Visual Communication & Media",
          isVideo: true,
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1768334502446-PLAqNUD1tfjf7TMlmVrTbLZRldt3ze.mp4",
          alt: "FNAC Mintbase Partnership Video",
          project: "FNAC",
          category: "Visual Communication & Media",
          isVideo: true,
        },
      ]
    }

    if (selectedProject === "The Eleven Collection") {
      const originalElevenCollection = visualCommPortfolioImages.find((img) => img.project === "The Eleven Collection")
      return [
        originalElevenCollection,
        { src: "/images/eleven-collection-interface.jpg", alt: "The Eleven Collection interface and visuals", project: "The Eleven Collection", category: "Visual Communication & Media" },
        { src: "/images/eleven-collection-performance.gif", alt: "FKA twigs performance from The Eleven Collection", project: "The Eleven Collection", category: "Visual Communication & Media" },
        {
          src: "https://x.com/BitteProtocol/status/1836349828218966327",
          alt: "Bitte Protocol post about The Eleven Collection on X",
          project: "The Eleven Collection",
          category: "Visual Communication & Media",
          isXPost: true,
        },
      ]
    }

    if (selectedProject === "Accepting NFTs Here") {
      const originalAcceptingNfts = visualCommPortfolioImages.find((img) => img.project === "Accepting NFTs Here")
      return [
        originalAcceptingNfts,
        { src: "/images/accepting-nfts-table.jpg", alt: "Accepting NFTs Here sign on table", project: "Accepting NFTs Here", category: "Visual Communication & Media" },
        { src: "/images/accepting-nfts-dumplings.jpg", alt: "Accepting NFTs Here at dumplings restaurant", project: "Accepting NFTs Here", category: "Visual Communication & Media" },
        {
          src: "https://www.openstreetmap.org/export/embed.html?bbox=-9.1700%2C38.7050%2C-9.1200%2C38.7300&layer=mapnik&marker=38.7169%2C-9.1399",
          alt: "Interactive map of Lisbon NFT locations",
          project: "Accepting NFTs Here",
          category: "Visual Communication & Media",
          isMap: true,
          mapLink: "https://medium.com/mintbase/the-future-is-a-thing-of-the-past-tokenising-old-portuguese-products-in-lisbon-a6b365670842",
        },
      ]
    }

    if (selectedProject === "Qatalyze Interiors") {
      const originalQatalyze = visualCommPortfolioImages.find((img) => img.project === "Qatalyze Interiors")
      return [
        originalQatalyze,
        { src: "/images/qatalyze-tv-wall.jpg", alt: "Qatalyze Interiors - Curved Blue TV Wall", project: "Qatalyze Interiors", category: "Visual Communication & Media" },
        { src: "/images/qatalyze-kitchen.jpg", alt: "Qatalyze Interiors - Bespoke Kitchen", project: "Qatalyze Interiors", category: "Visual Communication & Media" },
        { src: "/images/qatalyze-shelving.jpeg", alt: "Qatalyze Interiors - Modular Shelving", project: "Qatalyze Interiors", category: "Visual Communication & Media" },
        { src: "/images/qatalyze-oculos.jpg", alt: "Qatalyze Interiors - Decorative Bowl", project: "Qatalyze Interiors", category: "Visual Communication & Media" },
        { src: "/images/qatalyze-sofa-detail.jpg", alt: "Qatalyze Interiors - Sofa Detail", project: "Qatalyze Interiors", category: "Visual Communication & Media" },
      ]
    }

    if (selectedProject === "Pool Guard") {
      const originalPoolGuard = furniturePortfolioImages.find((img) => img.project === "Pool Guard")
      return [
        originalPoolGuard,
        ...poolGuardProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Pool Guard",
          category: "Objects & Systems",
        })),
        ...(poolGuardProject.video
          ? [
              {
                src: poolGuardProject.video.src,
                alt: poolGuardProject.video.alt,
                project: "Pool Guard",
                isVideo: true,
                category: "Objects & Systems",
              },
            ]
          : []),
      ]
    }

    if (selectedProject === "Pala Shelves") {
      const originalPalaShelves = furniturePortfolioImages.find((img) => img.project === "Pala Shelves")
      return [
        originalPalaShelves,
        ...palaShelvesProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Pala Shelves",
          category: "Objects & Systems",
        })),
      ]
    }

    if (selectedProject === "Occulo") {
      const originalOcculo = furniturePortfolioImages.find((img) => img.project === "Occulo")
      return [
        originalOcculo,
        ...occuloProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Occulo",
          category: "Lighting",
        })),
      ]
    }

    if (selectedProject === "Rock Sofa") {
      const originalRockSofa = furniturePortfolioImages.find((img) => img.project === "Rock Sofa")
      return [
        originalRockSofa,
        ...rockSofaProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Rock Sofa",
          category: "Furniture Design",
        })),
      ]
    }

    if (selectedProject === "Disk Shelves") {
      const originalDiskShelves = furniturePortfolioImages.find((img) => img.project === "Disk Shelves")
      return [
        originalDiskShelves,
        ...diskShelvesProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Disk Shelves",
          containerClassName: img.containerClassName,
          category: "Furniture Design",
        })),
      ]
    }

    if (selectedProject === "Nonu") {
      const originalNonu = furniturePortfolioImages.find((img) => img.project === "Nonu")
      return [
        originalNonu,
        ...nonuProject.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          project: "Nonu",
          category: "Objects & Systems",
        })),
      ]
    }

    switch (clickedButton) {
      case "Furniture":
        // Mars Chair (2017), Tiles Table (2020), Stone Soup (2020), Pala Shelves (2023), Rock Sofa (2024), Disk Shelves (2024)
        return [
          furniturePortfolioImages[0], // Mars Chair
          furniturePortfolioImages[2], // Tiles Table
          furniturePortfolioImages[5], // Stone Soup
          furniturePortfolioImages[8], // Pala Shelves
          furniturePortfolioImages[10], // Rock Sofa
          furniturePortfolioImages[11], // Disk Shelves
        ]
      case "Lighting":
        // Glass Plates (2020), Calabashes (2021), Occulo (2024)
        return [
          furniturePortfolioImages[3], // Glass Plates
          furniturePortfolioImages[6], // Calabashes
          furniturePortfolioImages[9], // Occulo
        ]
      case "Objects & Systems":
        // Graf Panels (2017), Onio (2016), Pool Guard (2023), Nonu (2024)
        return [
          furniturePortfolioImages[1], // Graf
          furniturePortfolioImages[4], // Onio
          furniturePortfolioImages[7], // Pool Guard
          furniturePortfolioImages[12], // Nonu
        ]
      case "Interior Installations":
        return interiorPortfolioImages
      case "Product Development":
        return productDesignPortfolioImages
      case "Visual Communication & Media": // Changed from "Material Experiments"
        return visualCommPortfolioImages
      default:
        return []
    }
  }

  // Unified pointer move handler — works for mouse, touch and pen.
  const handlePointerMove = useCallback((e: PointerEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })

    if (draggedImageRef.current !== null && imageRefs.current[draggedImageRef.current]) {
      // Stop the browser from scrolling/panning while a finger is dragging an image.
      if (e.cancelable) e.preventDefault()

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const element = imageRefs.current[draggedImageRef.current!]
        if (element) {
          const newX = e.clientX - dragOffsetRef.current.x
          const newY = e.clientY - dragOffsetRef.current.y

          element.style.left = `${newX}px`
          element.style.top = `${newY}px`
        }
      })
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (draggedImageRef.current !== null && imageRefs.current[draggedImageRef.current]) {
      const element = imageRefs.current[draggedImageRef.current]
      if (element) {
        const currentLeft = element.style.left
        const currentTop = element.style.top

        setImagePositions((prev) => {
          const newPositions = [...prev]
          newPositions[draggedImageRef.current!] = {
            top: currentTop,
            left: currentLeft,
          }
          return newPositions
        })
      }
    }

    draggedImageRef.current = null
    dragOffsetRef.current = { x: 0, y: 0 }
    setDraggedImage(null)
    setIsInteractingWithVideo({})
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    // Pointer events unify mouse, touch and pen. The move listener is non-passive
    // so we can preventDefault() and stop the page from scrolling mid-drag.
    window.addEventListener("pointermove", handlePointerMove, { passive: false })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    window.addEventListener("pointercancel", handlePointerUp, { passive: true })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerUp)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxImage) {
        setLightboxImage(null)
      }
    }

    if (lightboxImage) {
      window.addEventListener("keydown", handleEscKey)
      return () => window.removeEventListener("keydown", handleEscKey)
    }
  }, [lightboxImage])

  const getRotation = (element: HTMLDivElement | null, mouseX: number) => {
    if (!element || draggedImageRef.current !== null) return 0
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const distance = mouseX - centerX
    const maxRotation = 15
    const rotationRange = 200
    return Math.max(-maxRotation, Math.min(maxRotation, (distance / rotationRange) * maxRotation))
  }

  const handleButtonClick = (buttonName: string) => {
    setClickedButton(clickedButton === buttonName ? null : buttonName)
    setMobileFilterCategory("All") // Reset mobile filter when switching desktop categories
  }

  // Unified pointer-down handler for starting a drag on mouse, touch or pen.
  const handleImagePointerDown = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    // Capture the pointer so move/up events keep firing on this element even if the
    // finger/cursor moves off it.
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    draggedImageRef.current = index
    setDraggedImage(index)

    const rect = e.currentTarget.getBoundingClientRect()
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    setImageZIndices((prev) => {
      const newZIndices = [...prev]
      maxZIndexRef.current += 1
      newZIndices[index] = maxZIndexRef.current
      return newZIndices
    })
  }

  const handleBackClick = () => {
    if (selectedProject) {
      setSelectedProject(null)
    } else if (clickedButton) {
      setClickedButton(null)
    }
    setMobileFilterCategory("All") // Reset mobile filter when going back
  }

  const handleLogoClick = () => {
    setSelectedProject(null)
    setClickedButton(null)
    setMobileFilterCategory("All") // Reset mobile filter on logo click
  }

  const handleProjectClick = (projectName: string) => {
    setSelectedProject(projectName)
    setMobileFilterCategory("All") // Reset mobile filter when selecting a project
  }

  // Function to handle mobile filter changes
  const setMobileFilter = (filter: string) => {
    setMobileFilterCategory(filter)
  }

  return (
    <main className="min-h-screen overflow-hidden md:overflow-auto">
      {/* Unified Gallery View — same draggable experience on mobile and desktop */}
      <section className="block px-6 py-12 relative overflow-hidden h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-3 px-8 py-4 md:px-10 md:py-6">
          <Image
            src="/images/new-20logo.png"
            alt="Luis Infante"
            width={200}
            height={80}
            priority
            quality={90}
            className="h-16 md:h-24 w-auto cursor-pointer"
            onClick={handleLogoClick}
            sizes="(max-width: 768px) 64px, 96px"
          />
          <div className="px-3 py-1 text-sm rounded-full whitespace-nowrap border text-brand border-brand font-medium">
            Creative Strategist & Designer
          </div>
        </div>

        {!selectedProject && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative rounded-lg overflow-hidden group/headshot pointer-events-auto">
              <Image
                src="/luis-headshot-new.jpg"
                alt="Luis Infante - Creative Strategist & Designer"
                width={400}
                height={500}
                priority
                quality={90}
                className="w-[220px] h-[275px] md:w-[400px] md:h-[500px] object-cover object-[center_bottom] shadow-2xl"
                sizes="(max-width: 768px) 220px, 400px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg"></div>

              <div
                className={`absolute bottom-4 right-4 transition-opacity duration-300 ${
                  !clickedButton && !selectedProject
                    ? "opacity-100"
                    : "opacity-100 md:opacity-0 md:group-hover/headshot:opacity-100"
                }`}
              >
                <button
                  onClick={() => setShowAboutMe(true)}
                  className="flex items-center gap-0 bg-white rounded-full transition-all duration-300 ease-out hover:gap-2 hover:pr-4 overflow-hidden shadow-lg border border-gray-200 group/button cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap opacity-0 max-w-0 group-hover/button:opacity-100 group-hover/button:max-w-[100px] transition-all duration-300 ease-out">
                    About Me
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${clickedButton ? "opacity-0" : "opacity-100"}`}
        >
          <button
            className={`floating-button absolute top-[28%] left-[15%] pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "interior" ? "animate-none scale-110" : "animate-float-1"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("interior")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Interior Installations")}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 whitespace-nowrap">
              Interior Installations
            </div>
          </button>

          <button
            className={`floating-button absolute top-[33%] right-[15%] pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "product" ? "animate-none scale-110" : "animate-float-4"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("product")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Product Development")}
          ></button>

          {/* Visual Communication & Media - Moved lower from bottom-[30%] to bottom-[25%] on desktop */}
          <button
            className={`floating-button absolute bottom-[5%] right-[12%] md:bottom-[25%] md:left-[10%] md:right-auto pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "material" ? "animate-none scale-110" : "animate-float-5"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("material")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Visual Communication & Media")}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 whitespace-nowrap">
              Visual Communication & Media
            </div>
          </button>

          {/* Furniture button - Moved lower from top-[45%] to top-[50%] on desktop */}
          <button
            className={`floating-button absolute top-[28%] right-[15%] md:top-[50%] md:right-auto md:left-[30%] pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "furniture" ? "animate-none scale-110" : "animate-float-2"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("furniture")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Furniture")}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 whitespace-nowrap">
              Furniture
            </div>
          </button>

          {/* Lighting button - Right side, above Objects & Systems */}
          <button
            className={`floating-button absolute top-[36%] right-[10%] md:top-[38%] md:right-[25%] pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "lighting" ? "animate-none scale-110" : "animate-float-3"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("lighting")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Lighting")}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 whitespace-nowrap">
              Lighting
            </div>
          </button>

          {/* Objects & Systems button - Moved lower from top-[60%] to top-[65%] */}
          <button
            className={`floating-button absolute top-[65%] right-[15%] pointer-events-auto cursor-pointer transition-all duration-300 ${
              hoveredButton === "objects" ? "animate-none scale-110" : "animate-float-7"
            } ${clickedButton ? "pointer-events-none" : ""}`}
            onMouseEnter={() => setHoveredButton("objects")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => handleButtonClick("Objects & Systems")}
          >
            <div className="bg-white border border-gray-200 rounded-full px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300 whitespace-nowrap">
              Objects & Systems
            </div>
          </button>
        </div>

        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${clickedButton ? "opacity-100" : "opacity-0"}`}
        >
          {clickedButton && (
            <>
              {getCurrentImages().map((image, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el
                  }}
                  className={`absolute pointer-events-auto group ${
                    draggedImageRef.current === index ? "z-50" : "transition-all duration-500"
                  }`}
                  style={{
                    position: "absolute",
                    top: imagePositions[index]?.top || "50%",
                    left: imagePositions[index]?.left || "50%",
                    zIndex: imageZIndices[index] || (selectedProject === "Tiles Table" && index >= 3 ? 10 : 20),
                    transform:
                      clickedButton === "Furniture Design" && !selectedProject && (index === 3 || index === 2)
                        ? "scale(0.9)"
                        : undefined,
                    touchAction: "none",
                  }}
                  onPointerDown={(e) => handleImagePointerDown(e, index)}
                >
                  {(image as any).isVideo ? (
                    <div className="relative">
                      <video
                        src={image.src || ""}
                        className={`w-full h-auto object-contain pointer-events-auto select-none max-w-[8rem] md:max-w-[16rem] transition-all duration-300 ease-out ${
                          isMobile
                            ? ""
                            : draggedImageRef.current === index
                              ? "cursor-grabbing scale-105"
                              : "cursor-grab"
                        }`}
                        style={{
                          transform: `rotateY(${getRotation(imageRefs.current[index], mousePosition.x)}deg)`,
                          transformStyle: "preserve-3d",
                          transition: draggedImageRef.current === index ? "none" : "all 0.3s ease-out",
                        }}
                        autoPlay
                        muted
                        controls
                        loop
                        playsInline
                        onPlay={() => setIsVideoPlaying((prev) => ({ ...prev, [index]: true }))}
                        onPause={() => setIsVideoPlaying((prev) => ({ ...prev, [index]: false }))}
                        onPointerDown={(e) => {
                          // If interacting with video controls (bottom 40px of video), don't drag
                          const rect = e.currentTarget.getBoundingClientRect()
                          const clickY = e.clientY - rect.top
                          if (clickY > rect.height - 40) {
                            e.stopPropagation()
                            setIsInteractingWithVideo((prev) => ({ ...prev, [index]: true }))
                          }
                        }}
                        onPointerUp={() => {
                          setIsInteractingWithVideo((prev) => ({ ...prev, [index]: false }))
                        }}
                      />
                      {!isVideoPlaying[index] && (
                        <div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          style={{ pointerEvents: "none" }}
                        >
                          <div
                            className="w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-lg cursor-pointer"
                            style={{ pointerEvents: "auto" }}
                            onClick={(e) => {
                              e.stopPropagation()
                              const video = e.currentTarget.parentElement?.parentElement?.querySelector("video")
                              if (video) {
                                video.play()
                              }
                            }}
                            onPointerDown={(e) => {
                              e.stopPropagation()
                              const video = e.currentTarget.parentElement?.parentElement?.querySelector("video")
                              if (video) {
                                video.play()
                              }
                            }}
                          >
                            <svg className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (image as any).isYouTube ? (
                    <iframe
                      src={image.src || ""}
                      className={`w-full h-auto object-contain pointer-events-none select-none ${
                        (image as any).isLarger ? "max-w-[50rem] md:max-w-[100rem]" : "max-w-[14rem] md:max-w-[28rem]"
                      } aspect-video overflow-hidden transition-all duration-300 ease-out perspective-1000 relative shadow-none`}
                      style={{
                        transform: `rotateY(${getRotation(imageRefs.current[index], mousePosition.x)}deg)`,
                        transformStyle: "preserve-3d",
                        transition: draggedImageRef.current === index ? "none" : "all 0.3s ease-out",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (image as any).isMap ? (
                    <div
                      className="relative overflow-hidden rounded-sm shadow-md"
                      style={{
                        width: isMobile ? "9rem" : "18rem",
                        height: isMobile ? "9rem" : "18rem",
                        transform: `rotateY(${getRotation(imageRefs.current[index], mousePosition.x)}deg)`,
                        transformStyle: "preserve-3d",
                        transition: draggedImageRef.current === index ? "none" : "all 0.3s ease-out",
                      }}
                    >
                      <iframe
                        src={image.src || ""}
                        title={image.alt}
                        className="w-full h-full border-0 pointer-events-auto select-none"
                        style={{ display: "block" }}
                        loading="lazy"
                        onPointerDown={(e) => e.stopPropagation()}
                      />
                      {/* Clickable overlay label */}
                      <a
                        href={(image as any).mapLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur-sm border-t border-gray-100 hover:bg-white transition-colors duration-200 group"
                        aria-label="Read the full story about Lisbon NFT locations on Medium"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <span className="text-xs font-medium text-gray-700 truncate">Lisbon NFT locations</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-gray-500 shrink-0 ml-1 group-hover:text-gray-900 transition-colors"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    </div>
                  ) : (image as any).isXPost ? (
                    <div
                      style={{
                        width: isMobile ? "13rem" : "20rem",
                        transform: `rotateY(${getRotation(imageRefs.current[index], mousePosition.x)}deg)`,
                        transformStyle: "preserve-3d",
                        transition: draggedImageRef.current === index ? "none" : "all 0.3s ease-out",
                      }}
                    >
                      <TweetEmbedCard />
                    </div>
                  ) : (
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onClick={() => {
                        if (!draggedImageRef.current && selectedProject) {
                          setLightboxImage({ src: image.src || "", alt: image.alt })
                        }
                      }}
                      className={`w-full h-auto object-contain pointer-events-none select-none ${
                        clickedButton === "Visual Communication & Media" && !selectedProject
                          ? "max-w-[10rem] md:max-w-[18rem]"
                          : selectedProject === "Graf" && index > 0
                            ? "max-w-[14rem] md:max-w-[26rem]" // Corrected from original code's specific condition
                            : selectedProject
                              ? "max-w-[10rem] md:max-w-[18rem]"
                              : "max-w-[10rem] md:max-w-[18rem]"
                      } overflow-hidden transition-all duration-300 ease-out perspective-1000 relative shadow-none ${
                        isMobile
                          ? ""
                          : draggedImageRef.current === index
                            ? "cursor-grabbing scale-105"
                            : selectedProject
                              ? "cursor-zoom-in hover:scale-105"
                              : "cursor-grab"
                      } ${image.containerClassName || ""}`}
                      style={{
                        transform: `rotateY(${getRotation(imageRefs.current[index], mousePosition.x)}deg)`,
                        transformStyle: "preserve-3d",
                        transition: draggedImageRef.current === index ? "none" : "all 0.3s ease-out",
                        mixBlendMode:
                          (selectedProject === "Glass Plates" && index === 1) ||
                          (clickedButton === "Furniture Design" && !selectedProject && index === 4)
                            ? "screen"
                            : undefined,
                      }}
                    />
                  )}
                  {!selectedProject && (
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (clickedButton === "Furniture") {
                            if (index === 0) handleProjectClick("Mars Chair")
                            else if (index === 1) handleProjectClick("Tiles Table")
                            else if (index === 2) handleProjectClick("Stone Soup")
                            else if (index === 3) handleProjectClick("Pala Shelves")
                            else if (index === 4) handleProjectClick("Rock Sofa")
                            else if (index === 5) handleProjectClick("Disk Shelves")
                          }
                          if (clickedButton === "Lighting") {
                            if (index === 0) handleProjectClick("Glass Plates")
                            else if (index === 1) handleProjectClick("Calabashes")
                            else if (index === 2) handleProjectClick("Occulo")
                          }
                          if (clickedButton === "Objects & Systems") {
                            if (index === 0) handleProjectClick("Graf")
                            else if (index === 1) handleProjectClick("Onio")
                            else if (index === 2) handleProjectClick("Pool Guard")
                            else if (index === 3) handleProjectClick("Nonu")
                          }
                          if (clickedButton === "Interior Installations") {
                            if (index === 0) {
                              handleProjectClick("Santos Play Room")
                            }
                            if (index === 1) {
                              handleProjectClick("MUDE")
                            }
                            if (index === 2) {
                              handleProjectClick("Birre Kitchen")
                            }
                          }
                          if (clickedButton === "Visual Communication & Media") {
                            if (index === 0) {
                              handleProjectClick("Branca Lisboa")
                            }
                            if (index === 1) {
                              handleProjectClick("Mintbase Interviews")
                            }
                            if (index === 2) {
                              handleProjectClick("A Vida Portuguesa")
                            }
                            if (index === 3) {
                              handleProjectClick("FNAC")
                            }
                            if (index === 4) {
                              handleProjectClick("The Eleven Collection")
                            }
                            if (index === 5) {
                              handleProjectClick("Accepting NFTs Here")
                            }
                            if (index === 6) {
                              handleProjectClick("Qatalyze Interiors")
                            }
                          }
                        }}
                        className="flex items-center gap-0 bg-white rounded-full transition-all duration-300 ease-out hover:gap-2 hover:pr-4 overflow-hidden shadow-lg border border-gray-200 group/button cursor-pointer"
                      >
                        <div className="w-8 h-8 aspect-square rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap opacity-0 max-w-0 group-hover/button:opacity-100 group-hover/button:max-w-[200px] transition-all duration-300 ease-out">
                          {image.project || "View Project"}
                        </span>
                      </button>
                    </div>
                  )}
                  {selectedProject && !(image as any).isVideo && !(image as any).isYouTube && !(image as any).isMap && !(image as any).isXPost && (
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setLightboxImage({ src: image.src || "", alt: image.alt })
                        }}
                        className="w-8 h-8 aspect-square rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
                        aria-label="View fullscreen"
                      >
                        <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {selectedProject === "Mars Chair" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{marsChairProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{marsChairProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{marsChairProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Stone Soup" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{stoneSoupProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{stoneSoupProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{stoneSoupProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Tiles Table" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{tilesTableProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{tilesTableProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{tilesTableProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Onio" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{onioProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{onioProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{onioProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Glass Plates" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{glassPlatesProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{glassPlatesProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{glassPlatesProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Graf" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{grafProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{grafProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{grafProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Calabashes" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{calabashesProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{calabashesProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{calabashesProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Santos Play Room" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{santosPlayRoomProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{santosPlayRoomProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{santosPlayRoomProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Branca Lisboa" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{brancaLisboaProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{brancaLisboaProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{brancaLisboaProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Mintbase Interviews" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{mintbaseProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{mintbaseProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{mintbaseProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "A Vida Portuguesa" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{aVidaPortuguesaProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{aVidaPortuguesaProject.year}</p>
              <div className="text-base text-gray-700 leading-relaxed mb-6">
                {aVidaPortuguesaProject.descriptionJSX || aVidaPortuguesaProject.description}
              </div>
              {aVidaPortuguesaProject.blogUrl && (
                <a
                  href={aVidaPortuguesaProject.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300"
                >
                  Read the full story
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Adding FNAC project display */}
        {selectedProject === "FNAC" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">FNAC</h2>
              <p className="text-lg text-gray-600 mb-6">2022</p>
              <p className="text-base text-gray-700 leading-relaxed">
                Our team at Mintbase partnered with FNAC Portugal to integrate NEAR-based NFT technology into the "Novos
                Talentos" program. We enabled contest winners to tokenize their works as redeemable NFTs, ensuring
                perpetual royalties and promoting digital ownership. This initiative bridges legacy retail with the Web3
                creator economy, modernizing cultural patronage.
              </p>
            </div>
          </div>
        )}

        {selectedProject === "The Eleven Collection" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{elevenCollectionProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{elevenCollectionProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">{elevenCollectionProject.description}</p>
              {elevenCollectionProject.blogUrl && (
                <a
                  href={elevenCollectionProject.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300"
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
              )}
            </div>
          </div>
        )}

        {selectedProject === "Accepting NFTs Here" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{acceptingNftsProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{acceptingNftsProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed mb-6">{acceptingNftsProject.description}</p>
              {acceptingNftsProject.blogUrl && (
                <a
                  href={acceptingNftsProject.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-gray-300"
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
              )}
            </div>
          </div>
        )}

        {selectedProject === "Qatalyze Interiors" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{qatalyzeInteriorsProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{qatalyzeInteriorsProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{qatalyzeInteriorsProject.description}</p>
            </div>
          </div>
        )}

        {/* Adding MUDE project display */}
        {selectedProject === "MUDE" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{mudeProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{mudeProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{mudeProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Birre Kitchen" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{birreKitchenProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{birreKitchenProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{birreKitchenProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Pool Guard" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{poolGuardProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{poolGuardProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{poolGuardProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Pala Shelves" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{palaShelvesProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{palaShelvesProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{palaShelvesProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Occulo" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{occuloProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{occuloProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{occuloProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Rock Sofa" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{rockSofaProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{rockSofaProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{rockSofaProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Disk Shelves" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{diskShelvesProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{diskShelvesProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{diskShelvesProject.description}</p>
            </div>
          </div>
        )}

        {selectedProject === "Nonu" && (
          <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 max-w-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200 shadow-none">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{nonuProject.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{nonuProject.year}</p>
              <p className="text-base text-gray-700 leading-relaxed">{nonuProject.description}</p>
            </div>
          </div>
        )}

        {clickedButton && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 shadow-none">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-0 bg-white rounded-full transition-all duration-300 ease-out hover:gap-2 hover:pl-4 overflow-hidden shadow-lg border border-gray-200 group cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[200px] transition-all duration-300 ease-out">
                Back
              </span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-none">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </section>

      {/* About Me Modal - Updated */}
      {showAboutMe && (
        <>
          {/* Mobile: Full screen about view */}
          <div className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto">
            {/* Close button - fixed at top */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-6 py-4 flex justify-between items-center border-b border-border">
              <span className="text-sm font-medium text-foreground">About</span>
              <button
                onClick={() => setShowAboutMe(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-4 text-sm text-foreground leading-relaxed">
                <p>
                  Hi, I'm <span className="font-bold text-foreground">Luis Infante</span>, a designer working between craft, industry, and emerging systems, where materials, technologies, and collaborations shape the way ideas take form. My practice is driven by research and process, often evolving through dialogue, experimentation, and the translation of complex ideas into tangible outcomes.
                </p>

                <p>
                  My background is genuinely a bit all over the place, in the best way. Jewelry, sculpture, furniture, spatial design. Then bespoke production for high-end interiors. Then, somehow, leading communications for an AI protocol at the frontier of Web3. I've worked with artisans, architects, engineers, and people who only communicate in GitHub commits. What connects it all, I think, is that I'm most useful at the point where something needs to be made legible. Whether that's a complex piece of furniture or a technical product no one has quite figured out how to explain yet.
                </p>

                <p>
                  I care a lot about how things look, how they're made, and how they're talked about. Usually all three at once.
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.linkedin.com/in/infantedasilva/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="mailto:eluisinf@gmail.com"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  aria-label="Email Contact"
                >
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* References */}
            <div className="mt-6 pt-6 border-t border-border px-6">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">References</h4>

              {/* Marco Sousa Santos */}
              <div className="mb-6">
                <h5 className="text-sm font-bold text-foreground">Marco Sousa Santos</h5>
                <p className="text-xs text-foreground/70 mb-2">CEO and Creative Director at Branca Lisboa</p>
                <p className="text-xs text-foreground/70 italic leading-relaxed">
                  "Luis embraced each project with remarkable dedication, proving to be a fundamental element in
                  achieving our goals. Beyond his dedication and technical skill, Luis Infante is genuinely creative and
                  possesses a rare visual and design culture."
                </p>
              </div>

              {/* Nate Geier */}
              <div className="mb-6">
                <h5 className="text-sm font-bold text-foreground">Nate Geier</h5>
                <p className="text-xs text-foreground/70 mb-2">Co-founder at Bitte Protocol</p>
                <p className="text-xs text-foreground/70 italic leading-relaxed">
                  "Luis is an exceptionally resourceful, skilled, and loyal professional. What he doesn't know, he will
                  quickly figure out, and always with creativity and determination."
                </p>
              </div>

              {/* Paul Kuveke */}
              <div>
                <h5 className="text-sm font-bold text-foreground">Paul Kuveke</h5>
                <p className="text-xs text-foreground/70 mb-2">Co-founder at Bitte Protocol</p>
                <p className="text-xs text-foreground/70 italic leading-relaxed">
                  "Luis is an exceptional talent who brings creativity, dedication, and a sharp strategic eye to
                  everything he does."
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Original modal style */}
          <div className="hidden md:flex fixed inset-0 bg-white/30 backdrop-blur-md z-50 items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close button */}
              <button
                onClick={() => setShowAboutMe(false)}
                className="sticky top-4 right-4 float-right w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* About Me Section */}
              <div className="p-6 md:p-8 md:pr-16">
                <div className="space-y-4 md:space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
                  <p>
                    Hi, I&apos;m <span className="font-bold">Luis Infante</span>, a designer working between craft, industry, and emerging systems, where materials, technologies, and collaborations shape the way ideas take form. My practice is driven by research and process, often evolving through dialogue, experimentation, and the translation of complex ideas into tangible outcomes.
                  </p>

                  <p>
                    My background is genuinely a bit all over the place, in the best way. Jewelry, sculpture, furniture, spatial design. Then bespoke production for high-end interiors. Then, somehow, leading communications for an AI protocol at the frontier of Web3. I&apos;ve worked with artisans, architects, engineers, and people who only communicate in GitHub commits. What connects it all, I think, is that I&apos;m most useful at the point where something needs to be made legible. Whether that&apos;s a complex piece of furniture or a technical product no one has quite figured out how to explain yet.
                  </p>

                  <p>
                    I care a lot about how things look, how they&apos;re made, and how they&apos;re talked about. Usually all three at once.
                  </p>
                </div>

                <div className="flex gap-4 mt-6 md:mt-8">
                  <a
                    href="https://www.linkedin.com/in/infantedasilva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:scale-110 hover:border-gray-300 transition-all duration-300 shadow-sm"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  <a
                    href="mailto:eluisinf@gmail.com"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:scale-110 hover:border-gray-300 transition-all duration-300 shadow-sm"
                    aria-label="Email Contact"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 mx-6 md:mx-8" />

              {/* Marco Sousa Santos Reference */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4 md:mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Marco Sousa Santos</h3>
                    <p className="text-xs md:text-sm text-gray-600">CEO and Creative Director at Branca Lisboa</p>
                    <p className="text-xs text-gray-500 mt-1">December 11, 2025 · Marco managed Luis directly</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                  <p className="italic border-l-4 border-gray-300 pl-3 md:pl-4 text-base md:text-lg">
                    "Luis embraced each project with remarkable dedication, proving to be a fundamental element in
                    achieving our goals. Beyond his dedication and technical skill, Luis Infante is genuinely creative
                    and possesses a rare visual and design culture. This combination of aesthetic sensitivity, deep
                    cultural knowledge, and mastery of representation tools is, in our understanding, crucial for those
                    working in the areas of design and art direction."
                  </p>

                  <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
                    I recommend Luis Infante without reservations for any position or challenge seeking his profile.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-6 md:mx-8" />

              {/* Nate Geier Reference */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4 md:mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Nate Geier</h3>
                    <p className="text-xs md:text-sm text-gray-600">Co-founder at Bitte Protocol</p>
                    <p className="text-xs text-gray-500 mt-1">December 8, 2025 · Nate managed Luis directly</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                  <p className="italic border-l-4 border-gray-300 pl-3 md:pl-4 text-base md:text-lg">
                    "Luis is an exceptionally resourceful, skilled, and loyal professional. What he doesn't know, he
                    will quickly figure out, and always with creativity and determination. His versatility, dedication,
                    and positive attitude made a meaningful impact on our team. Anyone would be lucky to have him."
                  </p>

                  <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
                    During his time at Bitte, Luis managed a wide range of responsibilities, from marketing campaigns
                    and social media to community management and both digital and in-person video content.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-6 md:mx-8" />

              {/* Paul Kuveke Reference */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4 md:mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Paul Kuveke</h3>
                    <p className="text-xs md:text-sm text-gray-600">COO at Bitte</p>
                    <p className="text-xs text-gray-500 mt-1">December 2, 2025 · Paul managed Luis directly</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                  <p className="italic border-l-4 border-gray-300 pl-3 md:pl-4 text-base md:text-lg">
                    "He's not just 'creative' in the vague sense, he's genuinely artistic, with a strong visual eye.
                    Luis was able to bring this skill to helping illustrate the story between product and user. Give him
                    a half-formed concept and he'll turn it into a clear narrative, a visual direction, and concrete
                    assets the team can ship against."
                  </p>

                  <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
                    Luis worked as Creative Strategist at Bitte, where he brought artistic vision and visual
                    storytelling to bridge product concepts with user experience. He consistently brought good energy
                    into every room and project he was part of, making him a great teammate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-white/80 p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-image"
        >
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 shadow-none">
            <button
              onClick={() => setLightboxImage(null)}
              className="flex items-center gap-0 bg-white rounded-full transition-all duration-300 ease-out hover:gap-2 hover:pl-4 overflow-hidden shadow-lg border border-gray-200 group cursor-pointer"
              aria-label="Close lightbox"
            >
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[200px] transition-all duration-300 ease-out">
                Close
              </span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-none">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          </div>
          <Image
            src={lightboxImage.src || "/placeholder.svg"}
            alt={lightboxImage.alt}
            width={1920}
            height={1080}
            quality={95}
            className="w-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            sizes="95vw"
          />
        </div>
      )}
    </main>
  )
}
