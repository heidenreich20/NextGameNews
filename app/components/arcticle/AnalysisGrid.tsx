'use client'
import Image from 'next/image'
import Link from 'next/link'

interface AnalysisItem {
  id:       string
  category: string
  image:    string
  title?:   string
}

// ── Card ──────────────────────────────────────────────────────────────────────

const AnalysisCard = ({ id, category, image, title }: AnalysisItem) => (
  <Link
    href={`/analisis/${id}`}
    className='group relative block aspect-video overflow-hidden rounded'
    aria-label={title ?? category}
  >
    <Image
      src={image}
      alt={title ?? category}
      fill
      sizes='(max-width: 1150px) 50vw, 200px'
      loading='lazy'
      className='object-cover transition-transform duration-500 group-hover:scale-105'
    />
    <div
      className='absolute inset-0 transition-opacity duration-300'
      style={{ background: 'linear-gradient(to top, rgba(4,16,20,0.95) 0%, rgba(4,16,20,0.2) 60%, transparent 100%)' }}
      aria-hidden
    />
    <div
      className='absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      style={{ background: 'linear-gradient(to bottom, var(--color-primary-lt), transparent)' }}
      aria-hidden
    />
    <div className='absolute bottom-0 left-0 right-0 p-2'>
      <p
        className='text-[0.55rem] tracking-[0.15em] uppercase mb-0.5'
        style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
      >
        Análisis
      </p>
      <p
        className='text-sm leading-tight line-clamp-2 text-white'
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
      >
        {title ?? category}
      </p>
    </div>
  </Link>
)

// ── Grid ──────────────────────────────────────────────────────────────────────

const AnalysisGrid = ({ items = [] }: { items: AnalysisItem[] }) => {
  if (items.length === 0) return null

  return (
    <section
      className='grid grid-cols-2 gap-1.5 p-2'
      aria-label='Análisis recientes'
    >
      {items.map((item) => (
        <AnalysisCard key={item.id} {...item} />
      ))}
    </section>
  )
}

export default AnalysisGrid
export type { AnalysisItem }
