function SectionManager({ items, order, visibility, onMove, onToggle }) {
  return (
    <div className="panel">
      <h3 className="font-serif text-lg text-stone-900">Section Manager</h3>
      <p className="mt-1 text-sm text-stone-600">
        Reorder sections and toggle visibility in the final resume.
      </p>
      <div className="mt-4 space-y-2">
        {order.map((key, index) => {
          const section = items.find((item) => item.key === key)
          if (!section) return null

          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3 py-2"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-stone-800">
                <input
                  checked={visibility[key] !== false}
                  onChange={(event) => onToggle(key, event.target.checked)}
                  type="checkbox"
                />
                {section.label}
              </label>
              <div className="flex gap-1">
                <button
                  className="btn-secondary px-2 py-1 text-xs"
                  disabled={index === 0}
                  onClick={() => onMove(key, 'up')}
                  type="button"
                >
                  Up
                </button>
                <button
                  className="btn-secondary px-2 py-1 text-xs"
                  disabled={index === order.length - 1}
                  onClick={() => onMove(key, 'down')}
                  type="button"
                >
                  Down
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionManager

