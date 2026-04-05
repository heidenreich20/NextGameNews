'use client'
import React from 'react'
import Link from 'next/link'
import { SocialButton, socialLinks } from '@/components/shared/SocialIcons'

// ── Footer link ───────────────────────────────────────────────────────────────

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

// ── Nav links ─────────────────────────────────────────────────────────────────

const navLinks = [
  { href: '/', label: 'Contacto',             text: 'Contacto'             },
  { href: '/', label: 'Quiénes somos',        text: 'Quiénes somos'        },
  { href: '/', label: 'Políticas',            text: 'Políticas'            },
  { href: '/', label: 'Trabaja con nosotros', text: 'Trabaja con nosotros' },
]

// ── Footer ────────────────────────────────────────────────────────────────────

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