import './globals.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import { pingHealth } from '@/lib/api'
// 1. Import your fonts
import { bebasNeue, goldman, georgia } from './fonts'

export const metadata: Metadata = {
  title: 'Next Game News | El Nexo del Gaming',
  description: 'Análisis profundos, noticias de última hora y la historia de la industria del videojuego.',
  openGraph: {
    title: 'Next Game News | El Nexo del Gaming',
    description: 'Análisis profundos, noticias de última hora y la historia de la industria del videojuego.',
    locale: 'es_ES',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

pingHealth()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang='es' 
      suppressHydrationWarning 
      className={`${bebasNeue.variable} ${goldman.variable} ${georgia.variable}`}
    >
      <body className='antialiased min-h-screen flex flex-col bg-secondary'>
        <Header />
        <Navbar />
        <main className='grow'>
          {children}
        </main>
      </body>
    </html>
  )
}