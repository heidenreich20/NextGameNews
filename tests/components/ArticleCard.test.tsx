import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleCard from '../../app/utils/ArticleCard'

const mockProps = {
  id:       '64058a72e034cab974a167e3',
  title:    'Valorant - Modo Premier',
  image:    'https://images.com/test.jpg',
  author:   'Pablo',
  category: 'FPS',
  time:     'hace 2 horas',
}

describe('ArticleCard', () => {
  it('renders title, author, category and time', () => {
    render(<ArticleCard {...mockProps} />)

    const titles = screen.getAllByText('Valorant - Modo Premier')
    expect(titles.length).toBeGreaterThan(0)

    expect(screen.getByText('Pablo')).toBeInTheDocument()
    expect(screen.getAllByText('FPS').length).toBeGreaterThan(0)
    expect(screen.getByText('hace 2 horas')).toBeInTheDocument()
  })

  it('links to the correct article page', () => {
    render(<ArticleCard {...mockProps} />)
    const links = screen.getAllByRole('link')
    expect(links.some(l => l.getAttribute('href')?.includes(mockProps.id))).toBe(true)
  })

  it('renders the article image with correct alt text', () => {
    render(<ArticleCard {...mockProps} />)
    const img = screen.getByAltText(`${mockProps.category} — ${mockProps.title}`)
    expect(img).toBeInTheDocument()
  })
})