const SERVER_PREFIX_URL = 'https://game-news-server.onrender.com'

export default function fetchNewsList () {
  return fetch(`${SERVER_PREFIX_URL}/news`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      return res.json()
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}
