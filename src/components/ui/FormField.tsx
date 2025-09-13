'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface BaseFieldProps {
  label: string
  error?: string
  helpText?: string
  required?: boolean
  className?: string
}

// Input Field
interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helpText, required, className, ...props }, ref) => {
    return (
      <div className={clsx('space-y-1', className)}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <input
          ref={ref}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
            'placeholder-gray-400',
            {
              'border-gray-300': !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error,
            }
          )}
          {...props}
        />
        
        {helpText && !error && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

// Textarea Field
interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, helpText, required, className, rows = 4, ...props }, ref) => {
    return (
      <div className={clsx('space-y-1', className)}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <textarea
          ref={ref}
          rows={rows}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors resize-vertical',
            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
            'placeholder-gray-400',
            {
              'border-gray-300': !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': error,
            }
          )}
          {...props}
        />
        
        {helpText && !error && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

TextareaField.displayName = 'TextareaField'

// Select Field
interface SelectFieldProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function SelectField({ 
  label, 
  error, 
  helpText, 
  required, 
  className, 
  options, 
  value, 
  onChange,
  placeholder = 'Select an option...'
}: SelectFieldProps) {
  return (
    <div className={clsx('space-y-1', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
          'bg-white',
          {
            'border-gray-300': !error,
            'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500': error,
          }
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
