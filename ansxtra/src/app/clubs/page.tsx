// ANSxtra Beautiful Design - Deployed on Vercel
'use client'

import { useState } from 'react'

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const clubs = [
    {
      id: "1",
      name: "UNICEF Ambassadors",
      description: "Promoting children's rights and humanitarian values through awareness campaigns and community service. Join us in making a difference in the lives of children worldwide.",
      shortDescription: "Promoting children's rights and humanitarian values",
      tags: ["Service", "Leadership", "Global Impact"],
      isOpen: true,
      memberCount: 15,
      type: "student_led",
      meetingTime: "Every Friday, 3:30 PM",
      location: "Room 201",
      coverColor: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      name: "Interact Club",
      description: "Rotary-sponsored service club developing leadership skills through community service projects. Build character, develop leadership, and serve your community.",
      shortDescription: "Rotary-sponsored service club for leadership development",
      tags: ["Service", "Leadership", "Community"],
      isOpen: true,
      memberCount: 22,
      type: "student_led",
      meetingTime: "Every Tuesday, 4:00 PM",
      location: "Room 105",
      coverColor: "from-green-500 to-emerald-500"
    },
    {
      id: "3",
      name: "Model United Nations",
      description: "Simulate UN committees and debate global issues while developing diplomatic and public speaking skills. Represent countries, solve world problems, and build international understanding.",
      shortDescription: "Simulate UN committees and debate global issues",
      tags: ["Academic", "Competition", "Leadership", "Global Affairs"],
      isOpen: true,
      memberCount: 18,
      type: "student_led",
      meetingTime: "Every Wednesday, 3:00 PM",
      location: "Conference Room A",
      coverColor: "from-purple-500 to-indigo-500"
    },
    {
      id: "4",
      name: "Moot Court",
      description: "Simulate court proceedings and develop legal reasoning skills through competitive mock trials. Learn about law, practice argumentation, and compete nationally.",
      shortDescription: "Simulate court proceedings and develop legal reasoning",
      tags: ["Academic", "Competition", "Leadership", "Law"],
      isOpen: true,
      memberCount: 12,
      type: "student_led",
      meetingTime: "Every Thursday, 4:30 PM",
      location: "Room 301",
      coverColor: "from-red-500 to-pink-500"
    },
    {
      id: "5",
      name: "Operation Smile",
      description: "Support children with facial deformities through fundraising and awareness campaigns for free surgeries. Help bring smiles to children's faces worldwide.",
      shortDescription: "Support children with facial deformities",
      tags: ["Service", "Leadership", "Healthcare", "Fundraising"],
      isOpen: true,
      memberCount: 20,
      type: "student_led",
      meetingTime: "Every Monday, 3:00 PM",
      location: "Room 108",
      coverColor: "from-yellow-500 to-orange-500"
    },
    {
      id: "6",
      name: "Sports Club",
      description: "Teacher-led sports program offering basketball, volleyball, swimming, and track & field training. Stay active, build teamwork, and represent your school in competitions.",
      shortDescription: "Comprehensive sports training and competition",
      tags: ["Sports", "Leadership", "Teamwork", "Fitness"],
      isOpen: false,
      memberCount: 35,
      type: "teacher_led",
      meetingTime: "Every day after school",
      location: "Sports Complex",
      coverColor: "from-indigo-500 to-blue-500"
    }
  ]

  const categories = ['all', 'Service', 'Academic', 'Competition', 'Leadership', 'Sports', 'Global Affairs', 'Community', 'Healthcare', 'Law', 'Fundraising', 'Teamwork', 'Fitness']

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || club.tags.includes(selectedCategory)
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'open' && club.isOpen) ||
                         (selectedStatus === 'closed' && !club.isOpen)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
              Discover Your Passion
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join exciting extracurricular clubs at Amnuaysilpa School and unlock your potential through leadership, service, and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#clubs" className="btn-primary text-lg px-8 py-4">
                Browse All Clubs
              </a>
              <a href="/auth" className="btn-secondary text-lg px-8 py-4">
                Student Login
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search clubs, activities, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="open">Open for Applications</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clubs Section */}
      <div id="clubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredClubs.length} Club{filteredClubs.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600">
            {searchQuery && `Results for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` • ${selectedCategory} category`}
            {selectedStatus !== 'all' && ` • ${selectedStatus} status`}
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
              <div key={club.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden card-hover">
                {/* Cover Image */}
                <div className={`relative h-48 bg-gradient-to-br ${club.coverColor} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">
                        {club.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {club.isOpen ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                        Closed
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {club.shortDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {club.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {club.tags.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        +{club.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Meeting Info */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{club.meetingTime}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{club.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        {club.memberCount} members
                      </span>
                      <span className="capitalize text-purple-600 font-medium">
                        {club.type.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {club.isOpen && (
                      <a 
                        href={`/clubs/${club.id}`}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters to find more clubs.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}