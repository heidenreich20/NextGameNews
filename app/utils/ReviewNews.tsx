import Reviews from './Reviews'

interface ReviewItem {
  _id: string
  category: string
  image: string
  title?: string
}

interface ReviewNewsProps {
  reviews?: ReviewItem[]
}

const ReviewNews = ({ reviews = [] }: ReviewNewsProps) => {
  if (reviews.length === 0) return null

  return (
    <section
      className='grid grid-cols-2 gap-1.5 p-2'
      aria-label='Análisis recientes'
    >
      {reviews.map(({ _id, category, image, title }) => (
        <Reviews
          key={_id}
          id={_id}
          category={category}
          image={image}
          title={title}
        />
      ))}
    </section>
  )
}

export default ReviewNews