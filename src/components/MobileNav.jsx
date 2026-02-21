import { NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/editor', label: 'Editor' },
  { to: '/settings', label: 'Settings' },
]

function MobileNav() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-20 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-2xl border border-stone-200 bg-white/95 p-1.5 shadow-card backdrop-blur-md lg:hidden">
      <div className="mb-1 flex items-center justify-center gap-1 rounded-xl border border-stone-200 bg-stone-50 px-2 py-1">
        <BrandLogo showText={false} size="sm" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-600">
          Resume Builder Pro
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-center text-xs font-semibold transition ${
                isActive
                  ? 'bg-teal-700 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav
