'use client'
import { useState, useEffect, createContext } from 'react'

export const SERVER_PREFIX_URL = 'https://game-news-server.onrender.com'

export const NewsListContext = createContext()

export const NewsListProvider = ({ children }) => {
  const [limit, setLimit] = useState(5)
  const [newsList, setNewsList] = useState([])
  const [sortedList, setSortedList] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingCategory, setLoadingCategory] = useState(true)
  const [totalNews, setTotalNews] = useState()
  const [category, setCategory] = useState(undefined)

  useEffect(() => {
    setLoading(true)
    const fetchNewsList = async () => {
      try {
        const response = await fetch(`${SERVER_PREFIX_URL}/news`)
        if (response.ok) {
          const { newsList, totalNewsCount } = await response.json()
          setNewsList(newsList)
          setTotalNews(totalNewsCount)
          setLoading(false) // Set loading to false once data is fetched
        } else {
          console.error(`Request failed with status ${response.status}`)
          setLoading(false) // Set loading to false in case of an error
        }
      } catch (error) {
        console.error(error)
        setLoading(false) // Set loading to false in case of an error
      }
    }

    fetchNewsList()
  }, [])

  useEffect(() => {
    setLoadingCategory(true)
    const fetchSortedList = async () => {
      try {
        const response = await fetch(`${SERVER_PREFIX_URL}/news/category?limit=${limit}&category=${!category ? undefined : category}`)
        if (response.ok) {
          const { newsList, categoryCount, totalNewsCount } = await response.json()
          setSortedList(newsList)
          setTotalNews(categoryCount || totalNewsCount)
          setLoadingCategory(false) // Set loading to false once data is fetched
        } else {
          console.error(`Request failed with status ${response.status}`)
          setLoadingCategory(false) // Set loading to false in case of an error
        }
      } catch (error) {
        console.error(error)
        setLoadingCategory(false) // Set loading to false in case of an error
      }
    }

    fetchSortedList()
  }, [category])

  const loadMore = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${SERVER_PREFIX_URL}/news/category?limit=${limit + 5}&category=${!category ? undefined : category}`
      )
      if (response.ok) {
        const { newsList } = await response.json()
        setLimit(prev => prev + 5)
        setSortedList(newsList)
      } else {
        console.error(`Request failed with status ${response.status}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <NewsListContext.Provider value={{ loadMore, loadingCategory, limit, newsList, loading, totalNews, setCategory, category, sortedList }}>
      {children}
    </NewsListContext.Provider>
  )
}
