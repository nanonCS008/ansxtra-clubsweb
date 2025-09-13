'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getClubById, createApplication, checkExistingApplication } from '@/lib/data'
import { Club, Application } from '@/types'
import { InputField, TextareaField, SelectField } from '@/components/ui/FormField'
import Button from '@/components/ui/Button'
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

// Validation schema
const applicationSchema = z.object({
  studentName: z.string().min(1, 'Full name is required'),
  studentEmail: z.string()
    .email('Please enter a valid email address')
    .refine(email => email.endsWith('@student.amnuaysilpa.ac.th'), 
      'Email must end with @student.amnuaysilpa.ac.th'),
  studentId: z.string().min(1, 'Student ID is required'),
  grade: z.string().min(1, 'Grade level is required'),
  motivation: z.string()
    .min(50, 'Please provide at least 50 characters explaining your motivation')
    .max(1000, 'Motivation cannot exceed 1000 characters'),
  experience: z.string()
    .max(1000, 'Experience cannot exceed 1000 characters'),
  commitment: z.string()
    .min(30, 'Please provide at least 30 characters about your commitment')
    .max(500, 'Commitment cannot exceed 500 characters'),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function ApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [club, setClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [existingApplication, setExistingApplication] = useState<Application | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const motivationLength = watch('motivation')?.length || 0
  const experienceLength = watch('experience')?.length || 0
  const commitmentLength = watch('commitment')?.length || 0

  useEffect(() => {
    if (params.slug) {
      loadClubAndCheckExisting(params.slug as string)
    }
  }, [params.slug])

  async function loadClubAndCheckExisting(clubId: string) {
    try {
      const clubData = await getClubById(clubId)
      setClub(clubData)

      // Check for existing application (using demo email for now)
      const demoEmail = 'demo@student.amnuaysilpa.ac.th'
      const existing = await checkExistingApplication(clubId, demoEmail)
      setExistingApplication(existing)
    } catch (error) {
      console.error('Error loading club:', error)
      setError('Club not found or not accepting applications')
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(data: ApplicationFormData) {
    if (!club) return

    setSubmitting(true)
    setError('')

    try {
      const applicationData = {
        clubId: club.id,
        applicant: {
          name: data.studentName,
          email: data.studentEmail,
          grade: data.grade,
        },
        answers: {
          motivation: data.motivation,
          experience: data.experience,
          availability: [club.meeting.day],
        },
      }

      await createApplication(applicationData)
      router.push('/apply/confirmation')
    } catch (error) {
      console.error('Error submitting application:', error)
      setError('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !club) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Unable to Apply</h2>
          <p className="text-gray-600 mb-6">{error || 'Club not found'}</p>
          <Link href="/clubs">
            <Button>Browse Clubs</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!club.acceptingApplications) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Applications Closed</h2>
          <p className="text-gray-600 mb-6">
            {club.name} is currently not accepting new applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/clubs/${club.id}`}>
              <Button variant="secondary">View Club Details</Button>
            </Link>
            <Link href="/clubs">
              <Button>Browse Other Clubs</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (existingApplication) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Application Already Submitted</h2>
          <p className="text-gray-600 mb-6">
            You have already submitted an application to {club.name}. 
            Check your application status in your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/applications">
              <Button>View My Applications</Button>
            </Link>
            <Link href="/clubs">
              <Button variant="secondary">Browse Other Clubs</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/clubs/${club.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Club
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Apply to {club.name}</h1>
              <p className="text-gray-600">Fill out the form below to submit your application</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  required
                  {...register('studentName')}
                  error={errors.studentName?.message}
                  placeholder="Enter your full name"
                />
                
                <InputField
                  label="Student ID"
                  required
                  {...register('studentId')}
                  error={errors.studentId?.message}
                  placeholder="e.g., S2024001"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="School Email"
                  type="email"
                  required
                  {...register('studentEmail')}
                  error={errors.studentEmail?.message}
                  placeholder="your.name@student.amnuaysilpa.ac.th"
                  helpText="Must use your official school email address"
                />
                
                <SelectField
                  label="Grade Level"
                  required
                  options={[
                    { value: 'Grade 7', label: 'Grade 7' },
                    { value: 'Grade 8', label: 'Grade 8' },
                    { value: 'Grade 9', label: 'Grade 9' },
                    { value: 'Grade 10', label: 'Grade 10' },
                    { value: 'Grade 11', label: 'Grade 11' },
                    { value: 'Grade 12', label: 'Grade 12' },
                  ]}
                  value={watch('grade')}
                  onChange={(value) => register('grade').onChange({ target: { value } })}
                  error={errors.grade?.message}
                />
              </div>
            </div>

            {/* Application Questions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Application Questions</h2>
              
              <div className="space-y-4">
                <TextareaField
                  label="Why do you want to join this club?"
                  required
                  {...register('motivation')}
                  error={errors.motivation?.message}
                  placeholder="Tell us about your interest in this club and what you hope to gain from the experience..."
                  rows={4}
                  helpText={`${motivationLength}/1000 characters (minimum 50 required)`}
                />
                
                <TextareaField
                  label="Relevant Experience or Skills"
                  {...register('experience')}
                  error={errors.experience?.message}
                  placeholder="Describe any relevant experience, skills, or activities that relate to this club (optional)..."
                  rows={3}
                  helpText={`${experienceLength}/1000 characters`}
                />
                
                <TextareaField
                  label="Time Commitment"
                  required
                  {...register('commitment')}
                  error={errors.commitment?.message}
                  placeholder="How will you manage your time to participate actively in this club? What is your availability?"
                  rows={3}
                  helpText={`${commitmentLength}/500 characters (minimum 30 required)`}
                />
              </div>
            </div>

            {/* Club Information Reminder */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Meeting Schedule</h3>
              <div className="text-blue-800 space-y-1">
                <p><strong>Day:</strong> {club.meeting.day}s</p>
                <p><strong>Time:</strong> {club.meeting.time}</p>
                <p><strong>Location:</strong> {club.meeting.location}</p>
              </div>
              <p className="text-sm text-blue-700 mt-3">
                Please ensure you can attend regular meetings before submitting your application.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 justify-end">
              <Link href={`/clubs/${club.id}`}>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                loading={submitting}
                className="min-w-[140px]"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
