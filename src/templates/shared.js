export const sectionLabelMap = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
}

export const fontClassMap = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
}

const densityClassMap = {
  compact: {
    pagePadding: 'p-7',
    sectionSpacing: 'space-y-4',
    blockSpacing: 'space-y-2',
  },
  balanced: {
    pagePadding: 'p-8',
    sectionSpacing: 'space-y-5',
    blockSpacing: 'space-y-2.5',
  },
  spacious: {
    pagePadding: 'p-10',
    sectionSpacing: 'space-y-6',
    blockSpacing: 'space-y-3',
  },
}

const toText = (value) => (typeof value === 'string' ? value.trim() : '')

export const hasText = (value) => toText(value).length > 0

const cleanExperience = (item) => ({
  ...item,
  role: toText(item.role),
  company: toText(item.company),
  start: toText(item.start),
  end: toText(item.end),
  description: toText(item.description),
})

const cleanEducation = (item) => ({
  ...item,
  degree: toText(item.degree),
  institution: toText(item.institution),
  start: toText(item.start),
  end: toText(item.end),
  description: toText(item.description),
})

const cleanSkill = (item) => ({
  ...item,
  name: toText(item.name),
  level: toText(item.level),
})

const cleanSkillGroup = (item) => ({
  ...item,
  title: toText(item.title),
  items: toText(item.items),
})

const cleanProject = (item) => ({
  ...item,
  name: toText(item.name),
  link: toText(item.link),
  description: toText(item.description),
  technologies: toText(item.technologies),
  contribution: toText(item.contribution),
  achievement: toText(item.achievement),
})

const cleanInternship = (item) => ({
  ...item,
  title: toText(item.title),
  organization: toText(item.organization),
  duration: toText(item.duration),
  description: toText(item.description),
  achievements: toText(item.achievements),
})

const cleanCertification = (item) => ({
  ...item,
  name: toText(item.name),
  issuer: toText(item.issuer),
  year: toText(item.year),
})

const cleanSimpleRow = (item) => ({
  ...item,
  title: toText(item.title),
  details: toText(item.details),
})

const cleanResearch = (item) => ({
  ...item,
  title: toText(item.title),
  source: toText(item.source),
  year: toText(item.year),
  details: toText(item.details),
})

const hasExperienceContent = (item) =>
  hasText(item.role) || hasText(item.company) || hasText(item.description)

const hasEducationContent = (item) =>
  hasText(item.degree) || hasText(item.institution) || hasText(item.description)

const hasSkillContent = (item) => hasText(item.name)

const hasSkillGroupContent = (item) => hasText(item.title) || hasText(item.items)

const hasProjectContent = (item) =>
  hasText(item.name) ||
  hasText(item.description) ||
  hasText(item.link) ||
  hasText(item.technologies) ||
  hasText(item.contribution) ||
  hasText(item.achievement)

const hasInternshipContent = (item) =>
  hasText(item.title) || hasText(item.organization) || hasText(item.description)

const hasCertificationContent = (item) =>
  hasText(item.name) || hasText(item.issuer) || hasText(item.year)

const hasSimpleRowContent = (item) => hasText(item.title) || hasText(item.details)

const hasResearchContent = (item) =>
  hasText(item.title) || hasText(item.source) || hasText(item.details)

const sanitizeArray = (arrayValue, cleaner, validator) =>
  Array.isArray(arrayValue) ? arrayValue.map(cleaner).filter(validator) : []

const resolveSectionOrder = (resume) => {
  const fallback = Object.keys(sectionLabelMap)
  if (!Array.isArray(resume?.sectionOrder)) return fallback

  const valid = resume.sectionOrder.filter((key) => key in sectionLabelMap)
  fallback.forEach((key) => {
    if (!valid.includes(key)) valid.push(key)
  })
  return valid
}

export const getDensityClasses = (density) =>
  densityClassMap[density] || densityClassMap.balanced

export const formatSectionHeading = (label, headingStyle = 'uppercase') =>
  headingStyle === 'title' ? label : label.toUpperCase()

export const joinContactParts = (parts) => parts.filter(hasText).join(' | ')

export const getTemplateContent = (resume) => {
  const personal = {
    fullName: toText(resume?.personal?.fullName),
    role: toText(resume?.personal?.role),
    email: toText(resume?.personal?.email),
    phone: toText(resume?.personal?.phone),
    location: toText(resume?.personal?.location),
    website: toText(resume?.personal?.website),
    linkedin: toText(resume?.personal?.linkedin),
    github: toText(resume?.personal?.github),
    medicalRegistrationNumber: toText(resume?.personal?.medicalRegistrationNumber),
    summary: toText(resume?.personal?.summary),
    photo: toText(resume?.personal?.photo),
  }

  const experience = sanitizeArray(resume?.experience, cleanExperience, hasExperienceContent)
  const education = sanitizeArray(resume?.education, cleanEducation, hasEducationContent)
  const skills = sanitizeArray(resume?.skills, cleanSkill, hasSkillContent)
  const skillGroups = sanitizeArray(resume?.skillGroups, cleanSkillGroup, hasSkillGroupContent)
  const projects = sanitizeArray(resume?.projects, cleanProject, hasProjectContent)
  const internships = sanitizeArray(resume?.internships, cleanInternship, hasInternshipContent)
  const certifications = sanitizeArray(
    resume?.certifications,
    cleanCertification,
    hasCertificationContent,
  )
  const achievements = sanitizeArray(resume?.achievements, cleanSimpleRow, hasSimpleRowContent)
  const extracurricular = sanitizeArray(
    resume?.extracurricular,
    cleanSimpleRow,
    hasSimpleRowContent,
  )
  const memberships = sanitizeArray(resume?.memberships, cleanSimpleRow, hasSimpleRowContent)
  const research = sanitizeArray(resume?.research, cleanResearch, hasResearchContent)
  const personalDetails = sanitizeArray(
    resume?.personalDetails,
    cleanSimpleRow,
    hasSimpleRowContent,
  )

  const sectionHasContent = {
    summary: hasText(personal.summary),
    experience: experience.length > 0,
    education: education.length > 0,
    skills: skills.length > 0 || skillGroups.length > 0,
    projects: projects.length > 0,
    certifications: certifications.length > 0,
  }

  const visibleSections = resolveSectionOrder(resume).filter(
    (key) => resume?.sectionVisibility?.[key] !== false && sectionHasContent[key],
  )

  return {
    personal,
    experience,
    education,
    skills,
    skillGroups,
    projects,
    internships,
    certifications,
    achievements,
    extracurricular,
    memberships,
    research,
    personalDetails,
    visibleSections,
  }
}

export const formatRange = (start, end) => {
  if (!start && !end) return ''
  if (!start) return end
  if (!end) return start
  return `${start} - ${end}`
}

export const hexToRGBA = (hex, alpha) => {
  const safeHex = hex?.replace('#', '')
  if (!safeHex || ![3, 6].includes(safeHex.length)) {
    return `rgba(15, 118, 110, ${alpha})`
  }

  const formatted =
    safeHex.length === 3
      ? safeHex
          .split('')
          .map((char) => char + char)
          .join('')
      : safeHex

  const r = Number.parseInt(formatted.slice(0, 2), 16)
  const g = Number.parseInt(formatted.slice(2, 4), 16)
  const b = Number.parseInt(formatted.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

