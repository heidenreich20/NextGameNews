'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className='flex flex-col items-center justify-center min-h-[50vh] gap-6'
      style={{ background: 'var(--color-secondary)' }}
    >
      <p
        className='text-5xl tracking-widest'
        style={{ fontFamily: 'var(--font-title)', color: 'var(--color-primary-lt)' }}
      >
        Error al cargar
      </p>
      <p
        className='text-sm'
        style={{ fontFamily: 'var(--font-article)', color: 'rgba(232,213,163,0.4)' }}
      >
        El servidor tardó demasiado en responder. Intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className='px-6 py-2 text-xs tracking-widest uppercase'
        style={{
          fontFamily: 'var(--font-article)',
          color: 'var(--color-secondary)',
          backgroundColor: 'var(--color-primary)',
          border: '1px solid var(--color-primary-lt)',
        }}
      >
        Reintentar
      </button>
    </div>
  )
}