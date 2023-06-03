import React, { createContext, useState, useEffect, useLayoutEffect } from 'react'

export const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
  }

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'))
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode)
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDarkMode)
      localStorage.setItem('darkMode', JSON.stringify(prefersDarkMode))
    }
  }, [])

  useLayoutEffect(() => {
    document.querySelector('html').classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}