import { NewsItem, NewsListResponse, ArticleResponse } from '../types/types'

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')

// ── Shared fetch wrapper ──────────────────────────────────────────────────────

interface FetchOptions extends Omit<RequestInit, 'signal'> {
  revalidate?: number
  timeout?: number
}

async function apiFetch<T>(path: string, { revalidate, timeout = 10_000, ...init }: FetchOptions = {}): Promise<T> {
  const url = `${BASE}/${path.replace(/^\//, '')}`

  const res = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(timeout),
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw Object.assign(
      new Error(error?.error ?? `API error: ${res.status} ${res.statusText}`),
      { status: res.status }
    )
  }

  return res.json()
}

// ── News ──────────────────────────────────────────────────────────────────────

export interface FetchNewsParams {
  page?:     number
  limit?:    number
  category?: string
  type?:     string
}

export async function fetchNews(params: FetchNewsParams = {}): Promise<NewsListResponse> {
  const query = new URLSearchParams()
  if (params.page)     query.set('page',     String(params.page))
  if (params.limit)    query.set('limit',    String(params.limit))
  if (params.category) query.set('category', params.category)
  if (params.type)     query.set('type',     params.type)

  const qs = query.toString()
  return apiFetch<NewsListResponse>(`news${qs ? `?${qs}` : ''}`, { revalidate: 60 })
}

// Used by SearchBar — fetches a large batch client-side, no cache needed
export async function fetchAllNews(limit = 100): Promise<NewsItem[]> {
  const data = await apiFetch<NewsListResponse>(`news?limit=${limit}`)
  return data.newsList ?? []
}

// ── Article ───────────────────────────────────────────────────────────────────

// Returns null on 404 instead of throwing, so pages can call notFound() themselves
export async function fetchArticle(id: string): Promise<NewsItem | null> {
  try {
    const data = await apiFetch<ArticleResponse>(`news/${id}`, { revalidate: 60 })
    return data.article
  } catch (err: any) {
    if (err?.status === 404) return null
    throw err
  }
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export interface CreateArticlePayload {
  title:    string
  text:     string
  image:    string
  category: string
  author:   string
  type:     string
  console:  string[]
}

export async function createArticle(payload: CreateArticlePayload, apiKey: string): Promise<NewsItem> {
  const data = await apiFetch<ArticleResponse>('news', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body:    JSON.stringify(payload),
    timeout: 15_000,
  })
  return data.article
}

export async function updateArticle(id: string, payload: Partial<CreateArticlePayload>, apiKey: string): Promise<NewsItem> {
  const data = await apiFetch<ArticleResponse>(`news/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body:    JSON.stringify(payload),
    timeout: 15_000,
  })
  return data.article
}

export async function deleteArticle(id: string, apiKey: string): Promise<void> {
  await apiFetch(`news/${id}`, {
    method:  'DELETE',
    headers: { 'x-api-key': apiKey },
    timeout: 15_000,
  })
}

// ── Upload ────────────────────────────────────────────────────────────────────

export async function uploadImage(file: File, apiKey: string): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const url = `${BASE}/upload`

  const res = await fetch(url, {
    method:  'POST',
    headers: { 'x-api-key': apiKey },
    body:    formData,
    signal:  AbortSignal.timeout(15_000),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw Object.assign(
      new Error(error?.error ?? `Upload failed: ${res.status}`),
      { status: res.status }
    )
  }

  const data = await res.json()
  return data.url
}

// ── Health ────────────────────────────────────────────────────────────────────

export function pingHealth(): void {
  apiFetch('health').catch(() => {})
}