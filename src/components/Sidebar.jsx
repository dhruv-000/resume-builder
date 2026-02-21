import { NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/editor', label: 'Editor' },
  { to: '/settings', label: 'Settings' },
]

function Sidebar() {
  return (
    <aside className="panel hidden h-fit w-full max-w-[220px] animate-riseIn lg:block">
      <BrandLogo />
      <h2 className="mt-3 font-serif text-2xl text-stone-900">Resume Workspace</h2>
      <p className="mt-3 text-sm text-stone-600">
        Manage your resumes, personalize templates, and export polished PDFs.
      </p>
      <nav className="mt-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-teal-700 bg-teal-50 text-teal-900'
                  : 'border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
