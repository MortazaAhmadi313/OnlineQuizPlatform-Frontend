import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react'

import { useAuth } from '../../contexts/AuthContext'

import AuthLayout from '../../components/common/auth/AuthLayout'
import AuthInput from '../../components/common/auth/AuthInput'
import AuthButton from '../../components/common/auth/AuthButton'
import PasswordStrengthMeter from '../../components/common/auth/PasswordStrengthMeter'

function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register'

  const { login, register } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // Reset form when switching between Login and Register
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    setError('')
    setFieldErrors({})
    setShowPassword(false)
    setShowConfirmPassword(false)
  }, [mode])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')

    setFieldErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setFieldErrors({})

    // Frontend validation
    if (isRegister) {
      if (formData.password.length < 8) {
        setFieldErrors({
          password: 'Password must contain at least 8 characters.',
        })
        return
      }

      if (formData.password !== formData.password_confirmation) {
        setFieldErrors({
          password_confirmation: 'Passwords do not match.',
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      let authenticatedUser

      if (isRegister) {
        authenticatedUser = await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      } else {
        authenticatedUser = await login({
          email: formData.email.trim(),
          password: formData.password,
        })
      }

      const redirectPath = location.state?.from?.pathname

      navigate(
        redirectPath || `/${authenticatedUser.role}/dashboard`,
        { replace: true }
      )

    } catch (err) {
      const response = err.response?.data

      if (response?.errors) {
        const errors = {}

        Object.entries(response.errors).forEach(([field, messages]) => {
          errors[field] = messages[0]
        })

        setFieldErrors(errors)
      } else {
        setError(
          response?.message ||
          'Something went wrong. Please try again.'
        )
      }

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      isRegister={isRegister}
      footer="© 2026 Online Quiz Platform. All rights reserved."
    >

      {/* Heading */}
      <div className="mb-7 text-center">

        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          {isRegister ? 'Create Account' : 'Login'}
        </h1>

        <p className="mt-2 text-[15px] text-slate-500">
          {isRegister
            ? 'Create your account and start learning.'
            : 'Welcome back! Please enter your details.'}
        </p>

      </div>

      {/* Authentication Form */}
      <form onSubmit={handleSubmit} className="space-y-7">

        {/* Full Name */}
        {isRegister && (
          <AuthInput
            id="name"
            name="name"
            label="Full Name"
            icon={UserRound}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            error={fieldErrors.name}
            required
          />
        )}

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
          error={fieldErrors.email}
          required
        />

        {/* Password */}
        <div>
          <AuthInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            icon={LockKeyhole}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            }
          />

          {isRegister && !fieldErrors.password && (
            <PasswordStrengthMeter password={formData.password} />
          )}
        </div>

        {/* Confirm Password */}
        {isRegister && (
          <AuthInput
            id="password_confirmation"
            name="password_confirmation"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            icon={LockKeyhole}
            autoComplete="new-password"
            value={formData.password_confirmation}
            onChange={handleChange}
            error={fieldErrors.password_confirmation}
            required
            rightElement={
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            }
          />
        )}

        {/* General Error */}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <AuthButton
          isLoading={isSubmitting}
          loadingText={isRegister ? 'Creating account...' : 'Signing in...'}
        >
          <span>{isRegister ? 'Create Account' : 'Login'}</span>
          <ArrowRight size={18} />
        </AuthButton>

      </form>

      {/* Mobile Switch */}
      <p className="mt-6 text-center text-[15px] text-slate-500 lg:hidden">
        {isRegister
          ? 'Already have an account? '
          : "Don't have an account? "}

        <Link
          to={isRegister ? '/login' : '/register'}
          className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </p>

    </AuthLayout>
  )
}

export default AuthPage