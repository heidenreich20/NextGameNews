import '../globals.css'
import Image from 'next/image'
import PlayStation from '../assets/playstation.svg'
import Xbox from '../assets/xbox.svg'
import Nintendo from '../assets/nintendo.svg'
import PC from '../assets/pclogo.svg'

type ConsoleName = 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC'

const consoles: Record<ConsoleName, { src: string }> = {
  PlayStation,
  Xbox,
  Nintendo,
  PC,
}

interface BigNewsProps {
  image: string
  text: string
  type: string
  console: ConsoleName[]
}

const ConsoleIcons = ({ platforms }: { platforms: ConsoleName[] }) => (
  <div className='flex gap-2'>
    {platforms.map((name) => {
      const icon = consoles[name]
      if (!icon) return null
      return (
        <Image
          key={name}
          src={icon.src}
          alt={`${name} logo`}
          width={24}
          height={24}
          className='w-4 sm:w-6 object-contain'
        />
      )
    })}
  </div>
)

const BigNews = ({ image, text, type, console: platforms }: BigNewsProps) => (
  <article className='group relative flex overflow-hidden rounded-xl shadow-lg aspect-video'>
    <Image
      src={image}
      alt={text}
      fill
      sizes='(max-width: 1024px) 100vw, 50vw' 
      className='object-cover transition-transform duration-700 group-hover:scale-105'
      priority 
      fetchPriority="high" 
    />
    <div
      className='absolute inset-0'
      style={{
        background: 'linear-gradient(to top, rgba(4,16,20,0.97) 0%, rgba(4,16,20,0.4) 50%, transparent 100%)'
      }}
      aria-hidden
    />
    <div
      className='absolute left-0 top-0 bottom-0 w-0.75'
      style={{ background: 'linear-gradient(to bottom, var(--color-primary-lt), transparent)' }}
      aria-hidden
    />
    <div className='absolute bottom-0 left-0 right-0 flex flex-col gap-1 px-4 pb-4'>
      <span className='category-pill w-fit'>{type}</span>
      <ConsoleIcons platforms={platforms} />
      <p
        className='text-white text-sm sm:text-base xl:text-2xl leading-snug mt-1'
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
      >
        {text}
      </p>
    </div>
  </article>
)

export default BigNews