'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Club, ApplicationFormData } from '@/types';
import { getClubBySlug, submitApplication } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import ApplicationForm from '@/components/ApplicationForm';
import Link from 'next/link';

type TabType = 'about' | 'events' | 'application';

export default function ClubDetailPage() {
  const params = useParams();
  const { session } = useAuth();
  const [club, setClub] = useState<Club | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const foundClub = getClubBySlug(params.slug as string);
      setClub(foundClub || null);
    }
  }, [params.slug]);

  const handleApplicationSubmit = async (formData: ApplicationFormData) => {
    if (!club || !session) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const application = submitApplication(club.id, formData, session.email);
    
    if (application) {
      setShowSuccess(true);
      setActiveTab('about');
    }
    
    setIsSubmitting(false);
  };

  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Club not found</h1>
          <p className="text-gray-600 mb-6">The club you're looking for doesn't exist.</p>
          <Link
            href="/clubs"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors"
          >
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Application submitted successfully!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Your application has been submitted and is now under review.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-400 hover:text-green-600"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">
                {club.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{club.shortDescription}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span className="text-sm text-gray-600">{club.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{club.meetingInfo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 capitalize">{club.type.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="mt-6 lg:mt-0 lg:ml-6">
              {club.isOpen ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-800">Open for Applications</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">Applications Closed</span>
                  </div>
                </div>
              )}
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
              { id: 'about', label: 'About' },
              { id: 'events', label: 'Events' },
              ...(club.isOpen && session ? [{ id: 'application', label: 'Apply' }] : []),
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
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{club.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Advisors</h3>
                  <ul className="space-y-2">
                    {club.advisors.map((advisor, index) => (
                      <li key={index} className="text-gray-600">{advisor}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Student Leaders</h3>
                  <ul className="space-y-2">
                    {club.leaders.map((leader, index) => (
                      <li key={index} className="text-gray-600">{leader}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              {club.events.length > 0 ? (
                <div className="space-y-4">
                  {club.events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events scheduled.</p>
              )}
            </div>
          )}

          {/* Application Tab */}
          {activeTab === 'application' && session && club.isOpen && (
            <ApplicationForm
              clubName={club.name}
              onSubmit={handleApplicationSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Login Required Message */}
          {activeTab === 'application' && !session && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Login Required</h3>
              <p className="text-sm text-gray-500 mb-6">
                Please log in with your school email to apply to this club.
              </p>
              <Link
                href="/auth"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}