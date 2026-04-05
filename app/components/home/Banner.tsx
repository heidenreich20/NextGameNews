'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { NewsItem } from '@/types/types'

// ── Console icons ─────────────────────────────────────────────────────────────

type ConsoleName = 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC'

const CONSOLE_ICONS: Record<ConsoleName, string> = {
  PlayStation: '/icons/playstation.svg',
  Xbox:        '/icons/xbox.svg',
  Nintendo:    '/icons/nintendo.svg',
  PC:          '/icons/pclogo.svg',
}

const ConsoleIcons = ({ platforms }: { platforms: string[] }) => (
  <div className='flex gap-2'>
    {platforms.map((name) => {
      const src = CONSOLE_ICONS[name as ConsoleName]
      if (!src) return null
      return (
        <Image
          key={name}
          src={src}
          alt={`${name} logo`}
          width={24}
          height={24}
          className='w-4 sm:w-6 object-contain'
        />
      )
    })}
  </div>
)

// ── BigNews ───────────────────────────────────────────────────────────────────

interface BigNewsProps {
  image:   string
  text:    string
  type:    string
  console: string[]
}

const BigNews = ({ image, text, type, console: platforms }: BigNewsProps) => (
  <article className='group relative flex overflow-hidden rounded-xl shadow-lg aspect-video'>
    <Image
      src={image}
      alt={text}
      fill
      sizes='(max-width: 1024px) 100vw, 50vw'
      className='object-cover transition-transform duration-700 group-hover:scale-105'
      priority
      fetchPriority='high'
    />
    <div
      className='absolute inset-0'
      style={{ background: 'linear-gradient(to top, rgba(4,16,20,0.97) 0%, rgba(4,16,20,0.4) 50%, transparent 100%)' }}
      aria-hidden
    />
    <div
      className='absolute left-0 top-0 bottom-0 w-0.75'
      style={{ background: 'linear-gradient(to bottom, var(--color-primary-lt), transparent)' }}
      aria-hidden
    />
    <div className='absolute bottom-0 left-0 right-0 flex flex-col gap-1 px-4 pb-4'>
      <span className='category-pill w-fit'>{type}</span>
      <ConsoleIcons platforms={platforms} />
      <p
        className='text-white text-sm sm:text-base xl:text-2xl leading-snug mt-1'
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
      >
        {text}
      </p>
    </div>
  </article>
)

// ── SmallNews ─────────────────────────────────────────────────────────────────

interface SmallNewsProps {
  image:     string
  text:      string
  href:      string
  priority?: boolean
}

const SmallNews = ({ image, text, href, priority = false }: SmallNewsProps) => (
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

// ── Banner ────────────────────────────────────────────────────────────────────

const Banner = ({ newsList = [] }: { newsList: NewsItem[] }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || newsList.length === 0) {
    return <div className='min-h-100 bg-secondary' />
  }

  return (
    <div className='flex flex-col gap-8' style={{ background: 'var(--color-secondary)' }}>
      <hr className='gold-rule m-0' />
      <div id='swiper' className='w-full csm:w-3/4 csm:mx-auto px-3 csm:px-0 pt-4'>
        <Swiper
          style={{ borderRadius: '8px' }}
          spaceBetween={10}
          slidesPerView={1}
          loop={newsList.length > 2}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{ 1150: { slidesPerView: 2, slidesPerGroup: 2 } }}
        >
          {newsList.map((news) => (
            <SwiperSlide key={news.id}>
              <BigNews
                type={news.type}
                console={news.console}
                text={news.title}
                image={news.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {newsList.length > 2 && (
        <div className='hidden md:block pb-6'>
          <div className='csm:w-3/4 mx-auto px-3 csm:px-0 mb-4 flex items-center gap-4'>
            <span
              className='font-(--font-title) text-sm tracking-[0.2em] uppercase'
              style={{ color: 'var(--color-primary-lt)' }}
            >
              También te puede interesar
            </span>
            <div className='flex-1 h-px' style={{ background: 'rgba(184,151,42,0.2)' }} />
          </div>
          <div className='csm:w-3/4 mx-auto px-3 csm:px-0 flex gap-4'>
            {newsList.slice(2, 6).map((news, index) => (
              <SmallNews
                key={news.id}
                image={news.image}
                text={news.title}
                href={`/analisis/${news.id}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      )}
      <hr className='gold-rule m-0' />
    </div>
  )
}

export default Banner