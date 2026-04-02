import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoadMoreButton from '../../app/utils/LoadMoreButton'

describe('LoadMoreButton', () => {
  it('renders when there are more articles to load', () => {
    render(<LoadMoreButton totalNewsCount={20} initialCount={10} />)
    expect(screen.getByText('Cargar más noticias')).toBeInTheDocument()
  })

  it('does not render when all articles are loaded', () => {
    render(<LoadMoreButton totalNewsCount={10} initialCount={10} />)
    expect(screen.queryByText('Cargar más noticias')).not.toBeInTheDocument()
  })

  it('does not render when initialCount exceeds total', () => {
    render(<LoadMoreButton totalNewsCount={5} initialCount={10} />)
    expect(screen.queryByText('Cargar más noticias')).not.toBeInTheDocument()
  })
})