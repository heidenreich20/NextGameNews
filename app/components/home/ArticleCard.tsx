import Link from 'next/link'
import Image from 'next/image'
import { optimizeImage } from '@/lib/api'

interface ArticleCardProps {
  title:     string
  image:     string
  author:    string
  category:  string
  time:      string
  id:        string
  priority?: boolean
}

export const ArticleCard = ({ title, image, author, category, time, id, priority = false }: ArticleCardProps) => (
  <li className='group relative flex flex-col csm:flex-row overflow-hidden border border-primary/20 bg-secondary cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60'>
    <div className='absolute left-0 top-0 w-0.5 h-0 bg-primary group-hover:h-full transition-all duration-300 z-10' aria-hidden />
    <div className='relative csm:w-50 md:w-60 shrink-0 aspect-video overflow-hidden'>
      <Image
        src={optimizeImage(image, { format: 'auto', quality: 'auto' })}
        alt={`${category} — ${title}`}
        fill
        sizes='(max-width: 720px) 100vw, 240px'
        priority={priority}
        className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
      />
      <div className='absolute inset-0 csm:hidden flex flex-col justify-end p-3 z-10'
        style={{ background: 'linear-gradient(to top, rgba(4,16,20,0.95), transparent)' }}>
        <span
          className='text-[0.65rem] tracking-[0.18em] uppercase mb-1'
          style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
        >
          {category}
        </span>
        <Link
          href={`/analisis/${id}`}
          className='text-[1.15rem] leading-[1.1] tracking-wide text-white'
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {title}
        </Link>
      </div>
    </div>
    <div className='hidden csm:flex flex-col justify-center gap-2 px-5 py-4 flex-1'>
      <span
        className='text-[0.65rem] tracking-[0.18em] uppercase'
        style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
      >
        {category}
      </span>
      <Link
        href={`/analisis/${id}`}
        className='text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.05] tracking-wide text-white transition-colors duration-200 group-hover:text-white/85'
        style={{ fontFamily: 'var(--font-title)' }}
      >
        {title}
      </Link>
      <div className='flex items-center justify-between mt-1'>
        <span
          className='text-[0.75rem] text-primary'
          style={{ fontFamily: 'var(--font-article)' }}
        >
          {author}
        </span>
        <span
          className='text-[0.7rem] tracking-wide text-white/65'
          style={{ fontFamily: 'var(--font-article)' }}
        >
          {time}
        </span>
      </div>
    </div>
  </li>
)

export default ArticleCard