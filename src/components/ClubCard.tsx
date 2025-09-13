import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin, Calendar } from 'lucide-react'
import { Club } from '@/types'

interface ClubCardProps {
  club: Club
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-brand-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Status Badge */}
      {!club.acceptingApplications && (
        <div className="absolute top-4 -right-8 bg-red-500 text-white px-10 py-1 transform rotate-45 text-xs font-bold shadow-md z-10">
          FULL
        </div>
      )}
      
      {/* Image */}
      <div className="h-48 bg-gradient-brand relative overflow-hidden">
        <Image
          src={club.image}
          alt={club.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to gradient background
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
            {club.name}
          </h3>
          
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {club.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {club.category}
            </span>
            {club.acceptingApplications ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Open
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Closed
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {club.description}
        </p>
        
        {/* Meeting Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span className="font-medium">{club.meeting.day}s</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span>{club.meeting.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-purple-500" />
            <span>{club.meeting.location}</span>
          </div>
        </div>
        
        {/* Action */}
        <div className="pt-4 border-t border-gray-100">
          <Link
            href={`/clubs/${club.id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-brand text-white font-medium rounded-lg hover:shadow-brand-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
