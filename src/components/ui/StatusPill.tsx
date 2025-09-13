'use client'

import { clsx } from 'clsx'
import { Application } from '@/types'

interface StatusPillProps {
  status: Application['status']
  className?: string
}

const statusConfig = {
  'submitted': {
    label: 'Submitted',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  'under-review': {
    label: 'Under Review',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  'accepted': {
    label: 'Accepted',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  'rejected': {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
} as const

export default function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
