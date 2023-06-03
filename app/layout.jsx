'use client'
import './globals.css'
import { Header, Navbar } from './components'
import { DarkModeProvider } from './context/DarkModeContext'
import { NewsListProvider } from './context/NewsListContext'
import { ThemeProvider } from 'next-themes'

export default function NavigationLayout ({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute='class'>
          <NewsListProvider>
            <Header />
            <Navbar />
            {children}
          </NewsListProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
