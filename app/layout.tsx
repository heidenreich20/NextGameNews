'use client'
import './globals.css'
import { ReactNode } from 'react'
import { Header, Navbar } from './components'
import { DarkModeProvider } from './context/DarkModeContext'
import { NewsListProvider } from './context/NewsListContext'

type Props = {
  children: ReactNode;
};


export default function NavigationLayout ({ children }: Props) {
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