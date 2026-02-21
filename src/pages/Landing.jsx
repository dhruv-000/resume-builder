import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import ThemeToggle from '../components/ThemeToggle'
import { useResume } from '../context/useResume'

const highlights = [
  'Choose industry-focused resume templates for engineering, medical, academic, creative, and corporate roles',
  'Edit every section with live preview while keeping your formatting clean and consistent',
  'Customize typography, spacing, and color to match your personal brand',
  'Export polished resumes as PDF files ready for applications and interviews',
]

function Landing() {
  const navigate = useNavigate()
  const { createResume } = useResume()

  const handleStart = () => {
    createResume('New Resume')
    navigate('/editor')
  }

  return (
    <main className="app-chrome mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="hero-panel relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(13, 148, 136, 0.24)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-6 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(245, 158, 11, 0.24)' }}
        />

        <div className="animate-riseIn mb-6 flex flex-wrap items-center justify-between gap-4">
          <BrandLogo />
          <ThemeToggle />
        </div>
        <p className="animate-riseIn inline-flex rounded-full border border-teal-700/20 bg-teal-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Resume Builder
        </p>
        <h1 className="animate-riseIn mt-4 max-w-4xl font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
          Build polished, job-ready resumes with clarity and speed.
        </h1>
        <p className="animate-riseIn mt-5 max-w-3xl text-base text-stone-700 md:text-lg">
          Pick a template, tailor your content, refine visual style, and export a professional
          resume you can submit with confidence.
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
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="premium-metric animate-riseIn">
            <p className="text-2xl font-extrabold text-stone-900">5+</p>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
              Resume templates
            </p>
          </div>
          <div className="premium-metric animate-riseIn" style={{ animationDelay: '80ms' }}>
            <p className="text-2xl font-extrabold text-stone-900">10+</p>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
              Editable sections
            </p>
          </div>
          <div className="premium-metric animate-riseIn" style={{ animationDelay: '140ms' }}>
            <p className="text-2xl font-extrabold text-stone-900">1 click</p>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
              PDF export
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {highlights.map((point, index) => (
          <article
            key={point}
            className="premium-highlight panel animate-riseIn"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
              Feature {index + 1}
            </p>
            <p className="mt-2 text-sm font-semibold text-stone-900">{point}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Landing
