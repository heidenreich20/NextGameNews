import { describe, it, expect } from 'vitest'

const fuzzyMatch = (needle: string, haystack: string): boolean => {
  const n = needle.toLowerCase()
  const h = haystack.toLowerCase()
  let i = 0
  for (const char of h) {
    if (char === n[i]) i++
    if (i === n.length) return true
  }
  return false
}

describe('fuzzyMatch', () => {
  it('matches exact strings', () => {
    expect(fuzzyMatch('valorant', 'valorant')).toBe(true)
  })

  it('matches partial sequences', () => {
    expect(fuzzyMatch('vlrnt', 'valorant')).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(fuzzyMatch('VALORANT', 'valorant')).toBe(true)
  })

  it('returns false when characters are out of order', () => {
    expect(fuzzyMatch('tnralov', 'valorant')).toBe(false)
  })

  it('returns false for empty needle', () => {
    expect(fuzzyMatch('', 'valorant')).toBe(true) // empty matches everything
  })

  it('returns false when needle is longer than haystack', () => {
    expect(fuzzyMatch('valorantgame', 'val')).toBe(false)
  })
})