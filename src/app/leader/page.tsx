'use client'

import Link from 'next/link'
import { Users, Calendar, MessageSquare, BarChart3, Settings, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LeaderDashboardPage() {
  // Mock data for demonstration
  const clubs = [
    { id: 'mun', name: 'Model United Nations', members: 24, applications: 8 },
    { id: 'debate', name: 'Debate Society', members: 18, applications: 3 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Leader Dashboard</h1>
              <p className="text-gray-600">
                Manage your clubs, review applications, and organize activities.
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">42</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-3xl font-bold text-gray-900">11</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Meetings</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Clubs</p>
                <p className="text-3xl font-bold text-gray-900">{clubs.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Members</span>
                    <span className="font-semibold">{club.members}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Applications</span>
                    <span className="font-semibold text-blue-600">{club.applications}</span>
                  </div>
                </div>

                <Link href={`/leader/clubs/${club.id}`}>
                  <Button className="w-full">
                    Manage Club
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="justify-start">
              <Users className="w-5 h-5 mr-3" />
              Review Applications
            </Button>
            <Button variant="secondary" className="justify-start">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Meeting
            </Button>
            <Button variant="secondary" className="justify-start">
              <MessageSquare className="w-5 h-5 mr-3" />
              Send Announcement
            </Button>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Leader Dashboard Demo</h3>
          <p className="text-blue-800 mb-4">
            This is a preview of the club leader dashboard. In the full implementation, leaders would have access to:
          </p>
          <ul className="text-blue-800 space-y-1 list-disc list-inside">
            <li>Member roster management</li>
            <li>Application review and approval system</li>
            <li>Meeting scheduling and attendance tracking</li>
            <li>Announcement and communication tools</li>
            <li>Activity and event planning features</li>
            <li>Performance analytics and reporting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
