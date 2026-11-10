function AuthInput({
  id,
  name,
  label,
  type = 'text',
  icon: Icon,
  error,
  hint,
  rightElement,
  ...props
}) {
  return (
    <div className="w-full">
      <div className="relative">

        {/* Input Icon */}
        {Icon && (
          <Icon
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-indigo-600"
          />
        )}

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={`peer h-14 w-full rounded-xl border bg-slate-50/70 px-4 text-[15px] text-slate-900 outline-none transition-all duration-200 placeholder-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${
            Icon ? 'pl-12' : ''
          } ${
            rightElement ? 'pr-12' : ''
          } ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
              : 'border-slate-200'
          }`}
          {...props}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-[15px] text-slate-500 transition-all duration-200 peer-focus:-top-2 peer-focus:scale-90 peer-focus:bg-white peer-focus:px-1 peer-focus:text-indigo-600 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:bg-slate-50 peer-[:not(:placeholder-shown)]:px-1 ${
            Icon ? 'left-12' : 'left-4'
          }`}
        >
          {label}
        </label>

        {/* Right Element */}
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}

      </div>

      {/* Error */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[14px] font-medium text-red-600"
        >
          {error}
        </p>
      )}

      {/* Hint */}
      {!error && hint && (
        <p
          id={`${id}-hint`}
          className="mt-2 text-[14px] text-slate-500"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default AuthInput