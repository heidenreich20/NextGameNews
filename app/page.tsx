'use client'
import './globals.css'
import { Banner, NewsBody, Footer, Header, Navbar } from './components'
import { DarkModeProvider } from './context/DarkModeContext'
import { NewsListProvider } from './context/NewsListContext'

function App () {
  return (
    <>
      <Banner />
      <NewsBody />
      <Footer />
    </>
  )
}

export default App
