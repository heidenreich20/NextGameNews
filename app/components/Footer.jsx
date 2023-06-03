import '../globals.css'
import React from 'react'
import {
  Link,
  Typography,
  IconButton
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const buttonSX = {
  p: '0.25rem',
  mx: '0.25rem',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer',
  color: '#e6e6e6',
  '&:hover': { bgcolor: '#25334a' }
}

const secondaryBtnSX = {
  p: '0.3rem',
  textDecoration: 'none',
  cursor: 'pointer',
  color: '#e6e6e6',
  fontSize: { xs: '0.75rem', md: '1rem' }
}

const Footer = () => {
  return (
    <div className='gradient-footer flex flex-col place-content-between items-center bg-black p-2'>
      <div className='flex flex-wrap justify-center'>
        <Link aria-label='contact us' href='/contact' sx={buttonSX}>
          Contacto
        </Link>
        <Link aria-label='about us' sx={buttonSX}>Quienes somos</Link>
        <Link aria-label='our politics' sx={buttonSX}>Políticas</Link>
        <Link aria-label='work with us' sx={buttonSX}>Trabaja con nosotros</Link>
      </div>
      <div className='flex items-center'>
        <Typography sx={{ mr: '0.75rem', fontSize: '1rem', color: '#e6e6e6' }}>
          Nuestras redes
        </Typography>

        <IconButton
          aria-label='our Facebook page'
          sx={{
            color: 'lightgrey',
            '&:hover': {
              color: '#1877f2',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a target='blank' href='https://www.facebook.com/pablo.heidenreich.315'>
            <FacebookIcon sx={{ fontSize: '2rem' }} />
          </a>
        </IconButton>
        <IconButton
          aria-label='our Instagram page'
          sx={{
            color: 'lightgrey',
            '&:hover': {
              color: '#E1306C',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a target='blank' href='https://www.instagram.com/revicmanne/'>
            <InstagramIcon sx={{ fontSize: '2rem' }} />
          </a>
        </IconButton>
        <IconButton
          aria-label='our Twitter page'
          sx={{
            color: 'lightgrey',
            '&:hover': {
              color: '#1DA1F2',
              backgroundColor: 'transparent'
            }
          }}
        >
          <a target='blank' href='https://twitter.com/Pablo_Heiden'>
            <TwitterIcon sx={{ fontSize: '2rem' }} />
          </a>
        </IconButton>
      </div>
      <div className='flex justify-center'>
        <Typography sx={secondaryBtnSX}>
          ©2023 All Rights Reserved | Developed by Pablo Heidenreich
        </Typography>
      </div>
    </div>
  )
}

export default Footer
