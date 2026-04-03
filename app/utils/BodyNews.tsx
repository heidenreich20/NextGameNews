import ArticleCard from './ArticleCard'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.locale('es')
dayjs.extend(relativeTime)

interface NewsItem {
  id:         string
  title:      string
  text:       string
  image:      string
  author:     string
  category:   string
  type:       string
  console:    string[]
  created_at: string
}

const BodyNews = ({ articles = [] }: { articles: NewsItem[] }) => {

  if (articles.length === 0) {
    return <div className="p-10 text-center opacity-50">No hay noticias disponibles</div>
  }

  return (
    <ul className='flex flex-col gap-2 col-span-2 p-3 csm:px-0 py-4'>
      {articles.map(({ created_at, id, ...rest }) => (
        <ArticleCard
          key={id}
          id={id}
          time={dayjs(created_at).fromNow()}
          {...rest}
        />
      ))}
    </ul>
  )
}

export default BodyNews