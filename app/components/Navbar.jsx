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
    <nav className='sticky top-0 z-50 hidden md:block'>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: '#1e293b',
          justifyContent: 'center',
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' },
          height: '3rem',
          bgcolor: '#0b1221'
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
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            px: '1rem',
            borderRight: 3,
            borderColor: '#1e293b'
          }}
        />
        <SearchBar />
        <DarkModeSwitch />
      </Box>
    </nav>
  )
}

export default Header

export { navigationLinks }
