import Link from 'next/link'
import Image from 'next/image'
import { Club } from '@/types'

interface ClubCardProps {
  club: Club
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <div className="card hover:-translate-y-1 transition-all duration-300 overflow-hidden relative h-full flex flex-col">
      {!club.acceptingApplications && (
        <div className="absolute top-5 -right-8 bg-red-500 text-white px-12 py-1 transform rotate-45 text-sm font-bold shadow-md z-10">
          FULL
        </div>
      )}
      
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative">
        {club.image && (
          <img 
            src={club.image} 
            alt={club.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{club.name}</h3>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {club.type}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {club.category}
            </span>
            {club.acceptingApplications ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Accepting
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Full
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-3 flex-1 mb-4">{club.description}</p>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            <div className="font-semibold text-purple-600">{club.meeting.day}</div>
            <div>{club.meeting.time}</div>
            <div>{club.meeting.location}</div>
          </div>
          <Link href={`/clubs/${club.id}`} className="btn btn-primary text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
