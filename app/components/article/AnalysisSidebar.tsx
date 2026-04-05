import Link from 'next/link'
import AnalysisGrid, { AnalysisItem } from './AnalysisGrid'

const AnalysisSidebar = ({ items }: { items: AnalysisItem[] }) => (
  <aside
    className='hidden md:flex flex-col rounded-lg overflow-hidden'
    style={{ border: '1px solid rgba(184,151,42,0.2)', background: 'var(--color-surface)' }}
  >
    <div className='px-4 py-3' style={{ borderBottom: '1px solid rgba(184,151,42,0.2)' }}>
      <h2
        className='text-2xl tracking-wide'
        style={{ fontFamily: 'var(--font-title)', color: 'var(--color-cream)' }}
      >
        Análisis
      </h2>
    </div>
    <div className='flex-1 p-2'>
      <AnalysisGrid items={items} />
    </div>
    <div style={{ borderTop: '1px solid rgba(184,151,42,0.15)' }}>
      <Link
        href='/analisis'
        className='flex items-center justify-center py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-80'
        style={{ fontFamily: 'var(--font-article)', color: 'var(--color-primary-lt)' }}
      >
        Más análisis
      </Link>
    </div>
  </aside>
)

export default AnalysisSidebar