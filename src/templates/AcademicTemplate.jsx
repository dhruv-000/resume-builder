import {
  fontClassMap,
  formatRange,
  formatSectionHeading,
  getDensityClasses,
  getTemplateContent,
  hexToRGBA,
  joinContactParts,
  sectionLabelMap,
} from './shared'

function AcademicTemplate({ resume }) {
  const accent = resume.themeColor || '#4338ca'
  const fontClass = resume.fontFamily === 'mono' ? 'font-serif' : fontClassMap[resume.fontFamily] || 'font-serif'
  const density = getDensityClasses(resume.layout?.density)
  const content = getTemplateContent(resume)
  const headingStyle = resume.layout?.headingStyle || 'uppercase'

  const renderSection = (key) => {
    if (key === 'summary') {
      return <p className="text-[12px] leading-6 text-stone-700">{content.personal.summary}</p>
    }

    if (key === 'experience') {
      return (
        <div className={density.blockSpacing}>
          {content.experience.map((item) => (
            <article key={item.id}>
              <h4 className="text-[13px] font-semibold text-stone-900">
                {[item.role, item.company].filter(Boolean).join(', ')}
              </h4>
              {formatRange(item.start, item.end) && (
                <p className="text-[11px] italic text-stone-500">{formatRange(item.start, item.end)}</p>
              )}
              {item.description && <p className="mt-1 text-[12px] leading-6 text-stone-700">{item.description}</p>}
            </article>
          ))}
        </div>
      )
    }

    if (key === 'education') {
      return (
        <div className={density.blockSpacing}>
          {content.education.map((item) => (
            <article key={item.id}>
              <h4 className="text-[13px] font-semibold text-stone-900">{item.degree}</h4>
              {item.institution && <p className="text-[12px] text-stone-700">{item.institution}</p>}
              {formatRange(item.start, item.end) && (
                <p className="text-[11px] italic text-stone-500">{formatRange(item.start, item.end)}</p>
              )}
              {item.description && <p className="text-[12px] leading-6 text-stone-700">{item.description}</p>}
            </article>
          ))}
        </div>
      )
    }

    if (key === 'skills') {
      return (
        <p className="text-[12px] leading-6 text-stone-700">
          {content.skills
            .map((skill) => `${skill.name}${skill.level ? ` (${skill.level})` : ''}`)
            .join(' | ')}
        </p>
      )
    }

    if (key === 'projects') {
      return (
        <div className={density.blockSpacing}>
          {content.projects.map((project) => (
            <article key={project.id}>
              <h4 className="text-[13px] font-semibold text-stone-900">{project.name}</h4>
              {project.link && <p className="break-all text-[11px] text-stone-500">{project.link}</p>}
              {project.description && <p className="text-[12px] leading-6 text-stone-700">{project.description}</p>}
            </article>
          ))}
        </div>
      )
    }

    if (key === 'certifications') {
      return (
        <ul className="list-disc pl-4 text-[12px] leading-6 text-stone-700">
          {content.certifications.map((certificate) => (
            <li key={certificate.id}>
              {certificate.name}
              {certificate.issuer ? ` (${certificate.issuer})` : ''}
              {certificate.year ? `, ${certificate.year}` : ''}
            </li>
          ))}
        </ul>
      )
    }

    return null
  }

  const contactLine = joinContactParts([
    content.personal.email,
    content.personal.phone,
    content.personal.location,
    content.personal.website,
  ])

  return (
    <div className={`${fontClass} ${density.pagePadding} text-stone-900`}>
      <header className="pb-4 text-center">
        <h1 className="text-[30px] font-bold tracking-wide">{content.personal.fullName}</h1>
        {content.personal.role && <p className="mt-1 text-[15px] italic text-stone-700">{content.personal.role}</p>}
        {contactLine && <p className="mt-2 text-[11px] text-stone-600">{contactLine}</p>}
      </header>

      <div
        className="mb-4 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${hexToRGBA(accent, 0.6)}, transparent)`,
        }}
      />

      <main className={density.sectionSpacing}>
        {content.visibleSections.map((key) => (
          <section key={key}>
            <h3
              className="mb-1.5 border-b pb-1 text-[12px] font-semibold tracking-[0.14em]"
              style={{ borderColor: hexToRGBA(accent, 0.3), color: accent }}
            >
              {formatSectionHeading(sectionLabelMap[key], headingStyle)}
            </h3>
            {renderSection(key)}
          </section>
        ))}
      </main>
    </div>
  )
}

export default AcademicTemplate

