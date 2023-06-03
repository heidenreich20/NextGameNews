'use client'
import '../globals.css'
import React, { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Switch
} from '@mui/material'
import { navigationLinks } from '../components/Navbar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'

import { styled } from '@mui/material/styles'

export const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#334155',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569',
    borderRadius: 20 / 2
  }
}))

const DrawerComponent = ({ open, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

  return (
    <Drawer anchor='left' open={open} disableScrollLock onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <DarkModeSwitch
          aria-label='dark mode toggle'
          sx={{ marginLeft: '0.5rem' }}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <ChevronLeftIcon
          className='hover:scale-125'
          id='close-menu'
          onClick={onClose}
          sx={{ fontSize: '2.5rem', color: 'black' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingY: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '2px solid lightgrey'
        }}
      >
        {/* <button
          className="mx-1 rounded bg-gray-800 py-2 px-2 text-white dark:bg-white"
          onClick={toggleDarkMode}
          >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            paddingLeft: '0.4rem'
          }}
        >
          SECCIONES
        </Typography>
      </Box>
      <Box sx={{ borderBottom: '2px solid lightgrey', paddingBottom: '1rem' }}>
        {navigationLinks.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className='selected:bg-black flex w-64 px-2 pb-2 font-semibold transition-transform duration-200 ease-in-out hover:translate-x-1 hover:cursor-pointer'
          >
            {item.name}
          </Link>
        ))}
      </Box>
      <Typography
        sx={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          paddingLeft: '0.4rem',
          marginTop: '1rem'
        }}
      >
        SÍGUENOS
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <IconButton
          sx={{
            '&:hover': {
              color: '#1877f2',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a href='https://www.facebook.com/pablo.heidenreich.315'>
            <FacebookIcon sx={{ fontSize: '2.5rem' }} />
          </a>
        </IconButton>
        <IconButton
          sx={{
            '&:hover': {
              color: '#E1306C',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a href='https://www.instagram.com/revicmanne/'>
            <InstagramIcon sx={{ fontSize: '2.5rem' }} />
          </a>
        </IconButton>
        <IconButton
          sx={{
            '&:hover': {
              color: '#1DA1F2',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a href='https://twitter.com/Pablo_Heiden'>
            <TwitterIcon sx={{ fontSize: '2.5rem' }} />
          </a>
        </IconButton>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent
