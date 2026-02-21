const RESUME_KEY = 'resume_builder_resumes_v1'
const ACTIVE_RESUME_KEY = 'resume_builder_active_resume_v1'
const SETTINGS_KEY = 'resume_builder_settings_v1'

const parseJSON = (rawValue, fallbackValue) => {
  if (!rawValue) return fallbackValue

  try {
    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

export const loadResumes = () =>
  parseJSON(window.localStorage.getItem(RESUME_KEY), [])

export const saveResumes = (resumes) => {
  window.localStorage.setItem(RESUME_KEY, JSON.stringify(resumes))
}

export const loadActiveResumeId = () =>
  window.localStorage.getItem(ACTIVE_RESUME_KEY)

export const saveActiveResumeId = (resumeId) => {
  if (!resumeId) {
    window.localStorage.removeItem(ACTIVE_RESUME_KEY)
    return
  }

  window.localStorage.setItem(ACTIVE_RESUME_KEY, resumeId)
}

export const loadSettings = () =>
  parseJSON(window.localStorage.getItem(SETTINGS_KEY), null)

export const saveSettings = (settings) => {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export const clearAllLocalData = () => {
  window.localStorage.removeItem(RESUME_KEY)
  window.localStorage.removeItem(ACTIVE_RESUME_KEY)
  window.localStorage.removeItem(SETTINGS_KEY)
}

