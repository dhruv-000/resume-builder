import { useNavigate } from 'react-router-dom'
import MobileNav from '../components/MobileNav'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useResume } from '../context/useResume'

const formatDate = (isoDate) => {
  if (!isoDate) return 'Unknown date'
  try {
    return new Date(isoDate).toLocaleDateString()
  } catch {
    return 'Unknown date'
  }
}

function Dashboard() {
  const navigate = useNavigate()
  const { resumes, activeResumeId, createResume, selectResume, duplicateResume, deleteResume } =
    useResume()

  const handleCreate = () => {
    createResume('New Resume')
    navigate('/editor')
  }

  return (
    <main className="app-chrome mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 px-3 pb-24 pt-3 sm:px-5 lg:pb-6">
      <Sidebar />

      <section className="w-full space-y-4">
        <Topbar
          onCreate={handleCreate}
          subtitle="Manage local resumes without any backend."
          title="Dashboard"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resumes.map((resume) => (
            <article
              key={resume.id}
              className={`panel animate-riseIn ${
                activeResumeId === resume.id ? 'border-teal-600' : ''
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
                {resume.template}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-stone-900">{resume.title}</h2>
              <p className="mt-1 text-sm text-stone-600">{resume.personal.fullName}</p>
              <p className="text-xs text-stone-500">Updated: {formatDate(resume.updatedAt)}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="btn-primary"
                  onClick={() => {
                    selectResume(resume.id)
                    navigate('/editor')
                  }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => duplicateResume(resume.id)}
                  type="button"
                >
                  Duplicate
                </button>
                <button
                  className="btn-danger"
                  onClick={() => deleteResume(resume.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        <section className="panel">
          <h3 className="font-serif text-lg text-stone-900">Static Hosting Checklist</h3>
          <ul className="mt-3 space-y-1 text-sm text-stone-700">
            <li>All data remains in browser localStorage</li>
            <li>No API calls and no backend dependencies</li>
            <li>PDF generation executes entirely client-side</li>
            <li>Build output is fully deployable to GitHub Pages</li>
          </ul>
        </section>

        <MobileNav />
      </section>
    </main>
  )
}

export default Dashboard
