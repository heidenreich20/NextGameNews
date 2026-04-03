'use client'
import '../globals.css'
import React, { useEffect } from 'react'
import { navigationLinks } from '../components/Navbar'
import Link from 'next/link'

interface DrawerComponentProps {
  open: boolean
  onClose: () => void
}

interface SocialLink {
  href: string
  label: string
  hoverColor: string
  Icon: () => React.JSX.Element
}

const CloseIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
    fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <polyline points='15 18 9 12 15 6' />
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'
    stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z' />
    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

const socialLinks: SocialLink[] = [
  { href: 'https://www.facebook.com/pablo.heidenreich.315', Icon: FacebookIcon, label: 'Facebook', hoverColor: 'var(--color-facebook)' },
  { href: 'https://www.instagram.com/revicmanne/', Icon: InstagramIcon, label: 'Instagram', hoverColor: 'var(--color-instagram)' },
  { href: 'https://twitter.com/Pablo_Heiden', Icon: TwitterIcon, label: 'Twitter / X', hoverColor: '#1DA1F2' },
]

const SocialButton = ({ href, Icon, label, hoverColor }: SocialLink) => {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = hoverColor
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--color-cream)'
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className='flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110'
      style={{ color: 'var(--color-cream)' }}
    >
      <Icon />
    </a>
  )
}

const DrawerComponent = ({ open, onClose }: DrawerComponentProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
        aria-hidden
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Menú de navegación'
        className='fixed left-0 top-0 bottom-0 z-50 flex flex-col w-72 overflow-y-auto'
        style={{ background: 'var(--color-surface)', borderRight: '1px solid rgba(184,151,42,0.2)' }}
      >
        <div className='h-0.5 w-full shrink-0' style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-lt), transparent)'
        }} />
        <div className='flex items-center justify-between px-4 py-4'>
          <button
            onClick={onClose}
            aria-label='Cerrar menú'
            className='flex items-center justify-center w-8 h-8 rounded transition-opacity duration-200 hover:opacity-70'
            style={{ color: 'var(--color-cream)' }}
          >
            <CloseIcon />
          </button>
        </div>
        <hr className='gold-rule mx-4 mb-4' style={{ opacity: 0.3 }} />
        <p
          className='px-4 mb-3 text-xs tracking-[0.2em] uppercase'
          style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
        >
          Secciones
        </p>
        <nav className='flex flex-col px-2 mb-6'>
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className='flex items-center gap-3 px-3 py-2.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:translate-x-1'
              style={{ fontFamily: 'var(--font-article)', color: 'var(--color-cream)' }}
            >
              <span
                className='w-1 h-1 rounded-full shrink-0'
                style={{ background: 'var(--color-primary)' }}
                aria-hidden
              />
              {item.name}
            </Link>
          ))}
        </nav>
        <hr className='gold-rule mx-4 mb-4' style={{ opacity: 0.3 }} />
        <p
          className='px-4 mb-3 text-xs tracking-[0.2em] uppercase'
          style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
        >
          Síguenos
        </p>
        <div className='flex justify-evenly px-4'>
          {socialLinks.map((social) => (
            <SocialButton key={social.label} {...social} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DrawerComponent