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
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    ANSxtra
                  </span>
                </div>
                <nav className="flex space-x-8">
                  <a href="/clubs" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Clubs
                  </a>
                  <a href="/auth" className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}