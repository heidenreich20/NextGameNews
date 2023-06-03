'use client'
import '../globals.css'
import React from 'react'

const Reviews = ({ image, category }) => {
  return (
    <div
      id='reviewImage'
      className='grid-col-1 relative col-span-1 m-3 items-end'
    >
      <img
        loading='lazy'
        className='relative h-full w-full object-cover shadow-md'
        src={image}
        alt=''
      />
      <p className='absolute bottom-0 z-10 flex w-full justify-center bg-gradient-to-t from-zinc-900 to-transparent p-2 font-title text-xl text-white'>
        {category}
      </p>
    </div>
  )
}

export default Reviews
