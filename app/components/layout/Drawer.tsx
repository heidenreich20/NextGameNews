'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { navigationLinks } from './Navbar'
import { SocialButton, socialLinks } from '@/components/shared/SocialIcons'

// ── Close icon ────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
    fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <polyline points='15 18 9 12 15 6' />
  </svg>
)

// ── Drawer ────────────────────────────────────────────────────────────────────

interface DrawerProps {
  id:      string
  open:    boolean
  onClose: () => void
}

const DrawerComponent = ({ open, onClose }: DrawerProps) => {
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
        <div
          className='h-0.5 w-full shrink-0'
          style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-lt), transparent)' }}
        />
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
          {socialLinks.slice(0, 3).map((social) => (
            <SocialButton key={social.label} {...social} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DrawerComponent