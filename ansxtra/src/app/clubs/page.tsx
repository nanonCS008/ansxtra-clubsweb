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
      coverColor: "from-accent-500 to-accent-600",
      icon: "🌍"
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
      coverColor: "from-secondary-500 to-secondary-600",
      icon: "🤝"
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
      coverColor: "from-primary-500 to-primary-600",
      icon: "🏛️"
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
      coverColor: "from-neutral-700 to-neutral-800",
      icon: "⚖️"
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
      coverColor: "from-yellow-500 to-orange-500",
      icon: "😊"
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
      coverColor: "from-green-500 to-emerald-500",
      icon: "⚽"
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Passion
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join exciting extracurricular clubs at Amnuaysilpa School and unlock your potential through leadership, service, and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#clubs" className="group px-10 py-4 bg-white text-primary-600 font-bold rounded-2xl shadow-large hover:shadow-glow transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center space-x-2">
                  <span>Explore All Clubs</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a href="/auth" className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Student Portal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-neutral-200/50 sticky top-20 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search clubs, activities, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-4 py-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-4 py-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="open">Open for Applications</option>
                <option value="closed">Closed</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clubs Section */}
      <div id="clubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Results Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            {filteredClubs.length} Club{filteredClubs.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {searchQuery && `Results for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` • ${selectedCategory} category`}
            {selectedStatus !== 'all' && ` • ${selectedStatus} status`}
            {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && 
              'Discover amazing opportunities to grow, lead, and make a difference'}
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredClubs.map((club) => (
              <div key={club.id} className="group bg-white rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100 overflow-hidden">
                {/* Cover Image */}
                <div className={`relative h-56 bg-gradient-to-br ${club.coverColor} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{club.icon}</div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {club.isOpen ? (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200 shadow-soft">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-gentle"></div>
                        Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                        Closed
                      </span>
                    )}
                  </div>

                  {/* Member Count */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                      <span className="text-sm font-semibold text-neutral-700">
                        {club.memberCount} members
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {club.shortDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {club.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                    {club.tags.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-500">
                        +{club.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Meeting Info */}
                  <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-5 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-neutral-600">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{club.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-neutral-600">
                        <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{club.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="capitalize text-secondary-600 font-semibold bg-secondary-50 px-3 py-1 rounded-lg">
                        {club.type.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {club.isOpen && (
                      <a 
                        href={`/clubs/${club.id}`}
                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow transition-all duration-300 transform hover:scale-105"
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
          <div className="text-center py-20">
            <div className="mx-auto h-32 w-32 text-neutral-300 mb-8">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">No clubs found</h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find more clubs.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedStatus('all')
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-2xl shadow-medium hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}