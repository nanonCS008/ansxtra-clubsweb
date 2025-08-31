'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { clubs, events } from '@/data/mockData';
import { useUser } from '@/context/UserContext';
import StatusChip from '@/components/StatusChip';

interface ClubDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ClubDetailPage({ params }: ClubDetailPageProps) {
  const { user, addApplication } = useUser();
  const [activeTab, setActiveTab] = useState<'about' | 'events' | 'application'>('about');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    grade: user?.grade || '',
    reason: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const club = clubs.find(c => c.slug === params.slug);
  if (!club) {
    notFound();
  }

  const clubEvents = events.filter(event => 
    event.title.toLowerCase().includes(club.name.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addApplication({
      clubId: club.id,
      clubName: club.name,
      studentName: formData.name,
      grade: formData.grade,
      reason: formData.reason
    });

    setShowSuccess(true);
    setFormData({ name: '', grade: '', reason: '' });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const tabs = [
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'application', label: 'Application', icon: '✍️' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Club Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="relative h-64 bg-gradient-to-br from-pink-100 to-purple-100">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-5xl">
                {club.name.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            {club.isOpenForApplications ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Open for Applications
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Applications Closed
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{club.name}</h1>
              <p className="text-gray-600 text-lg">{club.description}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {club.category}
              </span>
              <p className="text-sm text-gray-500 mt-2">{club.memberCount} members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About {club.name}</h3>
              <p className="text-gray-600 leading-relaxed">{club.description}</p>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              {clubEvents.length > 0 ? (
                <div className="space-y-4">
                  {clubEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📅 {event.date}</span>
                        <span>🕐 {event.time}</span>
                        <span>📍 {event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming events for this club.</p>
              )}
            </div>
          )}

          {/* Application Tab */}
          {activeTab === 'application' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply to Join</h3>
              
              {!club.isOpenForApplications ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Applications Closed</h4>
                  <p className="text-gray-600">This club is not currently accepting new applications.</p>
                </div>
              ) : !user ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Please Log In</h4>
                  <p className="text-gray-600 mb-4">You need to be logged in to apply for clubs.</p>
                  <a
                    href="/auth"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                  >
                    Log In
                  </a>
                </div>
              ) : (
                <div>
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-800">
                            Application submitted successfully! You can track your application status in your dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Grade
                      </label>
                      <select
                        id="grade"
                        required
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select your grade</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                        Why do you want to join this club?
                      </label>
                      <textarea
                        id="reason"
                        required
                        rows={4}
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Tell us about your interest in this club and what you hope to contribute..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md transition-all transform hover:scale-105"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}