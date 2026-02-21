function BrandLogo({ showText = true, size = 'md', className = '' }) {
  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`
  const iconSizeClass = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        alt="Resume Builder Pro logo"
        className={`${iconSizeClass} rounded-lg border border-stone-300/70`}
        src={logoSrc}
      />
      {showText && (
        <div className="leading-tight">
          <p className="text-sm font-semibold text-stone-900">Resume Builder Pro</p>
        </div>
      )}
    </div>
  )
}

export default BrandLogo
