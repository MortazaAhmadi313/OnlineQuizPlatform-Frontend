import { Link } from 'react-router-dom'
import { BookOpenCheck, ArrowRight } from 'lucide-react'

function AuthLayout({ children, footer, isRegister = false }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef1f8] px-4 py-8">

      {/* Main Card */}
      <div className="relative min-h-[680px] w-full max-w-[1200px] overflow-hidden rounded-[24px] bg-white shadow-[0_15px_50px_rgba(30,41,59,0.12)]">

        {/* Animated Blue Panel */}
        <section
          className={`absolute inset-y-0 z-20 hidden w-[40%] items-center justify-center overflow-hidden bg-[#6288ea] text-white transition-transform duration-700 ease-in-out lg:flex ${
            isRegister ? 'translate-x-[150%]' : 'translate-x-0'
          }`}
          style={{
            borderRadius: isRegister
              ? '48% 0 0 48% / 50% 0 0 50%'
              : '0 48% 48% 0 / 0 50% 50% 0',
          }}
        >

          <div className="max-w-[400px] px-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <BookOpenCheck size={30} />
            </div>

            <h2 className="text-[28px] font-bold tracking-tight">
              {isRegister ? 'Welcome Back!' : 'Hello, Welcome!'}
            </h2>

            <p className="mt-3 text-[15px] leading-6 text-white/90">
              {isRegister
                ? 'Already have an account? Sign in and continue your learning journey.'
                : 'Join our learning community and discover your potential.'}
            </p>

            <Link
              to={isRegister ? '/login' : '/register'}
              className="auth-panel-switch mt-7 inline-flex min-w-[135px] items-center justify-center gap-2 rounded-lg border border-white/90 px-5 py-2.5 text-[15px] font-semibold transition duration-300"
            >
              {isRegister ? 'Login' : 'Register'}

              <ArrowRight size={17} />
            </Link>

          </div>
        </section>

        {/* Form Area */}
        <section
          className={`relative flex min-h-[680px] w-full items-center justify-center px-6 py-12 transition-transform duration-700 ease-in-out sm:px-12 lg:absolute lg:inset-y-0 lg:w-[60%] lg:px-14 ${
            isRegister ? 'lg:translate-x-0' : 'lg:translate-x-[66.6667%]'
          }`}
        >
          <div className="w-full max-w-[480px]">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
              <BookOpenCheck className="text-indigo-600" size={28} />

              <span className="text-xl font-bold text-slate-800">
                Online Quiz
              </span>
            </div>

            {children}

          </div>
        </section>

      </div>

      {/* Footer */}
      {footer && (
        <div className="fixed bottom-3 left-0 right-0 px-4 text-center text-[13px] text-slate-400">
          {footer}
        </div>
      )}

    </main>
  )
}

export default AuthLayout