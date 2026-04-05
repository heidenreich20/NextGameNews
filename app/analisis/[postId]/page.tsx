import { notFound } from 'next/navigation'
import { fetchArticle } from '@/lib/api'
import ArticlePage from '@/components/article/ArticlePage'
import { cache } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const getArticle = cache(async (postId: string) => {
  const article = await fetchArticle(postId)
  if (!article) notFound()
  return article
})

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const article = await getArticle(postId)
  return <ArticlePage article={article} />
}