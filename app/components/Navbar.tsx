import '../globals.css'
import Link from 'next/link'
import SearchBar from '../utils/SearchBar'

export const navigationLinks = [
  { name: 'Noticias',     href: '/' },
  { name: 'Análisis',     href: '/analisis' },
  { name: 'Guías',        href: '/guias' },
  { name: 'Lanzamientos', href: '/lanzamientos' },
]

const NavLink = ({ name, href }: { name: string; href: string }) => (
  <Link
    href={href}
    aria-label={`Ir a ${name}`}
    className='relative group px-4 py-1 text-sm font-semibold tracking-widest uppercase transition-colors duration-200'
    style={{ fontFamily: 'var(--font-article)', color: 'var(--color-cream)' }}
  >
    {name}
    <span
      className='absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-300'
      style={{ background: 'var(--color-primary-lt)' }}
      aria-hidden
    />
  </Link>
)

const Navbar = () => (
  <nav
    className='gradient-navbar sticky top-0 z-40 hidden cmd:flex items-center justify-between px-8 max-w-7xl mx-auto w-full h-12'
    aria-label='Navegación principal'
  >
    <div className='flex items-center h-full' role='menubar'>
      {navigationLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </div>
    <div className='flex items-center gap-3'>
      <SearchBar />
    </div>
  </nav>
)

export default Navbar