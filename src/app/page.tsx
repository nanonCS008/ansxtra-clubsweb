'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ClubCard from '@/components/ClubCard'
import { getClubs } from '@/lib/data'
import { Club } from '@/types'

export default function HomePage() {
  const [featuredClubs, setFeaturedClubs] = useState<Club[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadFeaturedClubs()
  }, [])

  async function loadFeaturedClubs() {
    try {
      const clubs = await getClubs()
      const featured = clubs.filter(club => club.acceptingApplications).slice(0, 3)
      setFeaturedClubs(featured)
    } catch (error) {
      console.error('Error loading clubs:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/clubs?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <span className="text-5xl font-bold">A</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">Discover Your Passion</h1>
          <p className="text-xl mb-8 opacity-95">Join extracurricular clubs at Amnuaysilpa School</p>
          
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="bg-white rounded-full p-2 flex items-center shadow-xl">
              <input
                type="text"
                placeholder="Search for clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-lg text-gray-900 outline-none"
              />
              <button type="submit" className="btn btn-primary rounded-full">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">8</div>
              <div className="text-gray-600 mt-2">Active Clubs</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">250+</div>
              <div className="text-gray-600 mt-2">Student Members</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">15</div>
              <div className="text-gray-600 mt-2">Expert Advisors</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">50+</div>
              <div className="text-gray-600 mt-2">Events Per Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Clubs</h2>
            <p className="text-lg text-gray-600">Popular clubs accepting applications now</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card p-6">
                  <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredClubs.map(club => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/clubs" className="btn btn-primary">
              View All Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Involved?</h2>
          <p className="text-lg mb-8 opacity-95">Browse our full catalog of clubs and find your community</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/clubs" className="btn bg-white text-purple-600 hover:bg-gray-100">
              Browse Clubs
            </Link>
            <Link href="/me" className="btn btn-primary">
              Track Applications
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
