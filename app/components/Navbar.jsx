import '../globals.css'
import { Box, Button } from '@mui/material'
import DarkModeSwitch from '../utils/DarkModeSwitch'
import Link from 'next/link'
import SearchBar from '../utils/SearchBar'

const navigationLinks = [
  { name: 'Noticias', href: '/' },
  { name: 'Análisis', href: 'analisis' },
  { name: 'Guías', href: '' },
  { name: 'Lanzamientos', href: '' }
]

const Header = () => {
  return (
    <nav className='gradient-navbar sticky top-0 z-50 hidden md:grid grid-cols-2'>
      <Box
        sx={{
          justifyContent: 'end',
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' },
          height: '3rem'
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            borderBox: 'true',
            borderRight: 3,
            borderColor: '#1e293b',
            alignItems: 'center',
            px: '1rem'
          }}
        >
          {navigationLinks.map((item) => (
            <Button
              aria-label={`Navigation button to ${item.name}`}
              key={item.name}
              sx={{ color: 'white' }}
              variant='text'
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </Box>
      </Box>
      <Box className='flex items-center'>
        <SearchBar />
        <DarkModeSwitch />
      </Box>
    </nav>
  )
}

export default Header

export { navigationLinks }
