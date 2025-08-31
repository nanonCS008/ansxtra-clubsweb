// ANSxtra Beautiful Layout - Deployed on Vercel
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANSxtra - Amnuaysilpa School Extracurricular Portal',
  description: 'Discover and join exciting extracurricular clubs at Amnuaysilpa School. Build leadership skills, serve your community, and pursue your passions.',
  keywords: 'Amnuaysilpa School, extracurricular clubs, student activities, leadership development, community service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-neutral-50`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold text-2xl">A</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-gentle"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                    ANSxtra
                  </h1>
                  <p className="text-sm text-neutral-500 -mt-1 font-medium">Extracurricular Excellence</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                <a href="/clubs" className="group relative px-6 py-3 rounded-xl text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300">
                  <span className="relative z-10">Browse Clubs</span>
                  <div className="absolute inset-0 bg-primary-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                </a>
                <a href="/auth" className="group relative px-6 py-3 rounded-xl text-neutral-700 hover:text-secondary-600 font-medium transition-all duration-300">
                  <span className="relative z-10">Student Portal</span>
                  <div className="absolute inset-0 bg-secondary-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                </a>
                <a href="/clubs" className="ml-4 px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105">
                  Get Started
                </a>
              </nav>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors">
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                      ANSxtra
                    </h3>
                    <p className="text-sm text-neutral-400">Extracurricular Excellence</p>
                  </div>
                </div>
                <p className="text-neutral-300 text-lg leading-relaxed max-w-md">
                  Empowering students to discover their passions, develop leadership skills, and make a positive impact through diverse extracurricular activities at Amnuaysilpa School.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li><a href="/clubs" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:bg-primary-400 transition-colors"></span>
                    Browse All Clubs
                  </a></li>
                  <li><a href="/auth" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:bg-primary-400 transition-colors"></span>
                    Student Login
                  </a></li>
                  <li><a href="/me" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:bg-primary-400 transition-colors"></span>
                    My Dashboard
                  </a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-300 text-sm">clubs@amnuaysilpa.ac.th</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-neutral-300 text-sm">Amnuaysilpa School</p>
                      <p className="text-neutral-400 text-sm">Extracurricular Office</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-neutral-400 text-sm text-center md:text-left">
                  © 2024 ANSxtra. All rights reserved. Built with ❤️ for Amnuaysilpa School.
                </p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a>
                  <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}