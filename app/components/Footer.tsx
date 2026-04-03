'use client'
import React from 'react'
import '../globals.css'
import Link from 'next/link'

const FooterLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <Link
    href={href}
    aria-label={label}
    className='text-sm transition-colors duration-200 hover:opacity-80'
    style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.6)' }}
  >
    {children}
  </Link>
)

const FacebookIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'
    stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z' />
    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    <path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' />
    <circle cx='4' cy='4' r='2' />
  </svg>
)

interface SocialLink {
  href: string
  label: string
  hoverColor: string
  Icon: () => React.JSX.Element
}

const socialLinks: SocialLink[] = [
  { href: 'https://www.facebook.com/pablo.heidenreich.315', Icon: FacebookIcon, label: 'Facebook', hoverColor: 'var(--color-facebook)' },
  { href: 'https://www.instagram.com/revicmanne/', Icon: InstagramIcon, label: 'Instagram', hoverColor: 'var(--color-instagram)' },
  { href: 'https://twitter.com/Pablo_Heiden', Icon: TwitterIcon, label: 'Twitter / X', hoverColor: '#1DA1F2' },
  { href: 'https://www.linkedin.com/in/pablo-heidenreich-03aa97272/', Icon: LinkedInIcon, label: 'LinkedIn', hoverColor: '#0077B5' },
]

const navLinks = [
  { href: '/', label: 'Contacto', text: 'Contacto' },
  { href: '/', label: 'Quiénes somos', text: 'Quiénes somos' },
  { href: '/', label: 'Políticas', text: 'Políticas' },
  { href: '/', label: 'Trabaja con nosotros', text: 'Trabaja con nosotros' },
]

const SocialButton = ({ href, Icon, label, hoverColor }: SocialLink) => {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = hoverColor
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'rgba(232,213,163,0.6)'
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className='flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110'
      style={{ color: 'rgba(232,213,163,0.6)' }}
    >
      <Icon />
    </a>
  )
}

const Footer = () => (
  <footer
    className='gradient-footer flex flex-col items-center gap-5 px-4 py-6'
    role='contentinfo'
  >
    <hr className='gold-rule w-full max-w-lg' style={{ opacity: 0.3 }} />
    <nav className='flex flex-wrap justify-center gap-x-6 gap-y-2' aria-label='Enlaces del pie de página'>
      {navLinks.map(({ href, label, text }) => (
        <FooterLink key={label} href={href} label={label}>{text}</FooterLink>
      ))}
    </nav>
    <div className='flex items-center gap-1'>
      <span
        className='mr-2 text-xs tracking-[0.15em] uppercase'
        style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.4)' }}
      >
        Nuestras redes
      </span>
      {socialLinks.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
    <hr className='gold-rule w-full max-w-lg' style={{ opacity: 0.3 }} />
    <p
      className='text-xs tracking-wide text-center'
      style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.3)' }}
    >
      ©{new Date().getFullYear()} All Rights Reserved · Developed by Pablo Heidenreich
    </p>
  </footer>
)

export default Footer