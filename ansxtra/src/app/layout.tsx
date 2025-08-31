import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANSxtra - Amnuaysilpa School Extracurricular Portal',
  description: 'Explore and apply to extracurricular clubs at Amnuaysilpa School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">A</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold gradient-text">ANSxtra</h1>
                    <p className="text-xs text-gray-500 -mt-1">Extracurricular Portal</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="/clubs" className="group relative text-gray-700 hover:text-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-pink-50">
                    <span className="relative z-10">Clubs</span>
                    <div className="absolute inset-0 bg-pink-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  </a>
                  <a href="/auth" className="group relative text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-purple-50">
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-purple-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                  </a>
                  <a href="/clubs" className="btn-primary text-sm">
                    Explore Clubs
                  </a>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="text-2xl font-bold gradient-text">ANSxtra</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Empowering students to discover their passions through extracurricular activities at Amnuaysilpa School.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/clubs" className="text-gray-300 hover:text-pink-400 transition-colors">Browse Clubs</a></li>
                    <li><a href="/auth" className="text-gray-300 hover:text-pink-400 transition-colors">Student Login</a></li>
                    <li><a href="/me" className="text-gray-300 hover:text-pink-400 transition-colors">My Dashboard</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
                  <p className="text-gray-300 text-sm">
                    Amnuaysilpa School<br />
                    Extracurricular Office<br />
                    <a href="mailto:clubs@amnuaysilpa.ac.th" className="text-pink-400 hover:text-pink-300">
                      clubs@amnuaysilpa.ac.th
                    </a>
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400 text-sm">
                  © 2024 ANSxtra. All rights reserved. Built with ❤️ for Amnuaysilpa School.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}