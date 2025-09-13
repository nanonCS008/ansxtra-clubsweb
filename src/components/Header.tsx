'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">ANSXtra</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`w-6 h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-purple-600 bg-purple-100' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/clubs" 
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive('/clubs') ? 'text-purple-600 bg-purple-100' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Clubs
            </Link>
            <Link 
              href="/applications" 
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive('/applications') ? 'text-purple-600 bg-purple-100' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              My Applications
            </Link>
            <Link 
              href="/about" 
              className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive('/about') ? 'text-purple-600 bg-purple-100' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              About
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') ? 'text-purple-600 bg-purple-100' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/clubs" 
                className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive('/clubs') ? 'text-purple-600 bg-purple-100' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Clubs
              </Link>
              <Link 
                href="/applications" 
                className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive('/applications') ? 'text-purple-600 bg-purple-100' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Applications
              </Link>
              <Link 
                href="/about" 
                className={`font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive('/about') ? 'text-purple-600 bg-purple-100' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
