import Banner from '@/components/home/Banner'
import Footer from '@/components/layout/Footer'
import NewsFeed from '@/components/home/NewsFeed'
import { fetchNews } from '@/lib/api'

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_LIMIT    = 10
const ANALYSIS_LIMIT = 4

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Page() {
  const { newsList, totalNewsCount } = await fetchNews({ limit: PAGE_LIMIT })

  const bannerNews   = newsList.slice(0, 6)
  const analysisList = newsList
    .filter((n) => n.type === 'Análisis')
    .slice(0, ANALYSIS_LIMIT)

  return (
    <>
      <Banner newsList={bannerNews} />
      <NewsFeed
        newsList={newsList}
        analysisList={analysisList}
        totalNewsCount={totalNewsCount}
      />
      <Footer />
    </>
  )
}