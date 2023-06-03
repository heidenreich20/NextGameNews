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
    <header className='gradient-banner sticky top-0 z-50 m-auto flex sm:grid justify-around h-14 grid-cols-2 csm:grid-cols-3 place-items-center items-center gap-1 border-b-2 border-slate-800 csm:static csm:gap-4 md:h-20'>
      <IconButton
        onClick={() => setOpenMenu(true)}
        sx={{
          borderRadius: '1rem',
          display: 'flex',
          color: 'white',
          fontSize: '1.2rem',
          fontFamily: 'var(--main-font)'
        }}
      >
        <MenuIcon sx={{ fontSize: '2rem' }} />
        <Typography
          sx={{
            fontFamily: 'Bebas Neue',
            fontSize: '1.3rem',
            pt: '2px'
          }}
        >
          Secciones
        </Typography>
      </IconButton>
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
      <section className='block md:hidden'>
        <SearchBar />
      </section>
      {/* <TextField
        color='primary'
        placeholder='Buscar...'
        size='small'
        sx={{
          input: { color: 'white' },
          bgcolor: '#475569',
          textColor: 'white',
          borderRadius: '5px',
          width: { xs: '70%', md: '35%' }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          )
        }}
      /> */}
    </header>
  )
}

export default Header
