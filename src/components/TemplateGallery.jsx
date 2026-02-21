import { TEMPLATE_OPTIONS } from '../context/resumeConfig'

function TemplateGallery({ selected, onSelect, onApplyProfile }) {
  return (
    <div className="panel">
      <h3 className="font-serif text-lg text-stone-900">Template Gallery</h3>
      <p className="mt-1 text-sm text-stone-600">Choose profession.</p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TEMPLATE_OPTIONS.map((template) => {
          const isSelected = selected === template.value

          return (
            <button
              key={template.value}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                isSelected
                  ? 'border-teal-700 bg-teal-50 text-teal-900'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
              }`}
              onClick={() => {
                onSelect(template.value)
                onApplyProfile(template.value)
              }}
              type="button"
            >
              {template.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TemplateGallery
