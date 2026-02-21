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

function MedicalTemplate({ resume }) {
  const accent = resume.themeColor || '#155e75'
  const fontClass = fontClassMap[resume.fontFamily] || 'font-serif'
  const density = getDensityClasses(resume.layout?.density)
  const content = getTemplateContent(resume)
  const showPhoto = resume.layout?.showPhoto !== false

  const contactLine = joinContactParts([
    content.personal.location,
    content.personal.phone,
    content.personal.email,
    content.personal.linkedin,
  ])

  return (
    <div className={`${fontClass} ${density.pagePadding} text-stone-900`}>
      <header className="border-b pb-4" style={{ borderColor: hexToRGBA(accent, 0.35) }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-wide">{content.personal.fullName}</h1>
            {content.personal.role && <p className="mt-1 text-[14px] text-stone-700">{content.personal.role}</p>}
            {contactLine && <p className="mt-2 text-[11px] text-stone-600">{contactLine}</p>}
            {content.personal.medicalRegistrationNumber && (
              <p className="text-[11px] font-semibold text-stone-700">
                Medical Registration Number: {content.personal.medicalRegistrationNumber}
              </p>
            )}
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
            <SectionTitle accent={accent} text="PROFESSIONAL SUMMARY" />
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
                  {formatRange(item.start, item.end) && (
                    <p className="text-[11px] text-stone-500">{formatRange(item.start, item.end)}</p>
                  )}
                  {item.description && <p className="text-[12px] text-stone-700">{item.description}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {content.experience.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="CLINICAL EXPERIENCE" />
            <div className="mt-2 space-y-2.5">
              {content.experience.map((item) => (
                <article key={item.id}>
                  <h4 className="text-[13px] font-semibold text-stone-900">
                    {[item.company, item.role].filter(Boolean).join(' - ')}
                  </h4>
                  {formatRange(item.start, item.end) && (
                    <p className="text-[11px] text-stone-500">{formatRange(item.start, item.end)}</p>
                  )}
                  {item.description && <p className="text-[12px] text-stone-700">{item.description}</p>}
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

        {(content.skillGroups.length > 0 || content.skills.length > 0) && (
          <section>
            <SectionTitle accent={accent} text="SKILLS & COMPETENCIES" />
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

        {(content.certifications.length > 0 || content.personal.medicalRegistrationNumber) && (
          <section>
            <SectionTitle accent={accent} text="CERTIFICATIONS & LICENSE" />
            <div className="mt-2 space-y-1.5">
              {content.personal.medicalRegistrationNumber && (
                <p className="text-[12px] text-stone-700">
                  State Medical Council Registration - {content.personal.medicalRegistrationNumber}
                </p>
              )}
              {content.certifications.map((certificate) => (
                <p key={certificate.id} className="text-[12px] text-stone-700">
                  {certificate.name}
                  {certificate.issuer ? ` - ${certificate.issuer}` : ''}
                  {certificate.year ? ` (${certificate.year})` : ''}
                </p>
              ))}
            </div>
          </section>
        )}

        {content.research.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="RESEARCH & PUBLICATIONS" />
            <div className="mt-2 space-y-2">
              {content.research.map((item) => (
                <article key={item.id}>
                  <p className="text-[12px] font-semibold text-stone-900">
                    {item.title}
                    {item.source ? ` - ${item.source}` : ''}
                    {item.year ? ` (${item.year})` : ''}
                  </p>
                  {item.details && <p className="text-[12px] text-stone-700">{item.details}</p>}
                </article>
              ))}
            </div>
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

        {content.memberships.length > 0 && (
          <section>
            <SectionTitle accent={accent} text="PROFESSIONAL MEMBERSHIPS" />
            <ul className="mt-2 space-y-1.5">
              {content.memberships.map((item) => (
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

export default MedicalTemplate
