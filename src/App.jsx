import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'

import PlaceholderPage from './pages/PlaceholderPage'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/auth/AuthPage'

function HomeRedirect() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={`/${user.role}/dashboard`} replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Guest Routes */}
        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<AuthPage mode="login" />}
          />

          <Route
            path="/register"
            element={<AuthPage mode="register" />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <DashboardPage
                title="Admin Dashboard"
                description="Manage users, quizzes, categories and platform activities."
              />
            }
          />
        </Route>

        {/* Teacher Routes */}
        <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
          <Route
            path="/teacher"
            element={<Navigate to="/teacher/dashboard" replace />}
          />

          <Route
            path="/teacher/dashboard"
            element={
              <DashboardPage
                title="Teacher Dashboard"
                description="Manage your quizzes, questions and student results."
              />
            }
          />
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route
            path="/student"
            element={<Navigate to="/student/dashboard" replace />}
          />

          <Route
            path="/student/dashboard"
            element={
              <DashboardPage
                title="Student Dashboard"
                description="Explore quizzes, take exams and track your progress."
              />
            }
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="404 - Page Not Found"
              description="Sorry, the page you are looking for does not exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App