'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import Drawer from '@/components/layout/Drawer'
import SearchBar from '@/components/shared/SearchBar'

// ── Constants ─────────────────────────────────────────────────────────────────

const LOGO_GRADIENT = 'linear-gradient(135deg, var(--color-primary-dk) 0%, var(--color-primary-lt) 50%, var(--color-cream) 100%)'
const ACCENT_GRADIENT = 'linear-gradient(90deg, transparent, var(--color-primary) 30%, var(--color-primary-lt) 50%, var(--color-primary) 70%, transparent)'

// ── Sub-components ────────────────────────────────────────────────────────────

const GoldRule = () => (
  <div className='h-px w-full' style={{ background: ACCENT_GRADIENT }} aria-hidden />
)

const Logo = () => (
  <Link href='/' className='csm:block hidden hover:opacity-80 transition-opacity duration-200'>
    <h1
      className='tracking-widest select-none md:text-5xl text-3xl'
      style={{
        fontFamily: 'var(--font-logo)',
        background: LOGO_GRADIENT,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      GAMENEWS
    </h1>
  </Link>
)

const MenuIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-8 h-8'
    style={{ color: 'var(--color-cream)' }}
    aria-hidden
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
  </svg>
)

// ── Header ────────────────────────────────────────────────────────────────────

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className='gradient-navbar sticky top-0 z-50' role='banner'>
      <GoldRule />
      <div className='flex items-center justify-between sm:justify-center h-14 md:h-20 px-4 csm:gap-8 gap-2 max-w-7xl mx-auto'>
        <button
          className='flex sm:hidden p-1 transition-opacity duration-200 hover:opacity-70'
          onClick={openMenu}
          aria-label='Abrir menú'
          aria-expanded={menuOpen}
          aria-controls='main-drawer'
        >
          <MenuIcon />
        </button>
        <Drawer id='main-drawer' open={menuOpen} onClose={closeMenu} />
        <Logo />
        <div className='block sm:hidden'>
          <SearchBar />
        </div>
      </div>
      <GoldRule />
    </header>
  )
}

export default Header