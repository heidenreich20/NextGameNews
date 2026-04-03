'use client'
import { useState, useEffect } from 'react'
import '../globals.css'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import BigNews from '../utils/BigNews'
import SmallNews from '../utils/SmallNews'

const Banner = ({ newsList = [] }: { newsList: any[] }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted || newsList.length === 0) {
    return <div className="min-h-100 bg-secondary" />
  }

  return (
    <div className='flex flex-col gap-8' style={{ background: 'var(--color-secondary)' }}>
      <hr className='gold-rule m-0' />

      <div id='swiper' className='w-full csm:w-3/4 csm:mx-auto px-3 csm:px-0 pt-4'>
        <Swiper
          style={{ borderRadius: '8px' }}
          spaceBetween={10}
          slidesPerView={1}
          loop={newsList.length > 2}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            1150: { slidesPerView: 2, slidesPerGroup: 2 },
          }}
        >
          {newsList.map((news) => (
            <SwiperSlide key={news._id}>
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
      {newsList.length > 2 && (
        <div className='hidden md:block pb-6'>
          <div className='csm:w-3/4 mx-auto px-3 csm:px-0 mb-4 flex items-center gap-4'>
            <span className='font-(--font-title) text-sm tracking-[0.2em] uppercase' style={{ color: 'var(--color-primary-lt)' }}>
              También te puede interesar
            </span>
            <div className='flex-1 h-px' style={{ background: 'rgba(184,151,42,0.2)' }} />
          </div>

          <div className='csm:w-3/4 mx-auto px-3 csm:px-0 flex gap-4'>
            {newsList.slice(2, 6).map((news, index) => (
              <SmallNews
                key={news._id ?? index}
                image={news.image}
                text={news.title}
                href={`/analisis/${news._id}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      )}
      <hr className='gold-rule m-0' />
    </div>
  )
}

export default Banner;