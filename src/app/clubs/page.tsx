'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ClubCard from '@/components/ClubCard'
import { getClubs } from '@/lib/data'
import { Club } from '@/types'

export default function ClubsPage() {
  const searchParams = useSearchParams()
  const [clubs, setClubs] = useState<Club[]>([])
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [dayFilter, setDayFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [acceptingOnly, setAcceptingOnly] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadClubs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [clubs, searchQuery, dayFilter, typeFilter, categoryFilter, acceptingOnly, sortBy])

  async function loadClubs() {
    try {
      const allClubs = await getClubs()
      setClubs(allClubs)
    } catch (error) {
      console.error('Error loading clubs:', error)
    } finally {
      setLoading(false)
    }
  }

  function applyFilters() {
    let filtered = [...clubs]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(club => 
        club.name.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query) ||
        club.category.toLowerCase().includes(query)
      )
    }

    // Apply day filter
    if (dayFilter) {
      filtered = filtered.filter(club => club.meeting.day === dayFilter)
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(club => club.type === typeFilter)
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(club => club.category === categoryFilter)
    }

    // Apply accepting applications filter
    if (acceptingOnly) {
      filtered = filtered.filter(club => club.acceptingApplications)
    }

    // Sort clubs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'day':
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          return days.indexOf(a.meeting.day) - days.indexOf(b.meeting.day)
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    setFilteredClubs(filtered)
  }

  function resetFilters() {
    setSearchQuery('')
    setDayFilter('')
    setTypeFilter('')
    setCategoryFilter('')
    setAcceptingOnly(false)
    setSortBy('name')
  }

  // Get unique categories from clubs
  const categories = Array.from(new Set(clubs.map(club => club.category))).sort()

  return (
    <>
      {/* Page Header */}
      <section className="gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3 text-white">Browse Clubs</h1>
          <p className="text-lg opacity-95">Discover all the amazing clubs and activities at Amnuaysilpa School</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50 py-6 sticky top-[60px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-600 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600 mb-2">Day</label>
              <select
                value={dayFilter}
                onChange={(e) => setDayFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div className="min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Types</option>
                <option value="Teacher-run">Teacher-run</option>
                <option value="Student-led">Student-led</option>
              </select>
            </div>

            <div className="min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="acceptingOnly"
                checked={acceptingOnly}
                onChange={(e) => setAcceptingOnly(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="acceptingOnly" className="text-sm font-medium text-gray-700">
                Accepting Only
              </label>
            </div>

            <button
              onClick={resetFilters}
              className="btn btn-ghost"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg text-gray-600">
            Showing {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="day">Meeting Day</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6">
                <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No clubs found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
