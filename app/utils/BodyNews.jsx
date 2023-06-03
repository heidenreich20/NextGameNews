import { useContext } from 'react'
import { NewsListContext } from '../context/NewsListContext'
import { CircularProgress } from '@mui/material'
import { MainNews } from '../utils'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { es } from 'dayjs/locale/es'

dayjs.locale('es')
dayjs.extend(relativeTime)

const BodyNews = () => {
  const { sortedList, loading } = useContext(NewsListContext)

  return (
    <ul className='flex gap-2 items-center flex-col col-span-2 dark:bg-slate-800'>
      {sortedList.map(({ createdAt, _id, ...val }, key) => {
        const timeSinceUpload = dayjs(createdAt).fromNow()
        return <MainNews key={_id} id={_id} {...val} time={timeSinceUpload} />
      })}
      {loading
        ? <div className='flex xs:mt-0 mt-5 justify-center items-center'>
          <CircularProgress />
        </div>
        : null}
    </ul>
  )
}

export default BodyNews
