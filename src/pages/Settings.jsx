import { useState } from 'react'
import MobileNav from '../components/MobileNav'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import {
  DENSITY_OPTIONS,
  FONT_OPTIONS,
  HEADING_STYLE_OPTIONS,
  TEMPLATE_OPTIONS,
} from '../context/resumeConfig'
import { useResume } from '../context/useResume'
import { clearAllLocalData } from '../utils/localStorage'

function Settings() {
  const { settings, updateSettings, exportBackup, importBackup, resumes } = useResume()
  const [status, setStatus] = useState('')

  const downloadBackup = () => {
    const backupText = exportBackup()
    const blob = new Blob([backupText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume-builder-backup.json'
    link.click()
    URL.revokeObjectURL(url)
    setStatus('Backup exported successfully.')
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const ok = importBackup(payload)
      setStatus(ok ? 'Backup imported.' : 'Invalid backup file.')
    } catch {
      setStatus('Could not read backup file.')
    } finally {
      event.target.value = ''
    }
  }

  const resetLocalData = () => {
    const confirmed = window.confirm(
      'This will clear all local resumes and settings from this browser. Continue?',
    )
    if (!confirmed) return

    clearAllLocalData()
    window.location.reload()
  }

  return (
    <main className="app-chrome mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 px-3 pb-24 pt-3 sm:px-5 lg:pb-6">
      <Sidebar />

      <section className="w-full space-y-4">
        <Topbar
          onBackToDashboard
          subtitle="Frontend-only preferences and backup controls."
          title="Settings"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="panel">
            <h2 className="font-serif text-xl text-stone-900">Default Resume Preferences</h2>
            <p className="mt-1 text-sm text-stone-600">
              These defaults are applied when you create a new resume.
            </p>
            <div className="mt-4 space-y-3">
              <label>
                <span className="label">Default Template</span>
                <select
                  className="input"
                  onChange={(event) => updateSettings({ defaultTemplate: event.target.value })}
                  value={settings.defaultTemplate}
                >
                  {TEMPLATE_OPTIONS.map((template) => (
                    <option key={template.value} value={template.value}>
                      {template.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="label">Default Font</span>
                <select
                  className="input"
                  onChange={(event) => updateSettings({ defaultFontFamily: event.target.value })}
                  value={settings.defaultFontFamily}
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="label">Default Density</span>
                  <select
                    className="input"
                    onChange={(event) => updateSettings({ defaultDensity: event.target.value })}
                    value={settings.defaultDensity}
                  >
                    {DENSITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="label">Default Heading Style</span>
                  <select
                    className="input"
                    onChange={(event) => updateSettings({ defaultHeadingStyle: event.target.value })}
                    value={settings.defaultHeadingStyle}
                  >
                    {HEADING_STYLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span className="label">Default Theme Color</span>
                <input
                  className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white p-1"
                  onChange={(event) => updateSettings({ defaultThemeColor: event.target.value })}
                  type="color"
                  value={settings.defaultThemeColor}
                />
              </label>

              <div>
                <span className="label">Website Theme</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={settings.themeMode === 'light' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => updateSettings({ themeMode: 'light' })}
                    type="button"
                  >
                    Light
                  </button>
                  <button
                    className={settings.themeMode === 'dark' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => updateSettings({ themeMode: 'dark' })}
                    type="button"
                  >
                    Dark
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-700">
                <input
                  checked={settings.defaultShowPhoto}
                  onChange={(event) => updateSettings({ defaultShowPhoto: event.target.checked })}
                  type="checkbox"
                />
                Show profile photo by default on new resumes
              </label>
            </div>
          </section>

          <section className="panel">
            <h2 className="font-serif text-xl text-stone-900">Backup and Restore</h2>
            <p className="mt-1 text-sm text-stone-600">
              Download or upload local data as a JSON file.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-primary" onClick={downloadBackup} type="button">
                Export Backup
              </button>
              <label className="btn-secondary cursor-pointer">
                Import Backup
                <input className="hidden" onChange={handleImport} type="file" />
              </label>
              <button className="btn-danger" onClick={resetLocalData} type="button">
                Reset Local Data
              </button>
            </div>
            {status && <p className="mt-3 text-sm text-teal-800">{status}</p>}
            <p className="mt-4 text-sm text-stone-600">
              Local resumes stored in this browser: <strong>{resumes.length}</strong>
            </p>
          </section>
        </div>

        <MobileNav />
      </section>
    </main>
  )
}

export default Settings
