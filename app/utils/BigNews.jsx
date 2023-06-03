import '../globals.css'
import React from 'react'
import { PlayStation, Nintendo, Xbox, PC } from '../assets'
const consoles = {
  PlayStation,
  Xbox,
  Nintendo,
  PC
}
const BigNews = ({ image, text, type, console }) => {
  return (
    <div
      id='bigNews'
      className='shadow-x relative flex overflow-hidden rounded-xl'
    >
      <div id='bannerNews'>
        <img src={image} className='aspect-video' alt='a videogame image' />
      </div>
      <article className='justify-between absolute bottom-0 flex w-full flex-col font-title text-2xl text-white'>
        <div id='bannerText' className='mb-5'>
          <h2 className='flex flex-row items-center gap-1 px-2 pl-2 text-sm md:text-2xl'>
            {type}
          </h2>
          <div className='flex gap-2 px-2 text-xs csm:text-sm'>
            {console.map((consoleName, index) => {
              const ConsoleSVG = consoles[consoleName]
              return ConsoleSVG
                ? (
                  <img
                    className='sm:w-8 w-2' key={index} src={ConsoleSVG} alt='videogame console logo'
                  />
                  )
                : null
            })}
          </div>
        </div>
        <p id='bannerText' className='px-2 pb-3 text-xs xl:text-3xl'>
          {text}
        </p>
      </article>
    </div>
  )
}
export default BigNews
