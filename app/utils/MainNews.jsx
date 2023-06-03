'use client'
import '../globals.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const MainNews = ({ title, image, author, category, time, text, id }) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const [isMediumDeviceUp, setIsMediumDeviceUp] = useState(
    window.innerWidth >= 768
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMediumDeviceUp(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <li
      onClick={isMediumDeviceUp ? handleClick : undefined}
      id='MainNews'
      style={{
        backgroundImage:
          isMediumDeviceUp && expanded ? `url(${image})` : 'none'
      }}
      className={`
              relative csm:m-0 m-1 cursor-pointer flex flex-col-reverse justify-between overflow-hidden rounded-lg border-gray-200 dark:border-slate-700 dark:bg-slate-600
              ${expanded ? 'bg-cover' : undefined}
              csm:p-2 p-0 csm:ml-1 csm:flex-row csm:place-items-center csm:border-2
            `}
    >
      <section className='flex w-2/3 flex-col-reverse justify-between csm:mr-5 csm:flex-row'>
        <div className='absolute overflow-hidden z-10 flex flex-col justify-center min-h-[33%] lg:rounded-lg dark:bg-slate-500/[.75] bg-zinc-200/[.75] rounded-b-lg p-2 csm:static csm:flex csm:bg-slate-100/[.85] csm:p-3 csm:dark:bg-slate-500/[.85]'>
          <Link
            href={`analisis/${id}`}
            className='flex text-xs leading-tight dark:text-gray-50 text-gray-800 hover:cursor-pointer csm:mb-3 sm:text-xl csm:text-slate-900 csm:dark:text-gray-50 2xl:text-lg font-semibold'
          >
            {title}
          </Link>
          <div
            className={
              isMediumDeviceUp && expanded ? 'show-content' : 'hide-content'
            }
          >
            <p
              className={
                expanded ? 'news-inner-text dark:text-gray-50' : undefined
              }
            >
              {text}
            </p>
          </div>

          <article className='hidden items-center justify-between csm:flex'>
            <aside>
              <p className='mb-1 text-sm font-semibold dark:text-sky-400 text-sky-700'>
                {category}
              </p>
              <p className='text-sm font-medium text-gray-800 dark:text-gray-300'>
                {author}
              </p>
            </aside>
            <p className='text-right text-sm font-medium text-gray-500 dark:text-gray-50'>
              {time}
            </p>
          </article>
        </div>
      </section>
      <img
        loading='lazy'
        onClick={isMediumDeviceUp ? handleClick : undefined}
        className={`relative hover:cursor-pointer ${
            isMediumDeviceUp && expanded ? 'hidden' : 'flex'
          } csm:static sm:w-1/3 aspect-video object-cover rounded-md dark:shadow-[0_0px_20px_3px_rgba(0,0,0,0.4)] shadow-[0_0px_12px_3px_rgba(156,156,156,0.6)] dark:border-slate-700`}
        src={image}
        alt={`a image of the videogame ${category}`}
      />
    </li>
  )
}

export default MainNews
