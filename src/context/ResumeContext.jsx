import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_SETTINGS,
  SECTION_ITEMS,
  createStarterResume,
} from './resumeConfig'
import { ResumeContext } from './resumeContextStore'
import {
  loadActiveResumeId,
  loadResumes,
  loadSettings,
  saveActiveResumeId,
  saveResumes,
  saveSettings,
} from '../utils/localStorage'

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const normalizeSectionOrder = (order) => {
  const validOrder = Array.isArray(order)
    ? order.filter((key) => SECTION_ITEMS.some((section) => section.key === key))
    : []

  SECTION_ITEMS.forEach((section) => {
    if (!validOrder.includes(section.key)) {
      validOrder.push(section.key)
    }
  })

  return validOrder
}

const normalizeArray = (arrayValue, fallbackValue) =>
  Array.isArray(arrayValue) && arrayValue.length > 0 ? arrayValue : fallbackValue

const normalizeResume = (resume, settings) => {
  const starter = createStarterResume(resume?.title || 'Untitled Resume', settings)

  return {
    ...starter,
    ...resume,
    template: resume?.template || starter.template,
    themeColor: resume?.themeColor || starter.themeColor,
    fontFamily: resume?.fontFamily || starter.fontFamily,
    layout: {
      ...starter.layout,
      ...(resume?.layout || {}),
    },
    personal: { ...starter.personal, ...(resume?.personal || {}) },
    experience: normalizeArray(resume?.experience, starter.experience),
    education: normalizeArray(resume?.education, starter.education),
    skills: normalizeArray(resume?.skills, starter.skills),
    skillGroups: normalizeArray(resume?.skillGroups, starter.skillGroups),
    projects: normalizeArray(resume?.projects, starter.projects),
    internships: normalizeArray(resume?.internships, starter.internships),
    certifications: normalizeArray(resume?.certifications, starter.certifications),
    achievements: normalizeArray(resume?.achievements, starter.achievements),
    extracurricular: normalizeArray(resume?.extracurricular, starter.extracurricular),
    memberships: normalizeArray(resume?.memberships, starter.memberships),
    research: normalizeArray(resume?.research, starter.research),
    personalDetails: normalizeArray(resume?.personalDetails, starter.personalDetails),
    sectionVisibility: {
      ...starter.sectionVisibility,
      ...(resume?.sectionVisibility || {}),
    },
    sectionOrder: normalizeSectionOrder(resume?.sectionOrder),
    updatedAt: resume?.updatedAt || starter.updatedAt,
    createdAt: resume?.createdAt || starter.createdAt,
  }
}

export function ResumeProvider({ children }) {
  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...(loadSettings() || {}),
  }))

  const [resumes, setResumes] = useState(() => {
    const loadedSettings = {
      ...DEFAULT_SETTINGS,
      ...(loadSettings() || {}),
    }
    const storedResumes = loadResumes()

    if (!Array.isArray(storedResumes) || storedResumes.length === 0) {
      return [createStarterResume('Career Master Resume', loadedSettings)]
    }

    return storedResumes.map((resume) => normalizeResume(resume, loadedSettings))
  })

  const [activeResumeId, setActiveResumeId] = useState(() => {
    const storedResumes = loadResumes()
    const loadedResumeId = loadActiveResumeId()
    const loadedIds = Array.isArray(storedResumes) ? storedResumes.map((resume) => resume.id) : []

    if (loadedResumeId && loadedIds.includes(loadedResumeId)) {
      return loadedResumeId
    }

    return loadedIds[0] || null
  })

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.id === activeResumeId) || resumes[0] || null,
    [resumes, activeResumeId],
  )

  useEffect(() => {
    saveResumes(resumes)
  }, [resumes])

  useEffect(() => {
    saveActiveResumeId(activeResume?.id || null)
  }, [activeResume])

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    const mode = settings.themeMode === 'dark' ? 'dark' : 'light'
    document.body.classList.toggle('theme-dark', mode === 'dark')
    document.body.classList.toggle('theme-light', mode === 'light')
  }, [settings.themeMode])

  const updateResume = (resumeId, updater) => {
    if (!resumeId) return

    setResumes((prev) =>
      prev.map((resume) => {
        if (resume.id !== resumeId) return resume

        const nextResume =
          typeof updater === 'function'
            ? updater(resume)
            : {
                ...resume,
                ...updater,
              }

        return {
          ...normalizeResume(nextResume, settings),
          updatedAt: new Date().toISOString(),
        }
      }),
    )
  }

  const updateActiveResume = (updater) => {
    updateResume(activeResume?.id, updater)
  }

  const selectResume = (resumeId) => {
    setActiveResumeId(resumeId)
  }

  const createResume = (title = 'Untitled Resume') => {
    const newResume = createStarterResume(title, settings)
    setResumes((prev) => [newResume, ...prev])
    setActiveResumeId(newResume.id)
    return newResume.id
  }

  const duplicateResume = (resumeId = activeResume?.id) => {
    const source = resumes.find((resume) => resume.id === resumeId)
    if (!source) return null

    const duplicated = normalizeResume(source, settings)
    duplicated.id = createId()
    duplicated.title = `${source.title} Copy`
    duplicated.createdAt = new Date().toISOString()
    duplicated.updatedAt = duplicated.createdAt

    setResumes((prev) => [duplicated, ...prev])
    setActiveResumeId(duplicated.id)
    return duplicated.id
  }

  const deleteResume = (resumeId = activeResume?.id) => {
    setResumes((prev) => {
      const filtered = prev.filter((resume) => resume.id !== resumeId)

      if (filtered.length === 0) {
        const fallback = createStarterResume('My First Resume', settings)
        setActiveResumeId(fallback.id)
        return [fallback]
      }

      if (resumeId === activeResume?.id) {
        setActiveResumeId(filtered[0].id)
      }

      return filtered
    })
  }

  const updateAppSettings = (updater) => {
    setSettings((prev) => {
      const next =
        typeof updater === 'function'
          ? updater(prev)
          : {
              ...prev,
              ...updater,
            }

      return {
        ...DEFAULT_SETTINGS,
        ...next,
      }
    })
  }

  const exportBackup = () =>
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        settings,
        resumes,
      },
      null,
      2,
    )

  const importBackup = (backupPayload) => {
    if (!backupPayload || !Array.isArray(backupPayload.resumes)) return false

    const incomingSettings = {
      ...DEFAULT_SETTINGS,
      ...(backupPayload.settings || {}),
    }
    const incomingResumes = backupPayload.resumes
      .map((resume) => normalizeResume(resume, incomingSettings))
      .filter(Boolean)

    if (incomingResumes.length === 0) return false

    setSettings(incomingSettings)
    setResumes(incomingResumes)
    setActiveResumeId(incomingResumes[0].id)
    return true
  }

  const value = {
    resumes,
    activeResume,
    activeResumeId,
    settings,
    createResume,
    updateResume,
    updateActiveResume,
    selectResume,
    duplicateResume,
    deleteResume,
    updateSettings: updateAppSettings,
    exportBackup,
    importBackup,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}
