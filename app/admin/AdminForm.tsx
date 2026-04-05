'use client'
import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { NewsItem } from '@/types/types'
import { createArticle } from '@/lib/api'

const CONSOLE_OPTIONS = ['PlayStation', 'Xbox', 'Nintendo', 'PC'] as const

type FormState = Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>
type Tab = 'write' | 'preview'

const EMPTY_FORM: FormState = {
  title: '', text: '', image: '', category: '', author: '', type: 'Noticia', console: [],
}

const inputStyle: React.CSSProperties = {
  background: 'var(--color-surface)', border: '1px solid rgba(184,151,42,0.25)',
  color: 'var(--color-cream)', fontFamily: 'var(--font-article)',
  borderRadius: '4px', width: '100%', padding: '0.5rem 0.75rem',
  fontSize: '0.9rem', outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-article)', fontSize: '0.65rem', letterSpacing: '0.15em',
  textTransform: 'uppercase', color: 'var(--color-primary-lt)',
  display: 'block', marginBottom: '0.35rem',
}

const MarkdownEditor = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  const [tab, setTab] = useState<Tab>('write')

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-article)',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? '2px solid var(--color-primary-lt)' : '2px solid transparent',
    background: 'transparent',
    color: active ? 'var(--color-primary-lt)' : 'rgba(232,213,163,0.35)',
    transition: 'all 0.15s',
  })

  return (
    <div>
      <label style={labelStyle}>Contenido (Markdown)</label>
      <div
        className='flex gap-1 mb-0'
        style={{ borderBottom: '1px solid rgba(184,151,42,0.2)' }}
      >
        <button type='button' style={tabStyle(tab === 'write')} onClick={() => setTab('write')}>
          Escribir
        </button>
        <button type='button' style={tabStyle(tab === 'preview')} onClick={() => setTab('preview')}>
          Vista previa
        </button>
      </div>
      {tab === 'write' && (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={16}
          placeholder={`# Título\n\nEscribe tu artículo en **Markdown**...\n\n## Sección\n\nTexto...`}
          style={{
            ...inputStyle,
            borderRadius: '0 4px 4px 4px',
            resize: 'vertical',
            lineHeight: '1.7',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
          }}
          required
        />
      )}
      {tab === 'preview' && (
        <div
          className='prose-article min-h-50 px-4 py-4 rounded-b'
          style={{
            ...inputStyle,
            borderRadius: '0 4px 4px 4px',
            minHeight: '300px',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
          }}
        >
          {value
            ? (
              <div className='prose-article'>
                <ReactMarkdown >{value}</ReactMarkdown>
              </div>
            )
            : <p style={{ color: 'rgba(232,213,163,0.25)', fontStyle: 'italic' }}>Nada que previsualizar aún...</p>
          }
        </div>
      )}
      <details className='mt-2'>
        <summary
          className='text-[0.6rem] tracking-widest uppercase cursor-pointer select-none'
          style={{ color: 'rgba(232,213,163,0.35)', fontFamily: 'var(--font-article)' }}
        >
          Referencia Markdown
        </summary>
        <div
          className='mt-2 p-3 rounded text-[0.75rem] grid grid-cols-2 gap-x-6 gap-y-1'
          style={{
            background: 'rgba(184,151,42,0.04)',
            border: '1px solid rgba(184,151,42,0.15)',
            fontFamily: 'monospace',
            color: 'rgba(232,213,163,0.5)',
          }}
        >
          {[
            ['# Título', 'H1'],
            ['## Subtítulo', 'H2'],
            ['**negrita**', 'Negrita'],
            ['*cursiva*', 'Cursiva'],
            ['> cita', 'Cita'],
            ['`código`', 'Código'],
            ['---', 'Separador'],
            ['[texto](url)', 'Enlace'],
          ].map(([syntax, label]) => (
            <div key={syntax} className='flex gap-2'>
              <span style={{ color: 'var(--color-primary-lt)' }}>{syntax}</span>
              <span>→ {label}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
export default function AdminForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [apiKey, setApiKey] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleConsoleToggle = useCallback((name: string) => {
    setForm(prev => ({
      ...prev,
      console: prev.console.includes(name)
        ? prev.console.filter(c => c !== name)
        : [...prev.console, name],
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const article = await createArticle(form, apiKey)
      setStatus('success')
      setMessage(`✓ Artículo creado: ${article.title}`)
      setForm(EMPTY_FORM)
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message ?? 'No se pudo conectar con el servidor')
    }
  }

  return (
    <div className='max-w-2xl mx-auto my-12 px-6' style={{ background: 'var(--color-secondary)', minHeight: '100vh' }}>
      <h1 className='text-5xl mb-2' style={{ fontFamily: 'var(--font-title)', color: 'var(--color-cream)' }}>
        Nuevo artículo
      </h1>
      <hr className='gold-rule mb-8' style={{ opacity: 0.4 }} />

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

        <div>
          <label style={labelStyle}>API Key</label>
          <input type='password' value={apiKey} onChange={e => setApiKey(e.target.value)}
            placeholder='••••••••' style={inputStyle} required />
        </div>

        <div>
          <label style={labelStyle}>Título</label>
          <input name='title' value={form.title} onChange={handleChange} style={inputStyle} required />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label style={labelStyle}>Autor</label>
            <input name='author' value={form.author} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Tipo</label>
            <select name='type' value={form.type} onChange={handleChange} style={inputStyle}>
              <option value='Noticia'>Noticia</option>
              <option value='Análisis'>Análisis</option>
              <option value='Guía'>Guía</option>
              <option value='Lanzamiento'>Lanzamiento</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Categoría</label>
          <input name='category' value={form.category} onChange={handleChange} style={inputStyle} required />
        </div>

        <div>
          <label style={labelStyle}>URL de imagen</label>
          <input name='image' value={form.image} onChange={handleChange} style={inputStyle} required />
          {form.image && (
            <img src={form.image} alt='preview' loading='lazy'
              className='mt-2 rounded aspect-video object-cover w-full'
              style={{ border: '1px solid rgba(184,151,42,0.2)' }}
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>

        <div>
          <label style={labelStyle}>Plataformas</label>
          <div className='flex gap-3 flex-wrap'>
            {CONSOLE_OPTIONS.map(name => (
              <button key={name} type='button' onClick={() => handleConsoleToggle(name)}
                className='px-3 py-1 text-xs rounded transition-all duration-150'
                style={{
                  fontFamily: 'var(--font-article)',
                  border: '1px solid rgba(184,151,42,0.35)',
                  background: form.console.includes(name) ? 'var(--color-primary)' : 'transparent',
                  color: form.console.includes(name) ? 'var(--color-secondary)' : 'var(--color-cream)',
                }}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <MarkdownEditor
          value={form.text}
          onChange={val => setForm(prev => ({ ...prev, text: val }))}
        />

        {status !== 'idle' && (
          <p className='text-sm px-3 py-2 rounded' style={{
            fontFamily: 'var(--font-article)',
            background: status === 'success' ? 'rgba(184,151,42,0.1)' : 'rgba(220,38,38,0.1)',
            border: `1px solid ${status === 'success' ? 'rgba(184,151,42,0.3)' : 'rgba(220,38,38,0.3)'}`,
            color: status === 'success' ? 'var(--color-primary-lt)' : '#f87171',
          }}>
            {message}
          </p>
        )}

        <button type='submit' disabled={status === 'loading'}
          className='px-8 py-3 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-12'
          style={{
            fontFamily: 'var(--font-article)', color: 'var(--color-secondary)',
            backgroundColor: 'var(--color-primary)', border: '2px solid var(--color-primary-lt)',
          }}>
          {status === 'loading' ? 'Publicando...' : 'Publicar artículo'}
        </button>

      </form>
    </div>
  )
}