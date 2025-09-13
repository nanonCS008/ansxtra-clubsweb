'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, Calendar, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ApplicationConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Application Submitted!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your interest in joining our club community.
          </p>
        </div>

        {/* Information Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">What happens next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Email Confirmation</div>
                <div className="text-sm text-gray-600">
                  You'll receive a confirmation email within a few minutes.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Review Process</div>
                <div className="text-sm text-gray-600">
                  Club leaders will review your application within 3-5 business days.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Decision Notification</div>
                <div className="text-sm text-gray-600">
                  You'll be notified of the decision via email and in your dashboard.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/applications" className="block">
            <Button className="w-full">
              View My Applications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Link href="/clubs" className="block">
            <Button variant="secondary" className="w-full">
              Browse More Clubs
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Questions about your application?{' '}
            <a 
              href="mailto:clubs@amnuaysilpa.ac.th" 
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
