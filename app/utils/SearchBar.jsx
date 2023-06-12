'use client'
import '../globals.css'
import React, { useState, useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { NewsListContext } from '../context/NewsListContext'

const SearchBar = () => {
  const [value, setValue] = useState('')
  const { setCategory, category } = useContext(NewsListContext)

  //   const debouncedSearch = useCallback(debounce(search => {
  //     setCategory(search)
  //   }, 300), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setCategory(value)
    console.log(category)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <form className='flex justify-end items-center mx-2 sm:mx-4' onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} name='query' className='rounded-sm md:w-full w-2/3 dark:text-slate-800 py-0.5 px-1 font-semibold bg-slate-300 placeholder:text-slate-700' placeholder='Buscar...' />
      <SearchIcon className='border-l text-slate-700 border-slate-700 absolute' />
    </form>
  )
}

export default SearchBar
