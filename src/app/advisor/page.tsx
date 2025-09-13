'use client'

import { BarChart3, Users, Calendar, FileText, Award, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdvisorDashboardPage() {
  // Mock data for demonstration
  const clubs = [
    { id: 1, name: 'Model United Nations', leader: 'Jane Doe', members: 24, status: 'Active' },
    { id: 2, name: 'Eco Committee', leader: 'Ms. Siriporn Chen', members: 18, status: 'Active' },
    { id: 3, name: 'SPARK Community Service', leader: 'Mr. Nattapong Williams', members: 32, status: 'Active' },
    { id: 4, name: 'Debate Society', leader: 'Alex Johnson', members: 15, status: 'Inactive' },
  ]

  const recentActivity = [
    { id: 1, type: 'application', message: 'New application for Model United Nations', time: '2 hours ago' },
    { id: 2, type: 'meeting', message: 'Eco Committee meeting scheduled for tomorrow', time: '4 hours ago' },
    { id: 3, type: 'announcement', message: 'SPARK posted a new announcement', time: '1 day ago' },
    { id: 4, type: 'member', message: '3 new members joined Debate Society', time: '2 days ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Advisor Dashboard</h1>
              <p className="text-gray-600">
                Monitor and support extracurricular activities across the school.
              </p>
            </div>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clubs</p>
                <p className="text-3xl font-bold text-gray-900">{clubs.length}</p>
                <p className="text-xs text-green-600 mt-1">+2 this semester</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-3xl font-bold text-gray-900">89</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-3xl font-bold text-gray-900">23</p>
                <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Events This Month</p>
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-xs text-blue-600 mt-1">3 upcoming</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clubs Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Club Overview</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {clubs.map((club) => (
                <div key={club.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{club.name}</h3>
                    <p className="text-sm text-gray-600">Leader: {club.leader}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{club.members} members</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      club.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {club.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'application' ? 'bg-blue-100' :
                    activity.type === 'meeting' ? 'bg-green-100' :
                    activity.type === 'announcement' ? 'bg-purple-100' :
                    'bg-yellow-100'
                  }`}>
                    {activity.type === 'application' && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'meeting' && <Calendar className="w-4 h-4 text-green-600" />}
                    {activity.type === 'announcement' && <BarChart3 className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'member' && <Users className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Participation Rate</h3>
              <p className="text-3xl font-bold text-purple-600 mb-1">87%</p>
              <p className="text-sm text-gray-600">of eligible students</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Retention Rate</h3>
              <p className="text-3xl font-bold text-green-600 mb-1">94%</p>
              <p className="text-sm text-gray-600">semester to semester</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Satisfaction Score</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">4.6</p>
              <p className="text-sm text-gray-600">out of 5.0</p>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Advisor Dashboard Demo</h3>
          <p className="text-blue-800 mb-4">
            This is a preview of the advisor dashboard. In the full implementation, advisors would have access to:
          </p>
          <ul className="text-blue-800 space-y-1 list-disc list-inside">
            <li>Comprehensive analytics and reporting tools</li>
            <li>Club performance monitoring and evaluation</li>
            <li>Budget oversight and resource allocation</li>
            <li>Communication tools for coordinating with leaders</li>
            <li>Event planning and calendar management</li>
            <li>Student participation tracking and engagement metrics</li>
            <li>Policy management and compliance monitoring</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
