'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { ToastMessage } from '@/types'

interface ToastProps extends ToastMessage {
  onClose: (id: string) => void
}

export default function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Wait for animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, id, onClose])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const Icon = icons[type]

  return (
    <div
      className={clsx(
        'flex items-center p-4 mb-3 rounded-lg shadow-lg transition-all duration-300 transform',
        'border-l-4',
        {
          'bg-green-50 border-green-400 text-green-800': type === 'success',
          'bg-red-50 border-red-400 text-red-800': type === 'error',
          'bg-blue-50 border-blue-400 text-blue-800': type === 'info',
          'translate-x-0 opacity-100': isVisible,
          'translate-x-full opacity-0': !isVisible,
        }
      )}
    >
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(id), 300)
        }}
        className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastMessage[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
