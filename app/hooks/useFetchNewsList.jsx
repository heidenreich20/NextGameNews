'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const useFetchNewsList = () => {
  const [newsList, setNewsList] = useState([])
  const params = useParams()
  console.log(params.postId)

  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const response = await fetch(`https://game-news-server.onrender.com/getreviews/${params.postId}`)
        if (response.ok) {
          const { article } = await response.json()
          setNewsList(article)
        } else {
          console.error(`Request failed with status ${response.status}`)
        }
      } catch (error) {
        console.error(error)
      } finally {
      }
    }

    fetchNewsList()
  }, [])

  return { newsList }
}

export { useFetchNewsList }
