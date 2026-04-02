'use client'
import '../globals.css'
import Image from 'next/image'
import Link from 'next/link'

interface SmallNewsProps {
  image: string
  text: string
  href?: string
  priority?: boolean
}

const SmallNews = ({ image, text, href = '#', priority = false }: SmallNewsProps) => (
  <Link
    href={href}
    className='group relative flex w-full overflow-hidden rounded-lg aspect-video'
    aria-label={text}
  >
    <Image
      src={image}
      alt={text}
      fill
      sizes='(max-width: 720px) 100vw, 33vw'
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className='object-cover transition-transform duration-500 group-hover:scale-105'
    />
    <div
      className='absolute inset-0 rounded-lg'
      style={{ background: 'linear-gradient(to top, rgba(4,16,20,0.95) 0%, transparent 60%)' }}
      aria-hidden
    />
    <div
      className='absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      style={{ background: 'linear-gradient(to bottom, var(--color-primary-lt), transparent)' }}
      aria-hidden
    />
    <h2
      className='absolute bottom-0 left-0 right-0 p-3 text-sm xl:text-lg leading-snug'
      style={{
        fontFamily: 'var(--font-title)',
        color: '#fff',
        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
      }}
    >
      {text}
    </h2>
  </Link>
)

export default SmallNews