const palette = [
  '#0f766e',
  '#1d4ed8',
  '#b45309',
  '#be123c',
  '#155e75',
  '#4c1d95',
]

function ColorPicker({ value, onChange }) {
  return (
    <div>
      <p className="label">Theme Accent</p>
      <div className="flex flex-wrap items-center gap-2">
        {palette.map((color) => (
          <button
            key={color}
            aria-label={`Select ${color}`}
            className={`h-8 w-8 rounded-full border-2 transition ${
              value === color
                ? 'scale-110 border-stone-900'
                : 'border-transparent hover:scale-105'
            }`}
            onClick={() => onChange(color)}
            style={{ backgroundColor: color }}
            type="button"
          />
        ))}
        <input
          aria-label="Custom color"
          className="h-8 w-12 cursor-pointer rounded border border-stone-300 bg-white p-0"
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={value}
        />
      </div>
    </div>
  )
}

export default ColorPicker

