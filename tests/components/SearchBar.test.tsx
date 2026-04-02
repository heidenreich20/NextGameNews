// tests/components/SearchBar.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../app/utils/SearchBar'

const mockNews = [
  { _id: '1', title: 'Valorant Premier Mode', category: 'FPS',    author: 'Pablo', image: 'https://img.com/1.jpg', createdAt: new Date().toISOString(), text: '', type: 'Noticia',  console: [] },
  { _id: '2', title: 'Elden Ring DLC Review', category: 'RPG',    author: 'Ana',   image: 'https://img.com/2.jpg', createdAt: new Date().toISOString(), text: '', type: 'Análisis', console: [] },
  { _id: '3', title: 'FIFA 25 Analysis',      category: 'Sports', author: 'Luis',  image: 'https://img.com/3.jpg', createdAt: new Date().toISOString(), text: '', type: 'Análisis', console: [] },
]

// Matches text that is split across multiple child elements (e.g. HighlightMatch)
const byTextContent = (text: string) => (_: string, element: Element | null) => {
  if (!element) return false
  return element.textContent?.replace(/\s+/g, ' ').trim() === text
}

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok:   true,
    json: () => Promise.resolve({ newsList: mockNews }),
  } as Response)
})

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('shows matching results after typing', async () => {
    render(<SearchBar />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    await userEvent.type(screen.getByPlaceholderText('Buscar...'), 'valorant')

    await waitFor(() => {
      // Use the custom matcher since HighlightMatch splits text into individual spans
      expect(screen.getByText(byTextContent('Valorant Premier Mode'))).toBeInTheDocument()
    })
  })

  it('shows no results for unmatched query', async () => {
    render(<SearchBar />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    await userEvent.type(screen.getByPlaceholderText('Buscar...'), 'zzzzzz')

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('clears results when the clear button is clicked', async () => {
    render(<SearchBar />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    await userEvent.type(screen.getByPlaceholderText('Buscar...'), 'valorant')

    // Wait for result to appear using the same custom matcher
    await waitFor(() => {
      expect(screen.getByText(byTextContent('Valorant Premier Mode'))).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('Limpiar búsqueda'))

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      expect(screen.getByPlaceholderText('Buscar...')).toHaveValue('')
    })
  })

  it('shows the correct result count label', async () => {
  render(<SearchBar />)
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

  await userEvent.type(screen.getByPlaceholderText('Buscar...'), 'valorant')

  await waitFor(() => {
    const spans = document.querySelectorAll('span')
    const countSpan = Array.from(spans).find(
      s => s.textContent?.replace(/\s+/g, ' ').trim() === '1 resultado'
    )
    expect(countSpan).toBeTruthy()
  })
})

  it('links each result to the correct article page', async () => {
    render(<SearchBar />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

    await userEvent.type(screen.getByPlaceholderText('Buscar...'), 'valorant')

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /Valorant Premier Mode/i })
      expect(link).toHaveAttribute('href', '/analisis/1')
    })
  })
})