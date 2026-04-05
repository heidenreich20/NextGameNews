import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadMore from '@/components/shared/LoadMore'

describe('LoadMore', () => {
  it('renders when there are more articles to load', () => {
    render(<LoadMore totalNewsCount={20} initialCount={10} />)
    expect(screen.getByText('Cargar más noticias')).toBeInTheDocument()
  })

  it('does not render when all articles are loaded', () => {
    render(<LoadMore totalNewsCount={10} initialCount={10} />)
    expect(screen.queryByText('Cargar más noticias')).not.toBeInTheDocument()
  })

  it('does not render when initialCount exceeds total', () => {
    render(<LoadMore totalNewsCount={5} initialCount={10} />)
    expect(screen.queryByText('Cargar más noticias')).not.toBeInTheDocument()
  })
})