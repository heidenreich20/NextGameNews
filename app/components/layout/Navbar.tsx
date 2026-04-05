'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from '@/components/shared/SearchBar'

export const navigationLinks = [
  { name: 'Noticias',     href: '/'            },
  { name: 'Análisis',     href: '/analisis'    },
  { name: 'Guías',        href: '/guias'       },
  { name: 'Lanzamientos', href: '/lanzamientos'},
]

// ── Nav link ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  name:    string
  href:    string
  current: boolean
}

const NavLink = ({ name, href, current }: NavLinkProps) => (
  <li>
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
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
  </li>
)

// ── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav
      className='gradient-navbar sticky top-0 z-40 hidden cmd:flex items-center justify-between px-8 max-w-7xl mx-auto w-full h-12'
      aria-label='Navegación principal'
    >
      <ul role='list' className='flex items-center h-full p-0 m-0'>
        {navigationLinks.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            current={pathname === link.href}
          />
        ))}
      </ul>
      <SearchBar />
    </nav>
  )
}

export default Navbar