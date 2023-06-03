'use client'
import { useContext } from "react"
import { NewsListContext } from '../context/NewsListContext'


const LoadMoreButton = () => {
  const { loadMore, sortedList, totalNews } = useContext(NewsListContext)

  return (
    sortedList?.length !== totalNews
        ? <button
            className='mx-2 my-3 rounded-md bg-slate-300 px-2 py-2 text-xs font-bold hover:animate-pulse hover:bg-slate-400 dark:bg-slate-500'
            onClick={loadMore}
          >
          MAS NOTICIAS
        </button>
        : null
  )
}

export default LoadMoreButton