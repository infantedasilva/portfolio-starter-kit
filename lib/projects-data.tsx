export const projectsData: Record<
  string,
  {
    name: string
    year: string
    category: string
    description: string
    blogUrl?: string
    images: Array<{
      src: string
      alt: string
      isYouTube?: boolean
      isVideo?: boolean
      isLarger?: boolean
    }>
    video?: {
      src: string
      alt: string
    }
  }
> = {
  "mars-chair": {
    name: "Mars Chair",
    year: "2017",
    category: "Furniture Design",
    description:
      "This chair was born by mistake during a research at Branca Lisboa studio for an armchair for a hospital office. Is the reflection that when we are in search of an answer to design problems, we discover other pleasures and relevances from which we want to give life and we develop them in the background. Materials: Oak, Walnut",
    images: [
      { src: "/images/mars-2.jpg", alt: "Mars Chair - Main View" },
      { src: "/images/img-1882.jpg", alt: "Mars Chair - Two Chairs Side by Side" },
      { src: "/images/mars-2b7.jpg", alt: "Mars Chair - At Desk Context" },
      { src: "/images/img-1873.jpg", alt: "Mars Chair - Top Angle View" },
      { src: "/images/img-1847.jpg", alt: "Mars Chair - Stacked Detail" },
      { src: "/images/img-1755.jpg", alt: "Mars Chair - Joinery Detail" },
    ],
  },
  "stone-soup": {
    name: "Stone Soup",
    year: "2020",
    category: "Furniture Design",
    description:
      "Born from a school research project where I 3D scanned and replicated stones. Through constellation patterns, the machine distinguished each side of the scanned objects. I fell in love with these transparent relationships visible in the glass. The tops are handcrafted in northern Portugal with customizable color compositions. Materials: Fused Glass, Lacquered Iron.",
    images: [
      { src: "/stone-soup-modular.jpg", alt: "Stone Soup - Modular Tables" },
      { src: "/images/1.jpg", alt: "Stone Soup - Red Glass Table" },
      { src: "/images/dsc-0294.jpeg", alt: "Stone Soup - Glass Edge Detail" },
      { src: "/images/img-9238.png", alt: "Stone Soup - Transparency Study" },
    ],
  },
  "tiles-table": {
    name: "Tiles Table",
    year: "2020",
    category: "Furniture Design",
    description:
      "Graphic ceramic table designed for outdoor use. The tabletop was developed using four distinct clay bodies (terracotta, yellow, white, and black stoneware) each with unique shrinkage and texture qualities. Created in collaboration with Qatalyse.",
    images: [
      { src: "/images/tilestablethu.jpg", alt: "Tiles Table - Thumbnail" },
      { src: "/images/editada-201.jpg", alt: "Tiles Table - Overhead Pattern View" },
      { src: "/images/editada-202.jpg", alt: "Tiles Table - Outdoor Context" },
      { src: "/images/img-8296.jpeg", alt: "Tiles Table - Assembly Process" },
      { src: "/images/ezgif-com-gif-maker.gif", alt: "Tiles Table - Animated 3D Rendering Rotating View" },
    ],
  },
  onio: {
    name: "Onio",
    year: "2016",
    category: "Objects & Systems",
    description:
      "A wood folding technique developed through successive cutting that allows curved corners in wooden frames. The mechanized process leaves visible traces that blend parametric precision with artisanal warmth. Materials: Oak, Burnt Oak",
    images: [
      { src: "/onio-detail.jpg", alt: "Onio - Detail" },
      { src: "/images/dsc0265.jpg", alt: "Onio - Burnt Oak Stool Context" },
      { src: "/images/2.jpg", alt: "Onio - Oak Frame with Curved Corners" },
      { src: "/images/dsc0263.jpg", alt: "Onio - Vertical Frame Installation" },
      { src: "/images/dsc0351.jpg", alt: "Onio - Corner Detail Showing Cutting Technique" },
    ],
  },
  "glass-plates": {
    name: "Glass Plates",
    year: "2020",
    category: "Lighting",
    description:
      "My first design for the glass blowing industry that responds in a fun way through overlapping colors and shapes dictated by the technique itself. Projected to several bathrooms in a Qatalyse project. The luminaires can be suspended from the ceiling or installed on walls. Materials: Colored Glass, Lacquered Iron",
    images: [
      { src: "/images/asset-201-402x-100.jpg", alt: "Glass Plates - Thumbnail" },
      { src: "/images/33.jpg", alt: "Glass Plates - Ceiling Installation Orange" },
      { src: "/images/11.jpg", alt: "Glass Plates - Ceiling Installation Yellow" },
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
      { src: "/images/4.png", alt: "Glass Plates - Turquoise Blue with Green Center" },
      { src: "/images/3.png", alt: "Glass Plates - Coral Peach Gradient Design" },
      { src: "/images/44.jpg", alt: "Glass Plates - Green Ceiling Installation with Ambient Glow" },
    ],
  },
  graf: {
    name: "Graf",
    year: "2017",
    category: "Objects & Systems",
    description:
      "The first project I developed at Branca began as fabric displays for furniture fairs, evolving into decorative and acoustic panels. We developed a system with four usage applications: Wall, Floor, Ceiling (Suspension), and furniture integration. A production plan was created to reduce material waste and ensure cost-effective manufacturing. Materials: Fabrics, Valcromat, Lacquered Metal",
    images: [
      { src: "/graf2017-circular-panel.jpeg", alt: "Graf - Circular Panel" },
      { src: "/images/luisinfacnte-28l-2911-20-281-29.jpg", alt: "Graf - Technical Panel Configuration Diagram" },
      { src: "/images/color2.jpg", alt: "Graf - Black Acoustic Panels with Furniture Integration" },
      { src: "/images/biomboconjunto.jpg", alt: "Graf - Freestanding Panel System Configuration" },
    ],
  },
  calabashes: {
    name: "Calabashes",
    year: "2021",
    category: "Lighting",
    description:
      "Magic Objects Collection is an ongoing research into ordinary tools and vessels charged with ritual, symbolism, or myth. For centuries, calabashes have been used as vessels, instruments, and ritual symbols. This project appropriates that heritage by transforming them into suspended lights. Through artisanal reconfiguration, it seeks to preserve their presence while translating it into a contemporary design language. Materials: painted calabashes with glossy finish, repurposed climbing rope.",
    images: [
      { src: "/images/dsc09509-edit.jpg", alt: "Calabashes - Clustered Pendant Configuration" },
      {
        src: "/images/speculating-20on-20-20foam-20noodles-20-2b-20sand-20casting.jpg",
        alt: "Calabashes - Design Process and Construction Method",
      },
      { src: "/images/dsc07964.jpg", alt: "Calabashes - Natural Gourd Inspiration" },
      { src: "/images/img-6958.jpeg", alt: "Calabashes - Artisan Painting Process" },
    ],
  },
  "santos-play-room": {
    name: "Santos Play Room",
    year: "2023",
    category: "Interior Architecture",
    description:
      "Project for a series of children's rooms and play areas, each designed with a focus on softness, functionality, and imaginative expression with custom-built elements, such as: beds, shelving systems, desks, integrated lighting, giving each space its own character while maintaining a cohesive aesthetic throughout the home. Playful architectural gestures, including curved walls, interior circular windows (oculi), and sculptural lighting features, create moments of discovery and connection between spaces.",
    images: [
      { src: "/images/qatalyse-20portfolio.jpeg", alt: "Santos Play Room - Overview" },
      { src: "/images/cama-201.jpg", alt: "Santos Play Room - Bedroom Overview with Pink Headboard" },
      { src: "/images/secretaria-20detail-202.jpg", alt: "Santos Play Room - Mobile Desk Detail" },
      { src: "/images/detalhe-20cama.jpg", alt: "Santos Play Room - Platform Bed Construction Detail" },
      { src: "/images/apartamento-20tvshel-20es.jpg", alt: "Santos Play Room - Semi-Circular Wall Shelves" },
      { src: "/images/desk.jpg", alt: "Santos Play Room - Mobile Desk Full View" },
    ],
  },
  "branca-lisboa": {
    name: "Branca Lisboa",
    year: "2019",
    category: "Visual Communication & Media",
    description:
      "After finishing the Product Design course, I had my first professional contact in Branca-Lisboa, directed by Marco Sousa Santos. For two years I was related with several departments that compose Branca-Lisboa studio. From the participation in interior projects to the elaboration of new products for the brand. It was also in the range of my responsibilities in the company communication as newsletters development, product campaigns and management of social networks and the brand site.",
    images: [
      { src: "/images/img-9010t.jpg", alt: "Branca Lisboa - Thumbnail" },
      {
        src: "/images/branca-lisboa-two-chairs.gif",
        alt: "Branca Lisboa - Animated Rotation of Gray and Black Ergonomic Chairs",
      },
      { src: "/images/branca-lisboa-overhead.jpg", alt: "Branca Lisboa - Overhead View of Multiple Chair Backs" },
      { src: "/images/branca-lisboa-white-stool.gif", alt: "Branca Lisboa - Animated Rotation of White Wooden Stool" },
      { src: "/images/branca-lisboa-red-chair.jpg", alt: "Branca Lisboa - Single Red Chair Front View" },
      {
        src: "/images/branca-lisboa-overhead-black.jpg",
        alt: "Branca Lisboa - Overhead View of Black Ergonomic Kneeling Chair",
      },
      { src: "/images/branca-lisboa-desk.jpg", alt: "Branca Lisboa - Walnut Wood Desk with Curved Detail" },
    ],
  },
  "mintbase-interviews": {
    name: "Mintbase Interviews",
    year: "2022",
    category: "Visual Communication & Media",
    description:
      "During NEARcon 2022, I conducted a series of interviews to showcase the Mintbase ecosystem. More than an NFT marketplace, Mintbase provides toolkits for developers to build NFT products and explore utility NFTs across ticketing, fan engagement, and Web 3.0 platforms.",
    images: [
      {
        src: "/images/copy-20of-20nearcon-20interview-20plans-20-20-20-289-29.jpg",
        alt: "Mintbase Interviews - Thumbnail",
      },
      { src: "https://www.youtube.com/embed/S7JwKm8u1qY", alt: "Mintbase Interviews - Video 1", isYouTube: true },
      { src: "https://www.youtube.com/embed/ybzxiLHOHgQ", alt: "Mintbase Interviews - Video 2", isYouTube: true },
      { src: "https://www.youtube.com/embed/rQALGqiXiLk", alt: "Mintbase Interviews - Video 3", isYouTube: true },
      {
        src: "https://www.youtube.com/embed/ulG7-d5M02o",
        alt: "Mintbase Interviews - Featured Video",
        isYouTube: true,
        isLarger: true,
      },
    ],
  },
  "a-vida-portuguesa": {
    name: "A Vida Portuguesa",
    year: "2024",
    category: "Visual Communication & Media",
    description:
      'Visual Communication & Media project for <a href="https://www.avidaportuguesa.com/en" target="_blank" rel="noopener noreferrer">A Vida Portuguesa</a>, a Portuguese brand that celebrates Portuguese craftsmanship and heritage.',
    images: [{ src: "/images/a-vida-portuguesa.jpg", alt: "A Vida Portuguesa" }],
  },
  fnac: {
    name: "FNAC",
    year: "2022",
    category: "Visual Communication & Media",
    description:
      'Our team at Mintbase partnered with FNAC Portugal to integrate NEAR-based NFT technology into the "Novos Talentos" program. We enabled contest winners to tokenize their works as redeemable NFTs, ensuring perpetual royalties and promoting digital ownership. This initiative bridges legacy retail with the Web3 creator economy, modernizing cultural patronage.',
    images: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1768334502446-PLAqNUD1tfjf7TMlmVrTbLZRldt3ze.mp4",
        alt: "FNAC Mintbase Partnership Video",
        isVideo: true,
      },
      {
        src: "https://www.youtube.com/embed/cczPEdCNcGU",
        alt: "FNAC Mintbase Partnership on YouTube",
        isYouTube: true,
        isLarger: true,
      },
    ],
  },
  "accepting-nfts-here": {
    name: "Accepting NFTs Here",
    year: "2022",
    category: "Visual Communication & Media",
    description:
      "The 'Accepting NFTs Here' project by Mintbase tested how NFTs could be used in real life in Lisbon. Local businesses like cafés, bars, and shops accepted NFTs as a way for customers to redeem real products, such as drinks, food, or other items. Instead of being only digital collectibles, the NFTs worked like vouchers. The project showed how blockchain and NFTs can be used in everyday situations and help connect digital ownership with physical places.",
    blogUrl: "https://medium.com/mintbase/accepting-nfts-here-bringing-nfts-to-real-life-in-the-streets-of-lisbon-2de5e0892062",
    images: [
      { src: "/images/accepting-nfts-here.jpg", alt: "Accepting NFTs Here signage at restaurant" },
      { src: "/images/accepting-nfts-table.jpg", alt: "Accepting NFTs Here sign on table" },
      { src: "/images/accepting-nfts-dumplings.jpg", alt: "Accepting NFTs Here at dumplings restaurant" },
      { src: "/images/accepting-nfts-map.jpg", alt: "Accepting NFTs Here map of Lisbon locations" },
    ],
  },
  "the-eleven-collection": {
    name: "The Eleven Collection",
    year: "2021",
    category: "Visual Communication & Media",
    description:
      "This collaboration aimed to translate selected moments from FKA twigs' The Eleven performance at Sotheby's into collectible digital works. The project focused on authorship, performance, and digital ownership. I worked directly with the agency managing the partnership, producing visual assets to communicate the concept and mechanics of the release. I also authored the accompanying blog post explaining the collaboration and its cultural context.",
    blogUrl: "https://bitteprotocol.substack.com/p/the-eleven-collection-by-fka-twigs",
    images: [
      { src: "/images/fka-twigs-eleven-collection.webp", alt: "FKA twigs - The Eleven Collection" },
      { src: "/images/eleven-collection-interface.jpg", alt: "The Eleven Collection interface and visuals" },
      { src: "/images/eleven-collection-performance.gif", alt: "FKA twigs performance from The Eleven Collection" },
    ],
  },
  mude: {
    name: "MUDE",
    year: "2017",
    category: "Interior Architecture",
    description:
      "Wall Panels project for Museu do Design e da Moda, Lisbon, who delegated to Branca-Lisboa the design for some new spaces that the museum would assume. The Panel that I helped develop would cover 14 meters of continuous wall, and is constructed under the same technology as some of Branca's plywood products in the collection. Materials: Oak Plywood",
    images: [
      { src: "/images/mude-logo-model.jpg", alt: "MUDE - Architectural Wood Relief" },
      {
        src: "/images/portfoldddio-20-20luis-20x-20quentin.jpeg",
        alt: "MUDE - Oak Plywood Panel with Concentric Arc Pattern",
      },
    ],
  },
  "birre-kitchen": {
    name: "Birre Kitchen",
    year: "2024",
    category: "Interior Architecture",
    description:
      "In this interior project, designed entirely by Qatalyse, where most of the elements were designed by measure. A demanding project in terms of detail, where we designed lighting, handles, wine cabinet, sofas, shelving systems, tables, beds, mirrors, showers, among other details.",
    images: [
      { src: "/images/birre-kitchen.jpg", alt: "Birre Kitchen - Thumbnail" },
      {
        src: "/images/birre-kitchen-handle-detail.jpg",
        alt: "Birre Kitchen - Custom burgundy red elongated handle detail",
      },
      {
        src: "/images/birre-kitchen-full-view.jpg",
        alt: "Birre Kitchen - Full view with beige cabinets and burgundy accents",
      },
      {
        src: "/images/birre-kitchen-concept.jpg",
        alt: "Birre Kitchen - Conceptual rendering with white minimalist design",
      },
    ],
  },
  "pool-guard": {
    name: "Pool Guard",
    year: "2023",
    category: "Objects & Systems",
    description:
      "Embarked on a journey with laminated glass for a Qatalyse project. The aim was to create a unique and playful piece that not only injects a sense of light-heartedness but also enhances the safety of our client's pool area. Drawing inspiration from church stained glass puzzles, we dared to reinvent the concept, fusing a small workshop in Ancião and the leading glass industry in Aveiro.",
    images: [
      { src: "/images/350090826-960386571671209-3283063603139759009-n.jpeg", alt: "Pool Guard - Thumbnail" },
      { src: "/images/img-4943.jpeg", alt: "Pool Guard - Color Sample Mockup" },
      { src: "/images/2022-05-25-2010.jpg", alt: "Pool Guard - Installed by Infinity Pool" },
      { src: "/images/whatsapp-20image-202021-10-21-20at-2011.jpeg", alt: "Pool Guard - Workshop Fabrication Layout" },
    ],
    video: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4944-ZJGLNVCWFJYWeUqcoABVDc8nfQ4ATC.MOV",
      alt: "Pool Guard - Installation Video",
    },
  },
  "pala-shelves": {
    name: "Pala Shelves",
    year: "2023",
    category: "Furniture Design",
    description:
      "In response to a simple movement of linking a way into function, this shelf is born within the Qatalyse Santos Project. Two half brass circles with 25 cm diameter meeting in a corner. Decoration and the reflection of the function. Material: Brass",
    images: [
      { src: "/images/ficheiro-002.jpeg", alt: "Pala Shelves - Thumbnail" },
      { src: "/images/pala-shelv.jpg", alt: "Pala Shelves - Gold Brass Finish with Ceramic Vase" },
      { src: "/images/apartamento-tvshel-es.jpg", alt: "Pala Shelves - Multiple Sizes Composition" },
    ],
  },
  occulo: {
    name: "Occulo",
    year: "2024",
    category: "Lighting",
    description:
      "Circular windows developed in partnership with a handmade glass workshop located in Marinha Grande, Portugal, assuming a rough glass with a graphic design that reflects this light transmission, almost like a star, bringing dynamic visual interest to interior spaces while providing ambient lighting. Materials: Brass, Artisanal Glass",
    images: [
      { src: "/images/occulo.jpg", alt: "Occulo - Thumbnail" },
      { src: "/images/dsc-0171.jpg", alt: "Occulo - Workshop Process: Artisan Assembling Red Burgundy Glass Discs" },
      { src: "/images/dsc-0163.jpg", alt: "Occulo - Workshop Process: Blue Turquoise Glass Discs" },
      { src: "/images/dsc-0183.jpg", alt: "Occulo - Finished Red Burgundy Glass Discs with Brass Frame" },
      { src: "/images/untitled-design-3.gif", alt: "Occulo - Animated Rotating View of Luminaire" },
    ],
  },
  "rock-sofa": {
    name: "Rock Sofa",
    year: "2024",
    category: "Furniture Design",
    description:
      "Designed for a room in a Qatalyse project with an organic lifestyle we created this sofa where the user can decide the position of the back, these large pillows with the right weight to remain static when sitting but light enough to be lifted. It is a sofa that can seat 4 or more people, depending on the arrangement of the pillows. Materials: Oak, foams and fabric.",
    images: [
      { src: "/images/rocksofa.jpg", alt: "Rock Sofa - Thumbnail" },
      { src: "/images/rock-sofa-side-view.jpg", alt: "Rock Sofa - Side View with Rounded Pillows" },
      { src: "/images/rock-sofa-front-view.jpg", alt: "Rock Sofa - Front View with Four Grey Cushion Elements" },
      { src: "/images/rock-sofa-seated.jpg", alt: "Rock Sofa - Seating View Demonstrating Modular Arrangement" },
    ],
  },
  "disk-shelves": {
    name: "Disk Shelves",
    year: "2024",
    category: "Furniture Design",
    description:
      "A custom shelving system designed and fabricated in collaboration with Qatalyse. The structure is defined by a series of circular wooden shelves and modular storage boxes, all elegantly suspended between slim brass tubes. The brass elements extend from floor to ceiling, providing both structural support and a refined vertical rhythm throughout the space. The result is a light, sculptural storage solution that blends functional display with a clean, contemporary aesthetic. Material: Brass, oak or walnut.",
    images: [
      { src: "/images/disk-shelves.jpg", alt: "Disk Shelves - Thumbnail" },
      { src: "/images/disk-shelves-full-system.jpg", alt: "Disk Shelves - Complete Modular Shelving System" },
    ],
  },
  nonu: {
    name: "Nonu",
    year: "2024",
    category: "Objects & Systems",
    description:
      "It's the dish dryer inspired by the most practical choices of the users, made to think about the visual respect that the objects have with the space and the ease of use. This object wants to provide a more organic organization at the moment the dishes need to dry before being tidied up, so NONU can take various forms to receive different types of dishes and even to be tidy. Materials: RuberCork, Acrilic",
    images: [
      { src: "/images/nonu.jpg", alt: "Nonu - Thumbnail" },
      { src: "/images/nonu-with-plate.jpg", alt: "NONU cork dish drainer holding white ceramic plate" },
      { src: "/images/nonu-empty.jpg", alt: "NONU cork dish drainer empty view" },
      { src: "/images/nonu-collapsed.jpg", alt: "NONU cork dish drainer in collapsed folded state" },
    ],
  },
}

export type ProjectSlug = keyof typeof projectsData

export const projectNameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export const getAllProjectSlugs = (): ProjectSlug[] => {
  return Object.keys(projectsData) as ProjectSlug[]
}

// Helper to get project by name (matches the mobile list)
export const getProjectByName = (name: string) => {
  const slug = projectNameToSlug(name)
  return projectsData[slug as ProjectSlug]
}
