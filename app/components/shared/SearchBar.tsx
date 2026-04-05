'use client'
import { useState, useCallback, useEffect, useRef, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import { fetchAllNews } from '@/lib/api'
import { NewsItem } from '@/types/types'

dayjs.locale('es')
dayjs.extend(relativeTime)

// ── Constants ─────────────────────────────────────────────────────────────────

const DEBOUNCE_MS = 300
const MAX_RESULTS = 6

// ── Helpers ───────────────────────────────────────────────────────────────────

const fuzzyMatch = (needle: string, haystack: string): boolean => {
  const n = needle.toLowerCase()
  const h = haystack.toLowerCase()
  let i = 0
  for (const char of h) {
    if (char === n[i]) i++
    if (i === n.length) return true
  }
  return false
}

// ── Sub-components ────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'
    fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <circle cx='11' cy='11' r='8' /><line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
)

const Spinner = () => (
  <div
    className='h-4 w-4 rounded-full border-2 animate-spin'
    style={{ borderColor: 'var(--color-secondary)', borderTopColor: 'transparent' }}
    role='status'
    aria-label='Buscando'
  />
)

const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>
  const q = query.toLowerCase()
  const chars = text.split('')
  let qi = 0
  return (
    <>
      {chars.map((char, i) => {
        const isMatch = qi < q.length && char.toLowerCase() === q[qi]
        if (isMatch) qi++
        return isMatch
          ? <mark key={i} className='bg-transparent font-bold' style={{ color: 'var(--color-primary-lt)' }}>{char}</mark>
          : <span key={i}>{char}</span>
      })}
    </>
  )
}

interface ResultItemProps {
  item:     NewsItem
  query:    string
  onSelect: () => void
}

const ResultItem = ({ item, query, onSelect }: ResultItemProps) => (
  <li>
    <Link
      href={`/analisis/${item.id}`}
      onClick={onSelect}
      className='flex gap-3 p-2 rounded transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-1'
      style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
    >
      <div className='relative w-20 h-14 shrink-0 overflow-hidden rounded'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes='80px'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col justify-between min-w-0 py-0.5'>
        <div>
          <span
            className='text-[0.6rem] tracking-[0.15em] uppercase block mb-0.5'
            style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
          >
            {item.category}
          </span>
          <p
            className='text-sm leading-tight line-clamp-2 text-white'
            style={{ fontFamily: 'var(--font-title)' }}
          >
            <HighlightMatch text={item.title} query={query} />
          </p>
        </div>
        <span
          className='text-[0.65rem] mt-1'
          style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.35)' }}
        >
          {item.author} · {dayjs(item.createdAt).fromNow()}
        </span>
      </div>
    </Link>
  </li>
)

// ── SearchBar ─────────────────────────────────────────────────────────────────

const SearchBar = () => {
  const [value,    setValue]   = useState('')
  const [results,  setResults] = useState<NewsItem[]>([])
  const [allNews,  setAllNews] = useState<NewsItem[]>([])
  const [loading,  setLoading] = useState(false)
  const [open,     setOpen]    = useState(false)
  const inputId    = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchAllNews().then(setAllNews).catch(console.error)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = useCallback((query: string) => {
    if (!query.trim()) { setResults([]); setOpen(false); return }

    setLoading(true)
    const matches = allNews
      .filter(item =>
        fuzzyMatch(query, item.title)    ||
        fuzzyMatch(query, item.category) ||
        fuzzyMatch(query, item.author)
      )
      .slice(0, MAX_RESULTS)

    setResults(matches)
    setOpen(matches.length > 0)
    setLoading(false)
  }, [allNews])

  useEffect(() => {
    const timer = setTimeout(() => search(value), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [value, search])

  const handleClear = useCallback(() => {
    setValue('')
    setResults([])
    setOpen(false)
  }, [])

  return (
    <div ref={wrapperRef} className='relative flex flex-col'>
      <div className='sr-only' aria-live='polite' aria-atomic='true'>
        {value && `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrados`}
      </div>

      <form role='search' onSubmit={e => e.preventDefault()} className='flex items-center'>
        <label htmlFor={inputId} className='sr-only'>Buscar artículos</label>
        <div className='relative flex items-center'>
          <input
            id={inputId}
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder='Buscar...'
            autoComplete='off'
            aria-expanded={open}
            aria-controls='search-results-list'
            aria-autocomplete='list'
            aria-haspopup='listbox'
            className='w-40 csm:w-52 focus:w-52 csm:focus:w-64 py-1 pl-3 pr-7 text-sm outline-none transition-all duration-200'
            style={{
              background:   'var(--color-surface)',
              border:       '1px solid rgba(184,151,42,0.25)',
              borderRadius: '4px 0 0 4px',
              color:        'var(--color-cream)',
              fontFamily:   'var(--font-article)',
            }}
          />
          {value && (
            <button
              type='button'
              onClick={handleClear}
              aria-label='Limpiar búsqueda'
              className='absolute right-2 flex items-center justify-center text-[10px] opacity-40 hover:opacity-80 transition-opacity'
              style={{ color: 'var(--color-cream)' }}
            >
              ✕
            </button>
          )}
        </div>
        <button
          type='submit'
          aria-label='Ejecutar búsqueda'
          className='flex items-center justify-center px-2.5 h-7.5 transition-opacity duration-200 hover:opacity-80'
          style={{
            background:   'var(--color-primary)',
            border:       '1px solid var(--color-primary)',
            borderRadius: '0 4px 4px 0',
            color:        'var(--color-secondary)',
          }}
        >
          {loading ? <Spinner /> : <SearchIcon />}
        </button>
      </form>

      {open && results.length > 0 && (
        <div
          className='absolute top-full left-0 mt-1 w-80 z-50 rounded overflow-hidden shadow-2xl'
          style={{ background: 'var(--color-surface)', border: '1px solid rgba(184,151,42,0.25)' }}
        >
          <div className='px-3 py-2' style={{ borderBottom: '1px solid rgba(184,151,42,0.15)' }}>
            <span
              aria-hidden
              className='text-[0.6rem] tracking-[0.2em] uppercase'
              style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
            >
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ul
            id='search-results-list'
            className='flex flex-col py-1 max-h-[70vh] overflow-y-auto divide-y divide-white/5'
          >
            {results.map(item => (
              <ResultItem key={item.id} item={item} query={value} onSelect={handleClear} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar