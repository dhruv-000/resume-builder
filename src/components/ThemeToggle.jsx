import { useResume } from '../context/useResume'

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="currentColor" r="4" />
      <path
        d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a9.1 9.1 0 1 0 11.2 11.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ThemeToggle({ className = '', showLabel = true }) {
  const { settings, updateSettings } = useResume()
  const isDark = settings.themeMode === 'dark'

  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`theme-toggle ${className}`.trim()}
      onClick={() => updateSettings({ themeMode: isDark ? 'light' : 'dark' })}
      type="button"
    >
      <span className={`theme-toggle__glyph ${!isDark ? 'is-active' : ''}`}>
        <SunIcon />
      </span>
      <span className={`theme-toggle__glyph ${isDark ? 'is-active' : ''}`}>
        <MoonIcon />
      </span>
      {showLabel && (
        <span className="theme-toggle__text">{isDark ? 'Dark mode' : 'Light mode'}</span>
      )}
    </button>
  )
}

export default ThemeToggle
