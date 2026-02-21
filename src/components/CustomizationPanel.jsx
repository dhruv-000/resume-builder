import {
  DENSITY_OPTIONS,
  FONT_OPTIONS,
  HEADING_STYLE_OPTIONS,
} from '../context/resumeConfig'
import ColorPicker from './ColorPicker'

function CustomizationPanel({
  themeColor,
  fontFamily,
  layout,
  onThemeColorChange,
  onFontFamilyChange,
  onLayoutChange,
}) {
  return (
    <div className="panel">
      <h3 className="font-serif text-lg text-stone-900">Customization Panel</h3>
      <p className="mt-1 text-sm text-stone-600">
        Fine-tune color, typography, density, headings, and photo visibility for perfect exports.
      </p>

      <div className="mt-4 space-y-4">
        <ColorPicker onChange={onThemeColorChange} value={themeColor} />

        <div>
          <p className="label">Font System</p>
          <select
            className="input"
            onChange={(event) => onFontFamilyChange(event.target.value)}
            value={fontFamily}
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className="label">Content Density</span>
            <select
              className="input"
              onChange={(event) => onLayoutChange({ density: event.target.value })}
              value={layout.density}
            >
              {DENSITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="label">Section Heading Style</span>
            <select
              className="input"
              onChange={(event) => onLayoutChange({ headingStyle: event.target.value })}
              value={layout.headingStyle}
            >
              {HEADING_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-700">
          <input
            checked={layout.showPhoto}
            onChange={(event) => onLayoutChange({ showPhoto: event.target.checked })}
            type="checkbox"
          />
          Show profile photo in templates that support it
        </label>
      </div>
    </div>
  )
}

export default CustomizationPanel

