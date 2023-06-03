'use client'
import '../globals.css'
import React from 'react'

const SmallNews = ({ image, text }) => {
  return (
    <div className='relative w-full csm:mx-0'>
      <img
        className='h-full w-full aspect-video rounded-lg object-cover'
        src={image}
        alt='a videogame image'
      />
      <h2
        id='bannerText'
        className='absolute bottom-0 rounded-lg bg-gradient-to-t from-secondary to-transparent p-2 font-title text-sm xl:text-xl 2xl:text-2xl text-white'
      >
        {text}
      </h2>
    </div>
  )
}

export default SmallNews
