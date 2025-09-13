'use client'

import { clsx } from 'clsx'
import { Search, Users, FileX } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  icon?: 'search' | 'users' | 'file' | React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  className?: string
}

export default function EmptyState({ 
  icon = 'search', 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const icons = {
    search: Search,
    users: Users,
    file: FileX,
  }

  const IconComponent = typeof icon === 'string' ? icons[icon] : null

  return (
    <div className={clsx('text-center py-12 px-4', className)}>
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {IconComponent ? (
          <IconComponent className="w-12 h-12 text-gray-400" />
        ) : (
          icon
        )}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
