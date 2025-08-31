'use client'

import { useState } from 'react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email.endsWith('@student.amnuaysilpa.ac.th')) {
      setMessage('Login successful! Redirecting to clubs...')
      // In a real app, you'd redirect here
      setTimeout(() => {
        window.location.href = '/clubs'
      }, 1500)
    } else {
      setMessage('Please use your school email address (@student.amnuaysilpa.ac.th)')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-large mb-8">
            <span className="text-white font-bold text-4xl">A</span>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Welcome Back
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Sign in to access your extracurricular dashboard and manage your club applications
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-3">
              School Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="650123@student.amnuaysilpa.ac.th"
                className="appearance-none rounded-2xl relative block w-full pl-12 pr-4 py-4 border border-neutral-200 placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-base transition-all duration-300 bg-neutral-50 focus:bg-white shadow-soft"
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              Use your school email address to access ANSxtra
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-2xl text-sm border ${
              message.includes('successful') 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-glow"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Demo Account Info */}
        <div className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-2xl p-6 border border-accent-200">
          <h3 className="text-sm font-semibold text-accent-900 mb-3">Demo Account</h3>
          <p className="text-sm text-accent-700 mb-4 leading-relaxed">
            Try logging in with this demo student account to explore the platform:
          </p>
          <div className="bg-white rounded-xl p-4 border border-accent-200 shadow-soft">
            <p className="text-sm font-mono text-accent-800 text-center">
              650123@student.amnuaysilpa.ac.th
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-sm text-neutral-500">
            Don't have access?{' '}
            <a href="#" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Contact your school administrator
            </a>
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/clubs" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">
              Browse Clubs
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-primary-600 transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}