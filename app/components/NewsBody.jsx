/* eslint-disable react/jsx-closing-tag-location */
'use client'
import '../globals.css'
import React, { useContext } from 'react'
import dayjs from 'dayjs'
// eslint-disable-next-line no-unused-vars
import { es } from 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MainNews, Reviews } from '../utils'
import Link from 'next/link'
import { CircularProgress } from '@mui/material'
import { NewsListContext } from '../context/NewsListContext'

dayjs.locale('es')
dayjs.extend(relativeTime)

const Main = () => {
  const { loadMore, sortedList, newsList, totalNews, loadingCategory, loading } = useContext(NewsListContext)

  return (
    <section
      className='main-body mx-auto my-4 bg-gray-50 shadow-3xl shadow-sky-700 dark:bg-slate-800 csm:w-3/4 csm:rounded-lg'
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
      <div className='m-auto grid gap-2 grid-cols-1 rounded-lg bg-gray-50 pb-1 dark:bg-slate-800 md:grid-cols-3'>
        <ul className='flex gap-2 items-center flex-col col-span-2 dark:bg-slate-800'>
          {
            loadingCategory
              ? <div className='flex justify-center items-center w-full h-full'>
                <CircularProgress />
              </div>
              : <>
                {sortedList.map(({ createdAt, _id, ...val }, key) => {
                  const timeSinceUpload = dayjs(createdAt).fromNow()
                  return <MainNews key={_id} id={_id} {...val} time={timeSinceUpload} />
                })}
                {loading
                  ? <div className='flex xs:mt-0 mt-5 justify-center items-center'>
                    <CircularProgress />
                  </div>
                  : null}
              </>
          }
        </ul>
        <div className='hidden grid-cols-1 mr-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-600 md:grid'>
          <article className='m-2 rounded-lg'>
            <aside className='rounded-lg bg-black'>
              <h2 className='rounded-lg border-b-2 border-b-slate-700 p-3 font-title text-3xl text-white'>
                Análisis
              </h2>
              <section className='grid grid-cols-2 p-2'>
                {newsList
                  .filter((newsItem) => newsItem.type === 'Análisis')
                  .map(({ category, image }) => (
                    <Reviews key={category} {...{ category, image }} />
                  ))}
              </section>
              <Link
                // eslint-disable-next-line react/jsx-curly-brace-presence
                href={'/analisis'}
                // eslint-disable-next-line react/jsx-curly-brace-presence
                // to={'http://localhost:5173/analisis'}
                id='categorySection'
                className='flex items-center justify-center px-3 pb-3 text-lg font-bold text-slate-500 hover:cursor-pointer'
              >
                Mas análisis
              </Link>
            </aside>
          </article>
        </div>
      </div>
      {sortedList?.length !== totalNews
        ? <button
            className='mx-2 my-3 rounded-md bg-slate-300 px-2 py-2 text-xs font-bold hover:animate-pulse hover:bg-slate-400 dark:bg-slate-500'
            onClick={loadMore}
          >
          MAS NOTICIAS
        </button>
        : null}
    </section>
  )
}

export default Main
