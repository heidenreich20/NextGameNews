import { notFound } from 'next/navigation'
import { NewsItem, ArticleResponse } from '../../types/types'
import ArticleReviewBody from '../../components/ArticleReviewBody'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getArticle = async (postId: string): Promise<NewsItem> => {
  const res = await fetch(`${API_URL}news/${postId}`, {
    next:   { revalidate: 60 },
    signal: AbortSignal.timeout(10_000),
  })

  if (res.status === 404) notFound()
  if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`)

  const data: ArticleResponse = await res.json()
  return data.article
}

export const generateMetadata = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params  // ← await params
  const article = await getArticle(postId)
  return {
    title:       `${article.title} | Next Game News`,
    description: article.text?.slice(0, 155),
    openGraph: {
      title:  article.title,
      images: [article.image],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const article = await getArticle(postId)
  return <ArticleReviewBody article={article} />
}