import { fetchNews } from '@/lib/api'
import ArticleCardList from '@/components/home/ArticleCardList'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lanzamientos | Next Game News',
  description: 'Los últimos lanzamientos del mundo de los videojuegos.',
}

export default async function LanzamientosPage() {
  const { newsList, totalNewsCount } = await fetchNews({ type: 'Lanzamiento', limit: 20 })

  return (
    <>
      <section
        className='mx-auto my-4 csm:w-3/4 csm:rounded-lg overflow-hidden'
        style={{
          background: 'var(--color-surface)',
          border: '1px solid rgba(184,151,42,0.15)',
          boxShadow: '0 32px 80px -8px rgba(0,0,0,0.6)',
        }}
      >
        <div className='flex items-end gap-4 px-5 pt-6 pb-4'>
          <h1
            className='text-3xl md:text-5xl leading-none'
            style={{ fontFamily: 'var(--font-title)', color: 'var(--color-cream)' }}
          >
            Lanzamientos
          </h1>
          <span
            className='hidden csm:block text-xs tracking-[0.18em] uppercase pb-1'
            style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
          >
            {totalNewsCount} lanzamientos
          </span>
        </div>
        <hr className='gold-rule mx-5 mb-4' style={{ opacity: 0.4 }} />
        <ArticleCardList articles={newsList} />
      </section>
      <Footer />
    </>
  )
}