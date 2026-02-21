import {
  fontClassMap,
  formatRange,
  getDensityClasses,
  getTemplateContent,
  hexToRGBA,
  joinContactParts,
} from './shared'

const SectionTitle = ({ text, accent }) => (
  <h3
    className="border-b pb-1 text-[12px] font-bold tracking-[0.14em]"
    style={{ borderColor: hexToRGBA(accent, 0.35), color: accent }}
  >
    {text}
  </h3>
)

function EngineeringTemplate({ resume }) {
  const accent = resume.themeColor || '#0f766e'
  const fontClass = fontClassMap[resume.fontFamily] || 'font-sans'
  const density = getDensityClasses(resume.layout?.density)
  const content = getTemplateContent(resume)
  const showPhoto = resume.layout?.showPhoto !== false

  const contactLinePrimary = joinContactParts([
    content.personal.location,
    content.personal.phone,
    content.personal.email,
  ])
  const contactLineSecondary = joinContactParts([content.personal.linkedin, content.personal.github])

  return (
    <div className={`${fontClass} ${density.pagePadding} text-stone-900`}>
      <header className="border-b pb-4" style={{ borderColor: hexToRGBA(accent, 0.35) }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[30px] font-extrabold tracking-wide">{content.personal.fullName}</h1>
            {content.personal.role && <p className="mt-1 text-[14px] font-medium text-stone-700">{content.personal.role}</p>}
            {contactLinePrimary && <p className="mt-2 text-[11px] text-stone-600">{contactLinePrimary}</p>}
            {contactLineSecondary && <p className="text-[11px] text-stone-600">{contactLineSecondary}</p>}
          </div>
          {showPhoto && content.personal.photo && (
            <img
              alt={content.personal.fullName}
              className="h-16 w-16 shrink-0 rounded-xl border border-stone-200 object-cover"
              src={content.personal.photo}
            />
          )}
        </div>
      </header>

      <main className={`mt-4 ${density.sectionSpacing}`}>
        {content.personal.summary && (
          <section>
            <SectionTitle accent={accent} text="CAREER OBJECTIVE" />
            <p className="mt-2 text-[12px] leading-relaxed text-stone-700">{content.personal.summary}</p>
          </section>
        )}

        {content.education.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="EDUCATION" />
            <div className="mt-2 space-y-2.5">
              {content.education.map((item) => (
                <article key={item.id}>
                  <h4 className="text-[13px] font-semibold text-stone-900">{item.degree}</h4>
                  <p className="text-[12px] text-stone-700">{item.institution}</p>
                  <p className="text-[11px] text-stone-500">{formatRange(item.start, item.end)}</p>
                  {item.description && <p className="text-[12px] text-stone-700">{item.description}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {(content.skillGroups.length > 0 || content.skills.length > 0) && (
          <section>
            <SectionTitle accent={accent} text="TECHNICAL SKILLS" />
            <div className="mt-2 space-y-1.5">
              {content.skillGroups.length > 0
                ? content.skillGroups.map((group) => (
                    <p key={group.id} className="text-[12px] text-stone-700">
                      <span className="font-semibold text-stone-900">{group.title}:</span> {group.items}
                    </p>
                  ))
                : content.skills.map((skill) => (
                    <p key={skill.id} className="text-[12px] text-stone-700">
                      {skill.name}
                      {skill.level ? ` (${skill.level})` : ''}
                    </p>
                  ))}
            </div>
          </section>
        )}

        {content.projects.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="PROJECTS" />
            <div className="mt-2 space-y-3">
              {content.projects.map((project) => (
                <article key={project.id}>
                  <h4 className="text-[13px] font-semibold text-stone-900">{project.name}</h4>
                  {project.description && <p className="text-[12px] text-stone-700">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-[12px] text-stone-700">
                      <span className="font-semibold text-stone-900">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.contribution && (
                    <p className="text-[12px] text-stone-700">
                      <span className="font-semibold text-stone-900">Contribution:</span> {project.contribution}
                    </p>
                  )}
                  {project.achievement && (
                    <p className="text-[12px] text-stone-700">
                      <span className="font-semibold text-stone-900">Result:</span> {project.achievement}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {content.internships.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="INTERNSHIPS / TRAINING" />
            <div className="mt-2 space-y-2.5">
              {content.internships.map((item) => (
                <article key={item.id}>
                  <h4 className="text-[13px] font-semibold text-stone-900">
                    {[item.organization, item.title].filter(Boolean).join(' - ')}
                  </h4>
                  {item.duration && <p className="text-[11px] text-stone-500">{item.duration}</p>}
                  {item.description && <p className="text-[12px] text-stone-700">{item.description}</p>}
                  {item.achievements && <p className="text-[12px] text-stone-700">{item.achievements}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {content.certifications.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="CERTIFICATIONS" />
            <ul className="mt-2 space-y-1.5">
              {content.certifications.map((certificate) => (
                <li key={certificate.id} className="text-[12px] text-stone-700">
                  {certificate.name}
                  {certificate.issuer ? ` - ${certificate.issuer}` : ''}
                  {certificate.year ? ` (${certificate.year})` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.achievements.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="ACHIEVEMENTS" />
            <ul className="mt-2 space-y-1.5">
              {content.achievements.map((item) => (
                <li key={item.id} className="text-[12px] text-stone-700">
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  {item.details ? ` - ${item.details}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.extracurricular.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="EXTRACURRICULAR ACTIVITIES" />
            <ul className="mt-2 space-y-1.5">
              {content.extracurricular.map((item) => (
                <li key={item.id} className="text-[12px] text-stone-700">
                  <span className="font-semibold text-stone-900">{item.title}</span>
                  {item.details ? ` - ${item.details}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.personalDetails.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="PERSONAL DETAILS" />
            <ul className="mt-2 space-y-1.5">
              {content.personalDetails.map((item) => (
                <li key={item.id} className="text-[12px] text-stone-700">
                  <span className="font-semibold text-stone-900">{item.title}:</span> {item.details}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

export default EngineeringTemplate
