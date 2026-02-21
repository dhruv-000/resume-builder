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

function CreativeTemplate({ resume }) {
  const accent = resume.themeColor || '#be123c'
  const secondary = '#f59e0b'
  const fontClass = fontClassMap[resume.fontFamily] || 'font-sans'
  const density = getDensityClasses(resume.layout?.density)
  const content = getTemplateContent(resume)
  const headingStyle = resume.layout?.headingStyle || 'uppercase'
  const showPhoto = resume.layout?.showPhoto !== false

  const renderSection = (key) => {
    if (key === 'summary') {
      return <p className="text-[12px] leading-relaxed text-stone-700">{content.personal.summary}</p>
    }

    if (key === 'experience') {
      return (
        <div className={density.blockSpacing}>
          {content.experience.map((item) => (
            <article key={item.id} className="rounded-xl border border-stone-200 bg-white/70 p-3 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900">{item.role}</h4>
                  {item.company && <p className="text-[12px] text-stone-600">{item.company}</p>}
                </div>
                {formatRange(item.start, item.end) && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      color: accent,
                      backgroundColor: hexToRGBA(accent, 0.12),
                    }}
                  >
                    {formatRange(item.start, item.end)}
                  </span>
                )}
              </div>
              {item.description && <p className="mt-1 text-[12px] leading-relaxed text-stone-700">{item.description}</p>}
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
              <p className="text-[12px] text-stone-700">
                {[item.institution, formatRange(item.start, item.end)].filter(Boolean).join(' | ')}
              </p>
            </article>
          ))}
        </div>
      )
    }

    if (key === 'skills') {
      return (
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white"
              style={{
                background: `linear-gradient(120deg, ${accent}, ${secondary})`,
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      )
    }

    if (key === 'projects') {
      return (
        <div className="grid grid-cols-1 gap-2">
          {content.projects.map((project) => (
            <article key={project.id} className="rounded-xl border border-stone-200 bg-white p-3">
              <h4 className="text-[13px] font-semibold text-stone-900">{project.name}</h4>
              {project.description && (
                <p className="mt-1 text-[12px] leading-relaxed text-stone-700">{project.description}</p>
              )}
              {project.link && (
                <p className="mt-1 break-all text-[11px] font-semibold" style={{ color: accent }}>
                  {project.link}
                </p>
              )}
            </article>
          ))}
        </div>
      )
    }

    if (key === 'certifications') {
      return (
        <div className={density.blockSpacing}>
          {content.certifications.map((certificate) => (
            <div key={certificate.id} className="text-[12px] text-stone-700">
              <strong className="text-stone-900">{certificate.name}</strong>
              {certificate.issuer ? ` | ${certificate.issuer}` : ''}
              {certificate.year ? ` (${certificate.year})` : ''}
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  const contactLine = joinContactParts([
    content.personal.email,
    content.personal.phone,
    content.personal.website,
    content.personal.location,
  ])

  return (
    <div className={`${fontClass} ${density.pagePadding}`}>
      <header
        className="rounded-3xl p-5 text-white"
        style={{
          background: `linear-gradient(130deg, ${accent}, ${secondary})`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
              Creative Resume
            </p>
            <h1 className="mt-1 text-[30px] font-extrabold">{content.personal.fullName}</h1>
            {content.personal.role && <p className="text-[15px] text-white/90">{content.personal.role}</p>}
          </div>
          {showPhoto && content.personal.photo && (
            <img
              alt={content.personal.fullName}
              className="h-16 w-16 shrink-0 rounded-xl border-2 border-white/60 object-cover"
              src={content.personal.photo}
            />
          )}
        </div>
        {contactLine && <p className="mt-2 text-[11px] text-white/90">{contactLine}</p>}
      </header>

      <main className={`mt-5 ${density.sectionSpacing}`}>
        {content.visibleSections.map((key) => (
          <section key={key}>
            <h3
              className="mb-2 inline-flex rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white"
              style={{
                backgroundColor: accent,
              }}
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

export default CreativeTemplate
