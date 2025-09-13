'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, MoreVertical, RefreshCw, Trash2 } from 'lucide-react'
import { getApplications, deleteApplication, updateApplicationStatus, getNextStatus } from '@/lib/data'
import { Application } from '@/types'
import Button from '@/components/ui/Button'
import StatusPill from '@/components/ui/StatusPill'
import EmptyState from '@/components/ui/EmptyState'
import { ConfirmModal } from '@/components/ui/Modal'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Demo email for testing
  const demoEmail = 'demo@student.amnuaysilpa.ac.th'

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    try {
      const apps = await getApplications(demoEmail)
      setApplications(apps)
    } catch (error) {
      console.error('Error loading applications:', error)
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(applicationId: string) {
    const application = applications.find(app => app.id === applicationId)
    if (!application) return

    setActionLoading(applicationId)
    try {
      const nextStatus = getNextStatus(application.status)
      const updatedApp = await updateApplicationStatus(applicationId, nextStatus)
      
      setApplications(prev => 
        prev.map(app => app.id === applicationId ? updatedApp : app)
      )
    } catch (error) {
      console.error('Error updating status:', error)
      setError('Failed to update application status')
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDeleteApplication(applicationId: string) {
    setActionLoading(applicationId)
    try {
      await deleteApplication(applicationId)
      setApplications(prev => prev.filter(app => app.id !== applicationId))
      setShowDeleteModal(null)
    } catch (error) {
      console.error('Error deleting application:', error)
      setError('Failed to withdraw application')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-20" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">
                Track the status of your club applications and manage your submissions.
              </p>
            </div>
            <Button onClick={loadApplications} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {applications.length === 0 ? (
          <EmptyState
            icon="file"
            title="No Applications Yet"
            description="You haven't submitted any club applications. Browse our clubs to find ones that interest you!"
            action={{
              label: "Browse Clubs",
              onClick: () => window.location.href = '/clubs'
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'submitted').length}
                </div>
                <div className="text-sm text-gray-600">Submitted</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">
                  {applications.filter(app => app.status === 'under-review').length}
                </div>
                <div className="text-sm text-gray-600">Under Review</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        <Link
                          href={`/clubs/${application.clubId}`}
                          className="hover:text-purple-600 transition-colors"
                        >
                          {application.clubName}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Applied {new Date(application.submittedAt).toLocaleDateString()}</span>
                        </div>
                        {application.updatedAt && application.updatedAt !== application.submittedAt && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Updated {new Date(application.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <StatusPill status={application.status} />
                      
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2"
                          onClick={() => {
                            const dropdown = document.getElementById(`dropdown-${application.id}`)
                            if (dropdown) {
                              dropdown.classList.toggle('hidden')
                            }
                          }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        
                        <div
                          id={`dropdown-${application.id}`}
                          className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusUpdate(application.id)}
                              disabled={actionLoading === application.id}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            >
                              Simulate Status Change
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(application.id)}
                              disabled={actionLoading === application.id}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              Withdraw Application
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Motivation</h4>
                      <p className="text-gray-600 text-sm line-clamp-3">{application.motivation}</p>
                    </div>
                    
                    {application.experience && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Experience</h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{application.experience}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Application ID: {application.id}
                    </div>
                    
                    <Link href={`/clubs/${application.clubId}`}>
                      <Button variant="ghost" size="sm">
                        View Club Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Demo Features</h3>
          <p className="text-blue-800 text-sm mb-2">
            This is a demonstration of the application tracking system. In this demo:
          </p>
          <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
            <li>Click "Simulate Status Change" to cycle through different application statuses</li>
            <li>Use "Withdraw Application" to remove applications from your list</li>
            <li>All data is stored locally and will reset when you refresh the page</li>
          </ul>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        onConfirm={() => showDeleteModal && handleDeleteApplication(showDeleteModal)}
        title="Withdraw Application"
        message="Are you sure you want to withdraw this application? This action cannot be undone."
        confirmText="Withdraw"
        variant="danger"
      />
    </div>
  )
}
