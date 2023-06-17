import '../globals.css'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { DrawerComponent } from '../utils'
import { IconButton, Typography } from '@mui/material'
import SearchBar from '../utils/SearchBar'
import Link from 'next/link'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <header className='gradient-banner border-b-2 border-b-slate-700 sticky top-0 z-50 m-auto flex sm:grid content-center sm:justify-center justify-between h-14 place-items-center items-center gap-1 csm:static csm:gap-4 md:h-20'>
      <button
        className='flex sm:hidden p-1'
        onClick={() => setOpenMenu(true)}
      >
        <MenuIcon sx={{ fontSize: '3rem' }} />
      </button>
      <DrawerComponent
        onOpen={openMenu}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      />

      <Link
        href='/'
        className='csm:block hidden font-logo text-3xl text-white hover:cursor-pointer dark:text-white md:text-5xl'
      >
        <h1>GAMENEWS</h1>
      </Link>
      <section className='block sm:hidden'>
        <SearchBar />
      </section>
    </header>
  )
}

export default Header
