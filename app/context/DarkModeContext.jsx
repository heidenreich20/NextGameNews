'use client'
import React, { createContext, useState, useEffect } from 'react'

export const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
  }

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'))
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode)
    }
  }, [])

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
