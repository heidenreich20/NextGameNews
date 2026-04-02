'use client'
import { useState, useCallback } from 'react'
import ArticleCard from './ArticleCard'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import { NewsItem } from '../types/types'

dayjs.locale('es')
dayjs.extend(relativeTime)

const API_URL = process.env.NEXT_PUBLIC_API_URL
const LOAD_STEP = 10

interface LoadMoreButtonProps {
  initialCount: number
  totalNewsCount: number
}

const LoadMoreButton = ({ initialCount, totalNewsCount }: LoadMoreButtonProps) => {
  const [extraNews, setExtraNews] = useState<NewsItem[]>([])
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalLoaded = initialCount + extraNews.length
  const hasMore = totalLoaded < totalNewsCount

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/news?page=${page}&limit=${LOAD_STEP}`)
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

      const data = await res.json()
      const fetched: NewsItem[] = data.newsList ?? []

      if (fetched.length > 0) {
        setExtraNews(prev => [...prev, ...fetched])
        setPage(prev => prev + 1)
      }
    } catch (err) {
      console.error('Error loading more news:', err)
      setError('No se pudieron cargar más noticias. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page])

  return (
    <>
      {/* Extra articles rendered in the same visual column as BodyNews */}
      {extraNews.length > 0 && (
        <ul
          className='flex flex-col gap-2 px-3 csm:px-0 pb-2'
          aria-label='Más artículos'
        >
          {extraNews.map((item, index) => (
            <ArticleCard
              key={item._id}
              id={item._id}
              title={item.title}
              image={item.image}
              author={item.author}
              category={item.category}
              time={dayjs(item.createdAt).fromNow()}
              priority={index === 0}
            />
          ))}
        </ul>
      )}

      {error && (
        <p
          className='text-center text-sm px-4 py-2'
          style={{ fontFamily: 'var(--font-article)', color: '#f87171' }}
        >
          {error}
        </p>
      )}

      {hasMore && (
        <div
          className='flex flex-col items-center gap-2 px-4 py-8'
          style={{ borderTop: '1px solid rgba(184,151,42,0.1)' }}
        >
          <button
            onClick={loadMore}
            disabled={loading}
            className='group relative px-10 py-3 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
            style={{
              fontFamily: 'var(--font-article)',
              color: 'var(--color-secondary)',
              backgroundColor: 'var(--color-primary)',
              border: '2px solid var(--color-primary-lt)',
              boxShadow: '4px 4px 0px 0px rgba(184,151,42,0.4)',
            }}
          >
            <span className='relative z-10'>
              {loading ? 'Cargando...' : 'Cargar más noticias'}
            </span>
            <div
              className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
              style={{
                background: 'linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          </button>

          <p
            className='text-[0.65rem] tracking-wide'
            style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.3)' }}
          >
            {totalLoaded} de {totalNewsCount} artículos
          </p>
        </div>
      )}
    </>
  )
}

export default LoadMoreButton