import { Construction } from 'lucide-react'

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 rounded-2xl bg-indigo-50 p-5 text-indigo-600">
        <Construction size={36} />
      </div>

      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      <span className="mt-5 rounded-full bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700">
        Coming Soon
      </span>
    </div>
  )
}

export default PlaceholderPage