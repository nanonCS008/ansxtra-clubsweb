'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getClubById } from '@/lib/data'
import { Club } from '@/types'

export default function ClubDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [club, setClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.slug) {
      loadClub(params.slug as string)
    }
  }, [params.slug])

  async function loadClub(id: string) {
    try {
      const clubData = await getClubById(id)
      setClub(clubData)
    } catch (error) {
      console.error('Error loading club:', error)
      setError('Club not found')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-xl mb-8" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (error || !club) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold mb-4">Club Not Found</h2>
        <p className="text-gray-600 mb-6">The club you're looking for doesn't exist.</p>
        <Link href="/clubs" className="btn btn-primary">
          Browse Clubs
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-purple-600 hover:text-purple-700">
                Home
              </Link>
            </li>
            <li className="text-gray-400">›</li>
            <li>
              <Link href="/clubs" className="text-purple-600 hover:text-purple-700">
                Clubs
              </Link>
            </li>
            <li className="text-gray-400">›</li>
            <li className="text-gray-900 font-medium">{club.name}</li>
          </ol>
        </div>
      </nav>

      {/* Club Hero */}
      <section className="relative h-96 gradient-primary">
        {club.image && (
          <img 
            src={club.image} 
            alt={club.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-3 text-white">{club.name}</h1>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-medium">
                {club.type}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-medium">
                {club.category}
              </span>
              {club.acceptingApplications ? (
                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-medium">
                  ✓ Accepting Applications
                </span>
              ) : (
                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full font-medium">
                  ✗ Not Accepting
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!club.acceptingApplications && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg mb-6 text-center font-semibold">
            This club is currently not accepting new applications
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="card p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  📖
                </span>
                About This Club
              </h2>
              <p className="text-gray-600 leading-relaxed">{club.description}</p>
            </section>

            {/* Activities Section */}
            <section className="card p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  🎯
                </span>
                What You'll Do
              </h2>
              <ul className="space-y-3">
                {club.whatYouDo.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-600">{activity}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ Section */}
            {club.faq && club.faq.length > 0 && (
              <section className="card p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    ❓
                  </span>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {club.faq.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="font-semibold text-slate-900 mb-2">
                        <span className="text-purple-600 font-bold mr-2">Q:</span>
                        {item.q}
                      </div>
                      <div className="text-gray-600 pl-8">{item.a}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Meeting Info */}
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Meeting Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Day</div>
                    <div className="font-semibold">{club.meeting.day}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-semibold">{club.meeting.time}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-semibold">{club.meeting.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {club.contacts.leader && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Club Leader</div>
                    <div className="font-semibold mb-1">{club.contacts.leader.name}</div>
                    <a href={`mailto:${club.contacts.leader.email}`} className="text-sm text-purple-600 break-all">
                      {club.contacts.leader.email}
                    </a>
                  </div>
                )}
                {club.contacts.advisor && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Faculty Advisor</div>
                    <div className="font-semibold mb-1">{club.contacts.advisor.name}</div>
                    <a href={`mailto:${club.contacts.advisor.email}`} className="text-sm text-purple-600 break-all">
                      {club.contacts.advisor.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Apply Section */}
      {club.acceptingApplications && (
        <section className="sticky bottom-0 bg-white py-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.1)] z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="font-bold">Ready to join?</div>
                <div className="text-sm text-gray-600">Submit your application now</div>
              </div>
              <Link href={`/apply/${club.id}`} className="btn btn-primary min-w-[200px]">
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
