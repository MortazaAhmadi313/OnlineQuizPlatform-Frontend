import { useNavigate } from 'react-router-dom'
import { LogOut, GraduationCap } from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'

function DashboardPage({ title, description }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()

    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white">
              <GraduationCap size={24} />
            </div>

            <span className="text-lg font-bold text-slate-900">
              Online Quiz Platform
            </span>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* Dashboard Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-slate-500">
          {description}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-600">
            Dashboard content will be implemented soon.
          </p>
        </div>

      </main>

    </div>
  )
}

export default DashboardPage