import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
} from 'lucide-react'

import { useAuth } from '../../contexts/AuthContext'

import AuthLayout from '../../components/common/auth/AuthLayout'
import AuthInput from '../../components/common/auth/AuthInput'
import AuthButton from '../../components/common/auth/AuthButton'

function LoginPage() {
  const { login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      const loggedInUser = await login({
        email: formData.email.trim(),
        password: formData.password,
      })

      const redirectPath = location.state?.from?.pathname

      navigate(
        redirectPath || `/${loggedInUser.role}/dashboard`,
        { replace: true }
      )
    } catch (err) {
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Unable to login. Please check your credentials.'

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      isRegister={false}
      footer="© 2026 Online Quiz Platform. All rights reserved."
    >

      {/* Heading */}
      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Login
        </h1>

        <p className="mt-3 text-[15px] text-slate-500">
          Welcome back! Please enter your details.
        </p>

      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <AuthInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          icon={LockKeyhole}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          }
        />

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Login Button */}
        <AuthButton
          isLoading={isSubmitting}
          loadingText="Signing in..."
        >
          <span>Login</span>
          <ArrowRight size={18} />
        </AuthButton>

      </form>

      {/* Mobile Register Link */}
      <p className="mt-7 text-center text-[15px] text-slate-500 lg:hidden">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
          Register
        </Link>
      </p>

    </AuthLayout>
  )
}

export default LoginPage