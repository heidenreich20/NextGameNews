'use client'
import { useContext } from 'react'
import { NewsListContext } from '../context/NewsListContext'
import { Reviews } from '../utils'
const ReviewNews = () => {
  const { newsList } = useContext(NewsListContext)
  return (
    <section className='grid grid-cols-2 p-2'>
      {newsList
        .filter((newsItem) => newsItem.type === 'Análisis')
        .map(({ category, image }) => (
          <Reviews key={category} {...{ category, image }} />
        ))}
    </section>
  )
}

export default ReviewNews
