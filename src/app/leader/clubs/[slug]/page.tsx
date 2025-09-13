'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Settings,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ClubLeaderPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('roster')

  // Mock data for demonstration
  const clubName = 'Model United Nations'
  const members = [
    { id: 1, name: 'Alice Johnson', grade: 'Grade 11', email: 'alice.j@student.amnuaysilpa.ac.th', role: 'Secretary' },
    { id: 2, name: 'Bob Smith', grade: 'Grade 12', email: 'bob.s@student.amnuaysilpa.ac.th', role: 'Treasurer' },
    { id: 3, name: 'Carol Davis', grade: 'Grade 10', email: 'carol.d@student.amnuaysilpa.ac.th', role: 'Member' },
    { id: 4, name: 'David Wilson', grade: 'Grade 11', email: 'david.w@student.amnuaysilpa.ac.th', role: 'Member' },
  ]

  const applications = [
    { 
      id: 1, 
      name: 'Emma Rodriguez', 
      grade: 'Grade 10', 
      email: 'emma.r@student.amnuaysilpa.ac.th',
      motivation: 'I am passionate about international relations and want to develop my public speaking skills...',
      submittedAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Frank Chen', 
      grade: 'Grade 9', 
      email: 'frank.c@student.amnuaysilpa.ac.th',
      motivation: 'I have always been interested in global affairs and diplomacy...',
      submittedAt: '2024-01-14'
    },
  ]

  const meetings = [
    { id: 1, title: 'Weekly Debate Session', date: '2024-01-24', time: '15:30', location: 'Room C301', attendees: 18 },
    { id: 2, title: 'Conference Preparation', date: '2024-01-31', time: '15:30', location: 'Room C301', attendees: 22 },
    { id: 3, title: 'Position Paper Workshop', date: '2024-02-07', time: '15:30', location: 'Room C301', attendees: 0 },
  ]

  const announcements = [
    { 
      id: 1, 
      title: 'Upcoming Conference Registration', 
      content: 'Registration for the National MUN Conference is now open. Deadline: February 15th.',
      date: '2024-01-20'
    },
    { 
      id: 2, 
      title: 'New Meeting Schedule', 
      content: 'Starting next week, meetings will be held every Wednesday at 15:30 in Room C301.',
      date: '2024-01-18'
    },
  ]

  const tabs = [
    { id: 'roster', label: 'Roster', icon: Users },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/leader">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{clubName}</h1>
              <p className="text-gray-600">Manage your club activities and members</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">
                <Settings className="w-4 h-4 mr-2" />
                Club Settings
              </Button>
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'roster' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Club Roster</h2>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {member.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${member.email}`} className="text-purple-600 hover:text-purple-700">
                            <Mail className="w-4 h-4" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Pending Applications</h2>
              <div className="text-sm text-gray-500">
                {applications.length} applications pending review
              </div>
            </div>

            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                      <p className="text-gray-600">{application.grade} • {application.email}</p>
                      <p className="text-sm text-gray-500">Applied on {new Date(application.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Motivation</h4>
                    <p className="text-gray-600 text-sm">{application.motivation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Meeting Schedule</h2>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{meeting.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {meeting.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {meeting.attendees > 0 ? `${meeting.attendees} attendees` : 'No attendees yet'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
            </div>

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Club Management Demo</h3>
          <p className="text-blue-800">
            This is a demonstration of the club leader interface. In the full implementation, 
            this page would include full CRUD operations for managing members, reviewing applications, 
            scheduling meetings, and creating announcements with real data persistence.
          </p>
        </div>
      </div>
    </div>
  )
}
