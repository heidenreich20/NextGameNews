import ArticleReviewBody from '../../components/ArticleReviewBody'
import { NewsListProvider } from '@/app/context/NewsListContext'
import { Suspense } from 'react'

export default function Analisis () {
  return (
    <NewsListProvider>
      <Suspense fallback={<div>Hello world</div>}>
        <ArticleReviewBody />
      </Suspense>
    </NewsListProvider>
  )
}
