import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import { NewsItem } from '@/types/types'
import { optimizeImage } from '@/lib/api'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

dayjs.locale('es')
dayjs.extend(relativeTime)

interface ArticleReviewBodyProps {
  article: NewsItem
}

const HeroAccent = () => (
  <div
    className='absolute top-0 left-0 right-0 h-0.75 z-10'
    style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)' }}
    aria-hidden
  />
)

const ArticleMeta = ({ author, createdAt }: { author: string; createdAt: string }) => (
  <div className='flex items-center gap-6 flex-wrap'>
    <p
      className='uppercase tracking-widest text-white/50 text-sm'
      style={{ fontFamily: 'var(--font-article)' }}
    >
      Por{' '}
      <span className='font-bold' style={{ color: 'var(--color-primary-lt)' }}>
        {author}
      </span>
    </p>
    <div className='w-px h-4 bg-white/20' aria-hidden />
    <time
      dateTime={createdAt}
      className='tracking-wider text-white/30 uppercase text-xs'
      style={{ fontFamily: 'var(--font-article)' }}
    >
      {dayjs(createdAt).fromNow()}
    </time>
  </div>
)

const ArticleReviewBody = ({ article }: ArticleReviewBodyProps) => (
  <article className='min-h-screen' style={{ backgroundColor: 'var(--color-secondary)' }}>
    <div className='relative min-h-[88vh] flex flex-col justify-end overflow-hidden'>
      <HeroAccent />
      <Image
        src={optimizeImage(article.image, { format: 'auto', quality: 'auto' })}
        alt={article.title}
        fill
        priority
        aria-hidden
        className='object-cover scale-105 blur-sm brightness-[0.28]'
        sizes='100vw'
      />
      <div
        className='absolute inset-0 z-1'
        style={{
          background: `linear-gradient(to bottom,
            transparent 0%,
            rgba(4,16,20,0.5) 45%,
            rgba(4,16,20,0.93) 75%,
            var(--color-secondary) 100%)`
        }}
        aria-hidden
      />
      <div className='relative z-2 px-6 pb-14 sm:px-16 max-w-5xl'>
        <span
          className='inline-block text-[0.68rem] tracking-[0.2em] uppercase px-3 py-1 mb-6'
          style={{
            fontFamily: 'var(--font-article)',
            color: 'var(--color-primary-lt)',
            border: '1px solid rgba(184,151,42,0.4)',
            backgroundColor: 'rgba(184,151,42,0.07)',
          }}
        >
          {article.type ?? 'Gaming · Reseña'}
        </span>
        <h1
          className='text-[clamp(3.2rem,9vw,7rem)] leading-[0.92] text-white mb-8'
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {article.title}
        </h1>
        <ArticleMeta author={article.author} createdAt={article.createdAt} />
      </div>
    </div>
    <div className='px-6 sm:px-16'>
      <div className='relative max-w-4xl mx-auto -translate-y-10 aspect-video'>
        <Image
          src={optimizeImage(article.image, { format: 'auto', quality: 'auto' })}
          alt={article.title}
          fill
          priority
          sizes='(max-width: 768px) 100vw, 75vw'
          className='object-cover'
          style={{ border: '1px solid rgba(184,151,42,0.25)' }}
        />
        <div
          className='absolute bottom-0 left-0 right-0 h-0.75'
          style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)' }}
          aria-hidden
        />
      </div>
    </div>
    <style>{`
      .prose-article p          { color: rgba(255,255,255,0.7); line-height: 1.9; margin-bottom: 1.5rem; }
      .prose-article h2         { font-family: var(--font-title); font-size: clamp(1.8rem,4vw,2.6rem); letter-spacing: 0.02em; color: #fff; margin: 2.5rem 0 1rem; }
      .prose-article h3         { font-family: var(--font-title); font-size: clamp(1.4rem,3vw,2rem);   letter-spacing: 0.02em; color: #fff; margin: 2rem 0 0.75rem; }
      .prose-article em         { color: var(--color-primary-lt); font-style: normal; font-weight: 600; }
      .prose-article strong     { color: #fff; font-weight: 700; }
      .prose-article blockquote { border-left: 3px solid var(--color-primary); padding-left: 1.25rem; margin: 2rem 0; font-family: var(--font-title); font-size: clamp(1.3rem,3vw,1.9rem); line-height: 1.3; color: rgba(255,255,255,0.85); }
      .prose-article code       { background: rgba(184,151,42,0.08); border: 1px solid rgba(184,151,42,0.2); color: var(--color-primary-lt); font-family: monospace; padding: 0.1em 0.4em; font-size: 0.85em; }
      .prose-article a          { color: var(--color-primary-lt); text-decoration: underline; text-underline-offset: 3px; }
    `}</style>
    <div
      className='px-6 sm:px-16 pb-24 max-w-3xl mx-auto'
      style={{
        fontFamily: 'var(--font-article)',
        fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
      }}
    >
      <div className='prose-article'>
        <Markdown remarkPlugins={[remarkGfm]}>
          {article.text ?? ''}
        </Markdown>
      </div>
    </div>
    <div className='max-w-3xl mx-auto px-6 sm:px-16 pb-16'>
      <hr className='gold-rule' style={{ opacity: 0.3 }} />
    </div>
  </article>
)

export default ArticleReviewBody