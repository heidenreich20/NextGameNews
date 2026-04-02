'use client'
import '../globals.css'
import { useState, useCallback } from 'react'
import DrawerComponent from '../utils/DrawerComponent'
import SearchBar from '../utils/SearchBar'
import Link from 'next/link'

const LOGO_GRADIENT = 'linear-gradient(135deg, var(--color-primary-dk) 0%, var(--color-primary-lt) 50%, var(--color-cream) 100%)'
const ACCENT_GRADIENT = 'linear-gradient(90deg, transparent, var(--color-primary) 30%, var(--color-primary-lt) 50%, var(--color-primary) 70%, transparent)'

const GoldRule = () => (
  <div className='h-px w-full' style={{ background: ACCENT_GRADIENT }} />
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
const CustomMenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-8 h-8"
    style={{ color: 'var(--color-cream)' }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

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
          <CustomMenuIcon />
        </button>
        <DrawerComponent
          id='main-drawer'
          onOpen={menuOpen}
          open={menuOpen}
          onClose={closeMenu}
        />
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