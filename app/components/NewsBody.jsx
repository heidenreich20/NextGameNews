import '../globals.css'
import Link from 'next/link'
import LoadMoreButton from '../utils/LoadMoreButton'
import { BodyNews, ReviewNews } from '../utils'

const NewsBody = () => {
  return (
    <section
      className='main-body my-2 mx-auto bg-gray-50 shadow-3xl shadow-sky-700 dark:bg-slate-800 csm:w-3/4 csm:rounded-lg'
    >
      <div
        id='newsBody'
        className='flex csm:h-24 h-16 items-center justify-center csm:items-end gap-3 rounded-lg bg-gray-50 dark:bg-slate-800 csm:justify-start'
      >
        <h2 className='font-semibold text-2xl md:text-5xl text-slate-900 dark:text-slate-50 csm:pl-5'>
          Ultimas noticias
        </h2>
        <p className='font-bold csm:block hidden dark:text-slate-50 text-slate-800'>
          Noticias hoy
        </p>
      </div>
      <div className='m-auto grid gap-2 px-2 grid-cols-1 rounded-lg bg-gray-50 pb-1 dark:bg-slate-800 md:grid-cols-3'>
        <BodyNews />
        <div className='hidden grid-cols-1 rounded-lg border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-700 md:grid'>
          <article className='m-2 rounded-lg'>
            <aside className='rounded-lg bg-black'>
              <h2 className='rounded-lg border-b-2 border-b-slate-700 p-3 font-title text-3xl text-white'>
                Análisis
              </h2>
              <ReviewNews />
              <Link
                href='/analisis'
                id='categorySection'
                className='flex items-center justify-center px-3 pb-3 text-lg font-bold text-slate-500 hover:cursor-pointer'
              >
                Mas análisis
              </Link>
            </aside>
          </article>
        </div>
      </div>
      <LoadMoreButton />
    </section>
  )
}

export default NewsBody
