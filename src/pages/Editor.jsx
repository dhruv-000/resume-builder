import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomizationPanel from '../components/CustomizationPanel'
import PhotoUploader from '../components/PhotoUploader'
import ResumePreview from '../components/ResumePreview'
import SectionManager from '../components/SectionManager'
import Sidebar from '../components/Sidebar'
import TemplateGallery from '../components/TemplateGallery'
import Topbar from '../components/Topbar'
import MobileNav from '../components/MobileNav'
import {
  createTemplateProfile,
  getTemplateTitle,
  SECTION_ITEMS,
  createAchievementItem,
  createCertificationItem,
  createEducationItem,
  createExtracurricularItem,
  createExperienceItem,
  createInternshipItem,
  createMembershipItem,
  createPersonalDetailItem,
  createProjectItem,
  createResearchItem,
  createSkillGroupItem,
  createSkillItem,
} from '../context/resumeConfig'
import { useResume } from '../context/useResume'
import { exportPDF } from '../utils/exportPDF'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

function Editor() {
  const navigate = useNavigate()
  const {
    activeResume,
    createResume,
    duplicateResume,
    deleteResume,
    updateActiveResume,
    selectResume,
  } = useResume()
  const [isExporting, setIsExporting] = useState(false)
  const [mobilePane, setMobilePane] = useState('editor')

  if (!activeResume) {
    return (
      <main className="app-chrome mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4">
        <div className="panel text-center">
          <h1 className="font-serif text-3xl text-stone-900">No Active Resume</h1>
          <p className="mt-2 text-stone-600">Create a resume first to start editing.</p>
          <button
            className="btn-primary mt-4"
            onClick={() => {
              const newResumeId = createResume('New Resume')
              selectResume(newResumeId)
              navigate('/editor')
            }}
            type="button"
          >
            Create Resume
          </button>
        </div>
      </main>
    )
  }

  const updatePersonalField = (field, value) => {
    updateActiveResume((resume) => ({
      ...resume,
      personal: {
        ...resume.personal,
        [field]: value,
      },
    }))
  }

  const updateCollectionItem = (section, itemId, updates) => {
    updateActiveResume((resume) => ({
      ...resume,
      [section]: resume[section].map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    }))
  }

  const addCollectionItem = (section, createItem) => {
    updateActiveResume((resume) => ({
      ...resume,
      [section]: [...resume[section], createItem()],
    }))
  }

  const removeCollectionItem = (section, itemId, createFallbackItem) => {
    updateActiveResume((resume) => {
      const filtered = resume[section].filter((item) => item.id !== itemId)

      return {
        ...resume,
        [section]: filtered.length > 0 ? filtered : [createFallbackItem()],
      }
    })
  }

  const moveSection = (sectionKey, direction) => {
    updateActiveResume((resume) => {
      const order = [...resume.sectionOrder]
      const index = order.indexOf(sectionKey)
      const targetIndex = direction === 'up' ? index - 1 : index + 1

      if (index < 0 || targetIndex < 0 || targetIndex >= order.length) {
        return resume
      }

      ;[order[index], order[targetIndex]] = [order[targetIndex], order[index]]

      return {
        ...resume,
        sectionOrder: order,
      }
    })
  }

  const toggleSection = (sectionKey, checked) => {
    updateActiveResume((resume) => ({
      ...resume,
      sectionVisibility: {
        ...resume.sectionVisibility,
        [sectionKey]: checked,
      },
    }))
  }

  const handleExportPDF = async () => {
    const previewNode = document.getElementById('resume-preview-document')
    if (!previewNode) return

    setIsExporting(true)
    try {
      const fileName = `${slugify(activeResume.personal.fullName || activeResume.title || 'resume')}.pdf`
      await exportPDF(previewNode, fileName)
    } finally {
      setIsExporting(false)
    }
  }

  const applyProfessionProfile = (templateValue) => {
    const profile = createTemplateProfile(templateValue)
    updateActiveResume((resume) => ({
      ...resume,
      ...profile,
      title: resume.title?.trim() ? resume.title : getTemplateTitle(templateValue),
    }))
  }

  return (
    <main className="app-chrome mx-auto flex min-h-screen w-full max-w-[1800px] gap-4 px-3 pb-24 pt-3 sm:px-5 lg:pb-6">
      <Sidebar />

      <section className="w-full space-y-4">
        <Topbar
          onBackToDashboard
          onCreate={() => {
            const resumeId = createResume('New Resume')
            selectResume(resumeId)
          }}
          onDelete={() => deleteResume(activeResume.id)}
          onDuplicate={() => duplicateResume(activeResume.id)}
          onExport={handleExportPDF}
          subtitle="Edit resume content and preview changes in real time."
          title={activeResume.title}
        />

        <div className="panel flex items-center gap-2 xl:hidden">
          <button
            className={mobilePane === 'editor' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}
            onClick={() => setMobilePane('editor')}
            type="button"
          >
            Editor
          </button>
          <button
            className={mobilePane === 'preview' ? 'btn-primary flex-1' : 'btn-secondary flex-1'}
            onClick={() => setMobilePane('preview')}
            type="button"
          >
            Preview
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(420px,560px)_1fr]">
          <section
            className={`space-y-4 pr-1 xl:max-h-[calc(100vh-150px)] xl:overflow-y-auto ${
              mobilePane === 'preview' ? 'hidden xl:block' : ''
            }`}
          >
            <div className="panel">
              <h3 className="font-serif text-lg text-stone-900">Resume Editor</h3>
              <p className="mt-1 text-sm text-stone-600">
                Edit content blocks and watch the preview update instantly.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="label">Resume Title</span>
                  <input
                    className="input"
                    onChange={(event) =>
                      updateActiveResume({ title: event.target.value || 'Untitled Resume' })
                    }
                    placeholder="My Resume"
                    value={activeResume.title}
                  />
                </label>
                <label>
                  <span className="label">Role Headline</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('role', event.target.value)}
                    placeholder="Senior Software Engineer"
                    value={activeResume.personal.role}
                  />
                </label>
              </div>
            </div>

            <TemplateGallery
              onApplyProfile={applyProfessionProfile}
              onSelect={(templateValue) => updateActiveResume({ template: templateValue })}
              selected={activeResume.template}
            />

            <CustomizationPanel
              fontFamily={activeResume.fontFamily}
              layout={activeResume.layout}
              onFontFamilyChange={(fontFamily) => updateActiveResume({ fontFamily })}
              onLayoutChange={(layoutUpdates) =>
                updateActiveResume((resume) => ({
                  ...resume,
                  layout: {
                    ...resume.layout,
                    ...layoutUpdates,
                  },
                }))
              }
              onThemeColorChange={(themeColor) => updateActiveResume({ themeColor })}
              themeColor={activeResume.themeColor}
            />

            <div className="panel">
              <h3 className="font-serif text-lg text-stone-900">Personal Details</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="label">Full Name</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('fullName', event.target.value)}
                    value={activeResume.personal.fullName}
                  />
                </label>
                <label>
                  <span className="label">Email</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('email', event.target.value)}
                    value={activeResume.personal.email}
                  />
                </label>
                <label>
                  <span className="label">Phone</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('phone', event.target.value)}
                    value={activeResume.personal.phone}
                  />
                </label>
                <label>
                  <span className="label">Location</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('location', event.target.value)}
                    value={activeResume.personal.location}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="label">Website</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('website', event.target.value)}
                    value={activeResume.personal.website}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="label">LinkedIn</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('linkedin', event.target.value)}
                    value={activeResume.personal.linkedin || ''}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="label">GitHub / Portfolio</span>
                  <input
                    className="input"
                    onChange={(event) => updatePersonalField('github', event.target.value)}
                    value={activeResume.personal.github || ''}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="label">Medical Registration Number (Doctor)</span>
                  <input
                    className="input"
                    onChange={(event) =>
                      updatePersonalField('medicalRegistrationNumber', event.target.value)
                    }
                    value={activeResume.personal.medicalRegistrationNumber || ''}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="label">Professional Summary</span>
                  <textarea
                    className="input min-h-24 resize-y"
                    onChange={(event) => updatePersonalField('summary', event.target.value)}
                    value={activeResume.personal.summary}
                  />
                </label>
              </div>
              <div className="mt-4">
                <PhotoUploader
                  onChange={(photo) => updatePersonalField('photo', photo)}
                  value={activeResume.personal.photo}
                />
              </div>
            </div>

            <SectionManager
              items={SECTION_ITEMS}
              onMove={moveSection}
              onToggle={toggleSection}
              order={activeResume.sectionOrder}
              visibility={activeResume.sectionVisibility}
            />

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Experience</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('experience', createExperienceItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.experience.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Role</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('experience', item.id, {
                              role: event.target.value,
                            })
                          }
                          value={item.role}
                        />
                      </label>
                      <label>
                        <span className="label">Company</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('experience', item.id, {
                              company: event.target.value,
                            })
                          }
                          value={item.company}
                        />
                      </label>
                      <label>
                        <span className="label">Start</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('experience', item.id, {
                              start: event.target.value,
                            })
                          }
                          value={item.start}
                        />
                      </label>
                      <label>
                        <span className="label">End</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('experience', item.id, {
                              end: event.target.value,
                            })
                          }
                          value={item.end}
                        />
                      </label>
                    </div>
                    <label className="mt-3 block">
                      <span className="label">Impact</span>
                      <textarea
                        className="input min-h-20 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('experience', item.id, {
                            description: event.target.value,
                          })
                        }
                        value={item.description}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('experience', item.id, createExperienceItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Education</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('education', createEducationItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.education.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Degree</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('education', item.id, {
                              degree: event.target.value,
                            })
                          }
                          value={item.degree}
                        />
                      </label>
                      <label>
                        <span className="label">Institution</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('education', item.id, {
                              institution: event.target.value,
                            })
                          }
                          value={item.institution}
                        />
                      </label>
                      <label>
                        <span className="label">Start</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('education', item.id, {
                              start: event.target.value,
                            })
                          }
                          value={item.start}
                        />
                      </label>
                      <label>
                        <span className="label">End</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('education', item.id, {
                              end: event.target.value,
                            })
                          }
                          value={item.end}
                        />
                      </label>
                    </div>
                    <label className="mt-3 block">
                      <span className="label">Notes</span>
                      <textarea
                        className="input min-h-16 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('education', item.id, {
                            description: event.target.value,
                          })
                        }
                        value={item.description}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() => removeCollectionItem('education', item.id, createEducationItem)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Skills</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('skills', createSkillItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.skills.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Skill</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('skills', item.id, {
                              name: event.target.value,
                            })
                          }
                          value={item.name}
                        />
                      </label>
                      <label>
                        <span className="label">Level</span>
                        <select
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('skills', item.id, {
                              level: event.target.value,
                            })
                          }
                          value={item.level}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </label>
                    </div>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() => removeCollectionItem('skills', item.id, createSkillItem)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Skill Categories (Grouped)</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('skillGroups', createSkillGroupItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.skillGroups?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Category</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('skillGroups', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Items (comma separated)</span>
                      <textarea
                        className="input min-h-16 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('skillGroups', item.id, {
                            items: event.target.value,
                          })
                        }
                        value={item.items}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('skillGroups', item.id, createSkillGroupItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Projects</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('projects', createProjectItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.projects.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Project Name</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            name: event.target.value,
                          })
                        }
                        value={item.name}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Link</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            link: event.target.value,
                          })
                        }
                        value={item.link}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Description</span>
                      <textarea
                        className="input min-h-16 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            description: event.target.value,
                          })
                        }
                        value={item.description}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Technologies Used</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            technologies: event.target.value,
                          })
                        }
                        value={item.technologies || ''}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Your Contribution</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            contribution: event.target.value,
                          })
                        }
                        value={item.contribution || ''}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Key Achievement / Result</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('projects', item.id, {
                            achievement: event.target.value,
                          })
                        }
                        value={item.achievement || ''}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() => removeCollectionItem('projects', item.id, createProjectItem)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Certifications</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('certifications', createCertificationItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.certifications.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Certificate</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('certifications', item.id, {
                              name: event.target.value,
                            })
                          }
                          value={item.name}
                        />
                      </label>
                      <label>
                        <span className="label">Issuer</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('certifications', item.id, {
                              issuer: event.target.value,
                            })
                          }
                          value={item.issuer}
                        />
                      </label>
                      <label>
                        <span className="label">Year</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('certifications', item.id, {
                              year: event.target.value,
                            })
                          }
                          value={item.year}
                        />
                      </label>
                    </div>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('certifications', item.id, createCertificationItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Internships / Training</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('internships', createInternshipItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.internships?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Role</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('internships', item.id, {
                              title: event.target.value,
                            })
                          }
                          value={item.title}
                        />
                      </label>
                      <label>
                        <span className="label">Company / Institute</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('internships', item.id, {
                              organization: event.target.value,
                            })
                          }
                          value={item.organization}
                        />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="label">Duration</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('internships', item.id, {
                              duration: event.target.value,
                            })
                          }
                          value={item.duration}
                        />
                      </label>
                    </div>
                    <label className="mt-3 block">
                      <span className="label">Work Summary</span>
                      <textarea
                        className="input min-h-16 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('internships', item.id, {
                            description: event.target.value,
                          })
                        }
                        value={item.description}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Achievements / Skills Gained</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('internships', item.id, {
                            achievements: event.target.value,
                          })
                        }
                        value={item.achievements}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('internships', item.id, createInternshipItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Achievements</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('achievements', createAchievementItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.achievements?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Title</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('achievements', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Details</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('achievements', item.id, {
                            details: event.target.value,
                          })
                        }
                        value={item.details}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('achievements', item.id, createAchievementItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Extracurricular / Leadership</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('extracurricular', createExtracurricularItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.extracurricular?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Title</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('extracurricular', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Details</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('extracurricular', item.id, {
                            details: event.target.value,
                          })
                        }
                        value={item.details}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem(
                          'extracurricular',
                          item.id,
                          createExtracurricularItem,
                        )
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Research & Publications</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('research', createResearchItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.research?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Title</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('research', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <label>
                        <span className="label">Journal / Source</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('research', item.id, {
                              source: event.target.value,
                            })
                          }
                          value={item.source}
                        />
                      </label>
                      <label>
                        <span className="label">Year</span>
                        <input
                          className="input"
                          onChange={(event) =>
                            updateCollectionItem('research', item.id, {
                              year: event.target.value,
                            })
                          }
                          value={item.year}
                        />
                      </label>
                    </div>
                    <label className="mt-3 block">
                      <span className="label">Details</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('research', item.id, {
                            details: event.target.value,
                          })
                        }
                        value={item.details}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() => removeCollectionItem('research', item.id, createResearchItem)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Professional Memberships</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('memberships', createMembershipItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.memberships?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Membership</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('memberships', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Details</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('memberships', item.id, {
                            details: event.target.value,
                          })
                        }
                        value={item.details}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem('memberships', item.id, createMembershipItem)
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-serif text-lg text-stone-900">Personal Details (Optional)</h3>
                <button
                  className="btn-secondary"
                  onClick={() => addCollectionItem('personalDetails', createPersonalDetailItem)}
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {activeResume.personalDetails?.map((item) => (
                  <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <label>
                      <span className="label">Field</span>
                      <input
                        className="input"
                        onChange={(event) =>
                          updateCollectionItem('personalDetails', item.id, {
                            title: event.target.value,
                          })
                        }
                        value={item.title}
                      />
                    </label>
                    <label className="mt-3 block">
                      <span className="label">Value</span>
                      <textarea
                        className="input min-h-14 resize-y"
                        onChange={(event) =>
                          updateCollectionItem('personalDetails', item.id, {
                            details: event.target.value,
                          })
                        }
                        value={item.details}
                      />
                    </label>
                    <button
                      className="btn-danger mt-3 px-3 py-1.5 text-xs"
                      onClick={() =>
                        removeCollectionItem(
                          'personalDetails',
                          item.id,
                          createPersonalDetailItem,
                        )
                      }
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside
            className={`space-y-3 xl:sticky xl:top-4 xl:h-fit ${
              mobilePane === 'editor' ? 'hidden xl:block' : ''
            }`}
          >
            {isExporting && (
              <div className="panel border-teal-700 bg-teal-50">
                <p className="text-sm font-semibold text-teal-900">Preparing PDF export...</p>
              </div>
            )}
            <ResumePreview resume={activeResume} />
          </aside>
        </div>

        <MobileNav />
      </section>
    </main>
  )
}

export default Editor
