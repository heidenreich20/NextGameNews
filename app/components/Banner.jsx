import '../globals.css'
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { SmallNews, BigNews } from '../utils'
import LinearProgress from '@mui/material/LinearProgress'
import { NewsListContext } from '../context/NewsListContext'

const Banner = () => {
  const { newsList, loading } = useContext(NewsListContext)
  return (
    <div className='flex flex-col md:py-4 gap-8 bg-gradient-to-b from-sky-900/[.40] to-transparent md:bg-slate-900'>
      {/* handles the main news in the banner */}
      {loading
        ? <div><LinearProgress /></div>
        : <>
          <div
            id='swiper'
            className='flex overflow-hidden py-2 csm:m-auto sm:w-3/4 md:flex-row'
          >
            <Swiper
              style={{ borderRadius: '12px' }}
              className='md:my-2'
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

          <div className='md:flex hidden justify-center gap-2 py-3'>
            <div className='mx-2 flex flex-col gap-4 overflow-hidden csm:m-0 csm:mx-4 csm:w-3/4 md:flex-row'>
              {newsList.slice(2, 5).map((news, index) => (
                <SmallNews key={index} image={news?.image} text={news?.title} />
              ))}
            </div>
          </div>
        </>}
    </div>
  )
}

export default Banner
