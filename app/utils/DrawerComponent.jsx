'use client'
import '../globals.css'
import React, { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import { navigationLinks } from '../components/Navbar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'
import DarkModeSwitch from './DarkModeSwitch'

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
        <DarkModeSwitch />
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
