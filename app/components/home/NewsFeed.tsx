import ArticleCardList from '@/components/home/ArticleCardList'
import LoadMore from '@/components/shared/LoadMore'
import AnalysisSidebar from '@/components/arcticle/AnalysisSidebar'
import { NewsItem } from '@/types/types'

// ── Section header ────────────────────────────────────────────────────────────

const FeedHeader = () => (
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

// ── Feed ──────────────────────────────────────────────────────────────────────

interface NewsFeedProps {
  newsList:       NewsItem[]
  analysisList:   NewsItem[]
  totalNewsCount: number
}

const NewsFeed = ({ newsList, analysisList, totalNewsCount }: NewsFeedProps) => (
  <section
    className='mx-auto my-4 csm:w-3/4 csm:rounded-lg overflow-hidden'
    style={{
      background: 'var(--color-surface)',
      border:     '1px solid rgba(184,151,42,0.15)',
      boxShadow:  '0 32px 80px -8px rgba(0,0,0,0.6)',
    }}
  >
    <FeedHeader />
    <hr className='gold-rule mx-5 mb-4' style={{ opacity: 0.4 }} />
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 px-3 pb-3'>
      <div className='md:col-span-2 flex flex-col'>
        <ArticleCardList articles={newsList} />
        <LoadMore
          totalNewsCount={totalNewsCount}
          initialCount={newsList.length}
        />
      </div>
      <AnalysisSidebar analysisList={analysisList} />
    </div>
  </section>
)

export default NewsFeed