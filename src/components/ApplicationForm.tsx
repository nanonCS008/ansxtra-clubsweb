'use client';

import { useState } from 'react';
import { ApplicationFormData } from '@/types';

interface ApplicationFormProps {
  clubName: string;
  onSubmit: (data: ApplicationFormData) => void;
  isSubmitting?: boolean;
}

export default function ApplicationForm({ clubName, onSubmit, isSubmitting = false }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    grade: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.grade) {
      newErrors.grade = 'Please select your grade';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for joining';
    } else if (formData.reason.trim().length < 50) {
      newErrors.reason = 'Reason must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const grades = ['7', '8', '9', '10', '11', '12'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Apply to {clubName}
        </h3>
        <p className="text-gray-600 text-sm">
          Please fill out the form below to apply for membership in this club.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
              errors.fullName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Grade */}
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
            Grade *
          </label>
          <select
            id="grade"
            value={formData.grade}
            onChange={(e) => handleInputChange('grade', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
              errors.grade ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select your grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
          {errors.grade && (
            <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
          )}
        </div>

        {/* Reason for Joining */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Joining *
          </label>
          <textarea
            id="reason"
            rows={4}
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
              errors.reason ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Tell us why you want to join this club and what you hope to contribute..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.reason && (
              <p className="text-sm text-red-600">{errors.reason}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.reason.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}