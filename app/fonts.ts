import localFont from 'next/font/local'

export const bebasNeue = localFont({
  src: '../public/fonts/BebasNeue-Regular.ttf',
  display: 'swap',
  variable: '--font-title',
})

export const goldman = localFont({
  src: '../public/fonts/Goldman-Regular.ttf',
  display: 'swap',
  variable: '--font-logo',
})

export const georgia = localFont({
  src: '../public/fonts/Georgia.ttf',
  display: 'swap',
  variable: '--font-article',
})