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
      <h2 className="mt-3 font-serif text-2xl text-stone-900">
        Static-Only Workspace
      </h2>
      <p className="mt-3 text-sm text-stone-600">
        Browser-only mode with localStorage persistence and client-side export.
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
      <p className="mt-8 border-t border-stone-200 pt-3 text-xs font-medium text-stone-500">
        Made by Dhruv Gosavi
      </p>
    </aside>
  )
}

export default Sidebar
