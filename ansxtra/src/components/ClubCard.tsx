'use client';

import Link from 'next/link';
import { Club } from '@/types';

interface ClubCardProps {
  club: Club;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {club.name.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {club.isOpenForApplications ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Open for Applications
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Applications Closed
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
              {club.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {club.category}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {club.shortDescription}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{club.memberCount} members</span>
            <div className="flex items-center space-x-1 text-pink-500 group-hover:text-pink-600 transition-colors">
              <span>Learn more</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}