export default function fetchPost () {
  return fetch('https://game-news-server.onrender.com/getreviews/64058a72e034cab974a167e3')
    .then(res => res.json())
}
