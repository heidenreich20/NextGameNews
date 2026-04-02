import './globals.css'
import type { Metadata, Viewport } from 'next'
import Header from './components/Header'
import Navbar from './components/Navbar'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

fetch(`${API_URL}/health`).catch(() => { })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' suppressHydrationWarning>
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