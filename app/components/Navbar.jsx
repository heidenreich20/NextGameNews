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
    <nav className='gradient-navbar border-b-2 border-slate-700 sticky hidden top-0 z-50 sm:grid grid-cols-2'>
      <Box
        sx={{
          justifyContent: 'end',
          alignItems: 'center',
          display: 'flex',
          height: '3rem'
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            borderBox: 'true',
            alignItems: 'center',
            px: '1rem'
          }}
        >
          {navigationLinks.map((item) => (
            <Button
              aria-label={`Navigation button to ${item.name}`}
              key={item.name}
              sx={{ color: 'white', fontSize: { sm: '0.8rem', md: '1rem' } }}
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
