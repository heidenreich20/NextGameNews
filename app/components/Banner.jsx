/* eslint-disable react/jsx-closing-tag-location */
'use client'
import '../globals.css'
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { SmallNews, BigNews } from '../utils'
import LinearProgress from '@mui/material/LinearProgress'
import { NewsListContext } from '../context/NewsListContext'
// const hotTopics = [
//   'Free Games',
//   'Cyberpunk',
//   '2077',
//   'Wordle',
//   'PC Gaming',
//   'Forspoken',
//   'Pokémon',
//   'Batman',
//   'Pokémon Go',
//   'Overwatch 2',
//   'RTX 3080'
// ]

// const buttonSX = {
//   mx: '0.2rem',
//   p: '0.15rem',
//   borderRadius: '5px',
//   textDecoration: 'none',
//   cursor: 'pointer',
//   color: '#e6e6e6',
//   '&:hover': { bgcolor: 'rgba(7, 89, 133, 0.5)' }
// }

const Banner = () => {
  const { newsList, loading } = useContext(NewsListContext)
  return (
    <div>
      {/* handles the main news in the banner */}
      {loading
        ? <div><LinearProgress /></div>
        : <>
          <div
            id='swiper'
            className='flex overflow-hidden pt-5 csm:m-auto csm:w-3/4 csm:p-0 md:flex-row'
          >
            <Swiper
              style={{ borderRadius: '12px' }}
              className='mt-2'
              spaceBetween={10}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides={false}
              loop
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                1150: {
                  speed: 2000,
                  allowTouchMove: true,
                  slidesPerView: 2,
                  slidesPerGroup: 2
                }
              }}
            >
              {newsList.map((news, index) => (
                <SwiperSlide className='rounded-md' key={index}>
                  <BigNews
                    type={news.type}
                    console={news.console}
                    text={news.title}
                    image={news.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='flex justify-center gap-3 bg-gradient-to-t from-sky-900 to-transparent py-5'>
            <div className='mx-2 flex flex-col gap-4 overflow-hidden csm:m-0 csm:mx-4 csm:w-3/4 md:flex-row'>
              {newsList.slice(2, 5).map((news, index) => (
                <SmallNews key={index} image={news?.image} text={news?.title} />
              ))}
            </div>
          </div>
        </>}
      {/* <div className='flex justify-center bg-gradient-to-b from-sky-900 to-transparent pb-3 '>
        <p className='flex flex-wrap items-center text-white'>
          🔥HOT TOPICS &gt;
          {hotTopics.map((topic, key) => {
            return (
              <React.Fragment key={key}>
                <Link sx={buttonSX}>{topic}</Link>
                {key !== hotTopics.length - 1 && <span>-</span>}
              </React.Fragment>
            )
          })}
        </p>
      </div> */}
    </div>
  )
}

export default Banner
