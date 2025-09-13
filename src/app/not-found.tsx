'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-purple-200 mb-4 select-none">404</div>
          <div className="w-32 h-32 mx-auto bg-gradient-brand rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Search className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <Button className="w-full">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/clubs" className="block">
            <Button variant="secondary" className="w-full">
              <Search className="w-5 h-5 mr-2" />
              Browse Clubs
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="w-full text-purple-600 hover:text-purple-700 font-medium py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still having trouble? {' '}
            <a 
              href="mailto:clubs@amnuaysilpa.ac.th" 
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
