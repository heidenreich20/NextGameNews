import './globals.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import NewsBody from './components/NewsBody'
import { NewsItem } from './types/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_LIMIT = 10
const ANALYSIS_LIMIT = 4

const getNews = async (): Promise<{ allNews: NewsItem[]; totalNewsCount: number }> => {
  const res = await fetch(`${API_URL}news?limit=${PAGE_LIMIT}`, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`)

  const data = await res.json()
  return {
    allNews: data.newsList ?? [],
    totalNewsCount: data.totalNewsCount ?? 0,
  }
}


export default async function Page() {
  const { allNews, totalNewsCount } = await getNews()

  const bannerNews = allNews.slice(0, 6)
  const analysisList = allNews
    .filter((n) => n.type === 'Análisis')
    .slice(0, ANALYSIS_LIMIT)

  return (
    <>
      <Banner newsList={bannerNews} />
      <NewsBody
        newsList={allNews}
        analysisList={analysisList}
        totalNewsCount={totalNewsCount}
      />
      <Footer />
    </>
  )
}