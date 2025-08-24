import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Luis Infante
      </h1>
      <p className="mb-4">
        I'm a designer with a hybrid background in furniture, spatial, and visual storytelling — now diving into tech to explore new formats and ecosystems for creative work. From prototyping chairs to composing playful brass walls, I thrive in the space between concept and execution. Currently rebuilding my portfolio as a living digital studio — and learning to code along the way.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
