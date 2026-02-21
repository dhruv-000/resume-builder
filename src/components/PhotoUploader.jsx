import { useRef, useState } from 'react'

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target?.result || '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

function PhotoUploader({ value, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  const handlePickFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    if (file.size > 2_000_000) {
      setError('Image must be under 2MB.')
      return
    }

    try {
      setError('')
      const dataUrl = await readAsDataUrl(file)
      onChange(dataUrl)
    } catch {
      setError('Could not load image.')
    }
  }

  const handleRemove = () => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
      <p className="label">Photo</p>
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 overflow-hidden rounded-full border border-stone-300 bg-white">
          {value ? (
            <img alt="Profile" className="h-full w-full object-cover" src={value} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
              No photo
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="btn-secondary px-3 py-1.5 text-xs"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Upload
          </button>
          {value && (
            <button
              className="btn-danger px-3 py-1.5 text-xs"
              onClick={handleRemove}
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handlePickFile}
        type="file"
      />
    </div>
  )
}

export default PhotoUploader

