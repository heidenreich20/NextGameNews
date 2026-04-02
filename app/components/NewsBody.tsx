// app/components/NewsBody.tsx
import '../globals.css'
import Link from 'next/link'
import ReviewNews from '../utils/ReviewNews'
import BodyNews from '../utils/BodyNews'
import LoadMoreButton from '../utils/LoadMoreButton'
import { NewsItem } from '../types/types'

const SectionHeader = () => (
  <div className='flex items-end gap-4 px-5 pt-6 pb-4'>
    <h2
      className='text-3xl md:text-5xl leading-none'
      style={{ fontFamily: 'var(--font-title)', color: 'var(--color-cream)' }}
    >
      Últimas noticias
    </h2>
    <span
      className='hidden csm:block text-xs tracking-[0.18em] uppercase pb-1'
      style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
    >
      Noticias hoy
    </span>
  </div>
)

const AnalysisSidebar = ({ analysisList }: { analysisList: NewsItem[] }) => (
  <aside
    className='hidden md:flex flex-col rounded-lg overflow-hidden'
    style={{ border: '1px solid rgba(184,151,42,0.2)', background: 'var(--color-surface)' }}
  >
    <div className='px-4 py-3' style={{ borderBottom: '1px solid rgba(184,151,42,0.2)' }}>
      <h2
        className='text-2xl tracking-wide'
        style={{ fontFamily: 'var(--font-title)', color: 'var(--color-cream)' }}
      >
        Análisis
      </h2>
    </div>
    <div className='flex-1 p-2'>
      <ReviewNews reviews={analysisList} />
    </div>
    <div style={{ borderTop: '1px solid rgba(184,151,42,0.15)' }}>
      <Link
        href='/analisis'
        className='flex items-center justify-center py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-80'
        style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
      >
        Más análisis
      </Link>
    </div>
  </aside>
)

interface NewsBodyProps {
  newsList:       NewsItem[]
  analysisList:   NewsItem[]
  totalNewsCount: number
}

const NewsBody = ({ newsList, analysisList, totalNewsCount }: NewsBodyProps) => (
  <section
    className='mx-auto my-4 csm:w-3/4 csm:rounded-lg overflow-hidden'
    style={{
      background: 'var(--color-surface)',
      border:     '1px solid rgba(184,151,42,0.15)',
      boxShadow:  '0 32px 80px -8px rgba(0,0,0,0.6)',
    }}
  >
    <SectionHeader />
    <hr className='gold-rule mx-5 mb-4' style={{ opacity: 0.4 }} />
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 px-3 pb-3'>
      <div className='md:col-span-2 flex flex-col'>
        <BodyNews articles={newsList} />
        <LoadMoreButton
          totalNewsCount={totalNewsCount}
          initialCount={newsList.length}
        />
      </div>
      <AnalysisSidebar analysisList={analysisList} />
    </div>
  </section>
)

export default NewsBody