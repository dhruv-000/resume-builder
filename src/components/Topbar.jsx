import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { useResume } from '../context/useResume'

function Topbar({
  title,
  subtitle,
  onCreate,
  onDuplicate,
  onDelete,
  onExport,
  onBackToDashboard = false,
}) {
  const { settings, updateSettings } = useResume()
  const isDark = settings.themeMode === 'dark'

  return (
    <header className="panel animate-riseIn">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BrandLogo showText={false} size="sm" />
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
              World-Class Resume Builder
            </p>
          </div>
          <h1 className="mt-2 font-serif text-2xl text-stone-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-stone-600">{subtitle}</p>}
          <p className="mt-1 text-xs font-medium text-stone-500">Made by Dhruv Gosavi</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {onBackToDashboard && (
            <Link className="btn-secondary" to="/dashboard">
              Dashboard
            </Link>
          )}
          {onCreate && (
            <button className="btn-secondary" onClick={onCreate} type="button">
              New
            </button>
          )}
          {onDuplicate && (
            <button className="btn-secondary" onClick={onDuplicate} type="button">
              Duplicate
            </button>
          )}
          {onDelete && (
            <button className="btn-danger" onClick={onDelete} type="button">
              Delete
            </button>
          )}
          {onExport && (
            <button className="btn-primary" onClick={onExport} type="button">
              Export PDF
            </button>
          )}
          <button
            className="btn-secondary"
            onClick={() => updateSettings({ themeMode: isDark ? 'light' : 'dark' })}
            type="button"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
