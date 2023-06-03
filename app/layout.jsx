'use client'
import './globals.css'
import { Header, Navbar } from './components'
import { DarkModeProvider } from './context/DarkModeContext'
import { NewsListProvider } from './context/NewsListContext'




export default function NavigationLayout ({ children }) {
  return (
    <html>
      <body> 
    <DarkModeProvider>
    <NewsListProvider>   
      <Header />
      <Navbar />
      {children}
    </NewsListProvider>
    </DarkModeProvider>
      </body>
    </html>
  )
}