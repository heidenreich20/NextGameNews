/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html', './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f3c4c',
        secondary: '#041014',
        facebook: '#3b5998',
        instagram: '#C13584'
      },
      fontFamily: {
        logo: ['Goldman_regular'],
        title: ['Bebas Neue'],
        article: ['Arial']
      },
      spacing: {
        1: '8px',
        2: '12px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '48px'
      },
      width: {
        '3DJuegos': '544px'
      },
      screens: {
        sm: '720px',
        csm: '720px',
        md: '1150px'
      },
      boxShadow: {
        '3xl': '0 60px 120px -5px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: []
}
