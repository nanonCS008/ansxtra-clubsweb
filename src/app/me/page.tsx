'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Student, Application, Membership } from '@/types';
import { getStudentById } from '@/lib/data';
import StatusBadge from '@/components/StatusBadge';
import { NoApplicationsState, NoMembershipsState } from '@/components/EmptyState';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TabType = 'applications' | 'memberships';

export default function DashboardPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('applications');

  useEffect(() => {
    if (!session) {
      router.push('/auth');
      return;
    }

    const foundStudent = getStudentById(session.studentId);
    setStudent(foundStudent || null);
  }, [session, router]);

  if (!session) {
    return null; // Will redirect to auth
  }

  if (!student) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student not found</h1>
          <p className="text-gray-600">Unable to load your student information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {student.fullName}! Manage your club applications and memberships.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-semibold text-gray-900">{student.applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Memberships</p>
              <p className="text-2xl font-semibold text-gray-900">{student.memberships.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Student ID</p>
              <p className="text-2xl font-semibold text-gray-900">{student.studentId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'applications', label: 'Applications', count: student.applications.length },
              { id: 'memberships', label: 'Memberships', count: student.memberships.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                <Link
                  href="/clubs"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors text-sm"
                >
                  Browse More Clubs
                </Link>
              </div>

              {student.applications.length > 0 ? (
                <div className="space-y-4">
                  {student.applications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              ) : (
                <NoApplicationsState />
              )}
            </div>
          )}

          {/* Memberships Tab */}
          {activeTab === 'memberships' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Memberships</h3>
                <Link
                  href="/clubs"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors text-sm"
                >
                  Browse More Clubs
                </Link>
              </div>

              {student.memberships.length > 0 ? (
                <div className="space-y-4">
                  {student.memberships.map((membership) => (
                    <MembershipCard key={membership.id} membership={membership} />
                  ))}
                </div>
              ) : (
                <NoMembershipsState />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Application Card Component
function ApplicationCard({ application }: { application: Application }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="font-medium text-gray-900">{application.clubName}</h4>
            <StatusBadge status={application.status} size="sm" />
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {application.reason}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</span>
            <span>Grade: {application.grade}</span>
          </div>
        </div>
        <Link
          href={`/clubs/${application.clubSlug}`}
          className="ml-4 text-pink-600 hover:text-pink-700 text-sm font-medium"
        >
          View Club →
        </Link>
      </div>
    </div>
  );
}

// Membership Card Component
function MembershipCard({ membership }: { membership: Membership }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="font-medium text-gray-900">{membership.clubName}</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {membership.role}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Joined: {new Date(membership.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <Link
          href={`/clubs/${membership.clubSlug}`}
          className="ml-4 text-pink-600 hover:text-pink-700 text-sm font-medium"
        >
          View Club →
        </Link>
      </div>
    </div>
  );
}