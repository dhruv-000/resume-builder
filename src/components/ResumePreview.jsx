import AcademicTemplate from '../templates/AcademicTemplate'
import CorporateTemplate from '../templates/CorporateTemplate'
import CreativeTemplate from '../templates/CreativeTemplate'
import EngineeringTemplate from '../templates/EngineeringTemplate'
import MedicalTemplate from '../templates/MedicalTemplate'

const templateMap = {
  engineering: EngineeringTemplate,
  medical: MedicalTemplate,
  academic: AcademicTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
}

function ResumePreview({ resume }) {
  const Template = templateMap[resume.template] || EngineeringTemplate

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-300 bg-stone-100/90 p-2 shadow-card sm:p-3">
      <div id="resume-preview-document" className="preview-paper mx-auto">
        <Template resume={resume} />
      </div>
    </div>
  )
}

export default ResumePreview
