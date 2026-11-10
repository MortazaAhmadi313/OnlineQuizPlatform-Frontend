const requirements = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'One number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'One special character',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
]

function PasswordStrengthMeter({ password = '' }) {
  if (!password) return null

  const passedCount = requirements.filter((item) =>
    item.test(password)
  ).length

  const strength = {
    0: { label: 'Very Weak', color: 'bg-red-500' },
    1: { label: 'Weak', color: 'bg-red-500' },
    2: { label: 'Fair', color: 'bg-orange-500' },
    3: { label: 'Good', color: 'bg-yellow-500' },
    4: { label: 'Strong', color: 'bg-emerald-500' },
    5: { label: 'Very Strong', color: 'bg-emerald-600' },
  }[passedCount]

  return (
    <div className="mt-3 space-y-3">

      {/* Strength Indicator */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[14px] font-medium text-slate-600">
            Password Strength
          </span>

          <span className="text-[14px] font-semibold text-slate-700">
            {strength.label}
          </span>
        </div>

        <div className="flex gap-1.5">
          {requirements.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                index < passedCount
                  ? strength.color
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {requirements.map((item) => {
          const passed = item.test(password)

          return (
            <div
              key={item.label}
              className={`flex items-center gap-2 text-[14px] ${
                passed ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[11px] ${
                  passed
                    ? 'bg-emerald-100'
                    : 'bg-slate-100'
                }`}
              >
                {passed ? '✓' : '○'}
              </span>

              {item.label}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default PasswordStrengthMeter