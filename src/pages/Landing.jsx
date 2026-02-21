import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { useResume } from '../context/useResume'

const highlights = [
  'No backend, no database, zero server runtime',
  'All edits save instantly in browser localStorage',
  'Template gallery built for engineering, medical, academic, creative, and corporate profiles',
  'Client-side PDF export using html2pdf.js',
  'Deploy-ready static build for GitHub Pages',
]

function Landing() {
  const navigate = useNavigate()
  const { createResume } = useResume()

  const handleStart = () => {
    createResume('World-Class Resume')
    navigate('/editor')
  }

  return (
    <main className="app-chrome mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-card backdrop-blur-md md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(15, 118, 110, 0.23)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 left-6 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(251, 146, 60, 0.24)' }}
        />

        <div className="animate-riseIn mb-4">
          <BrandLogo />
        </div>
        <p className="animate-riseIn text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
          100% Static Architecture
        </p>
        <h1 className="animate-riseIn mt-3 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
          Build world-class resumes in the browser and deploy directly on GitHub Pages.
        </h1>
        <p className="animate-riseIn mt-5 max-w-3xl text-base text-stone-700 md:text-lg">
          Resume Builder Pro is fully client-side. Everything runs locally, exports clean PDFs, and
          persists data with localStorage.
        </p>
        <div className="animate-riseIn mt-8 flex flex-wrap gap-3">
          <button className="btn-primary px-6 py-3 text-base" onClick={handleStart} type="button">
            Start Building
          </button>
          <button
            className="btn-secondary px-6 py-3 text-base"
            onClick={() => navigate('/dashboard')}
            type="button"
          >
            Open Dashboard
          </button>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
          Designed and built by Dhruv Gosavi
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {highlights.map((point, index) => (
          <article
            key={point}
            className="panel animate-riseIn"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="text-sm font-semibold text-stone-900">{point}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Landing
