import ArticleReviewBody from '../../components/ArticleReviewBody'
import { Suspense } from 'react'

export default function Analisis () {
  return (
    <Suspense fallback={<div>Hello world</div>}>
      <ArticleReviewBody />
    </Suspense>
  )
}
