import { Club, Application } from '@/types'

// Feature flag to switch between local JSON and API
const USE_API = false
const API_BASE_URL = '/api'

export async function getClubs(): Promise<Club[]> {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/clubs`)
    if (!response.ok) throw new Error('Failed to fetch clubs')
    return response.json()
  } else {
    const response = await fetch('/data/clubs.json')
    if (!response.ok) throw new Error('Failed to fetch clubs')
    return response.json()
  }
}

export async function getClubById(id: string): Promise<Club> {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/clubs/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Club not found')
      }
      throw new Error('Failed to fetch club')
    }
    return response.json()
  } else {
    const clubs = await getClubs()
    const club = clubs.find(c => c.id === id)
    if (!club) {
      throw new Error('Club not found')
    }
    return club
  }
}

export async function getApplications(email: string): Promise<Application[]> {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/applications?email=${encodeURIComponent(email)}`)
    if (!response.ok) throw new Error('Failed to fetch applications')
    return response.json()
  } else {
    // Get from localStorage
    if (typeof window === 'undefined') return []
    
    const stored = localStorage.getItem('ansxtra_applications')
    if (!stored) return []
    
    try {
      const allApplications: Application[] = JSON.parse(stored)
      const userApplications = allApplications.filter(app => app.applicant.email === email)
      
      // Enhance with club names
      const clubs = await getClubs()
      return userApplications.map(app => {
        const club = clubs.find(c => c.id === app.clubId)
        return {
          ...app,
          clubName: club ? club.name : 'Unknown Club'
        }
      })
    } catch (error) {
      console.error('Error parsing applications:', error)
      return []
    }
  }
}

export async function createApplication(payload: Omit<Application, 'id' | 'submittedAt' | 'status'>): Promise<Application> {
  if (USE_API) {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to submit application')
    }
    
    return response.json()
  } else {
    // Save to localStorage
    if (typeof window === 'undefined') {
      throw new Error('Cannot create application on server side')
    }
    
    const stored = localStorage.getItem('ansxtra_applications')
    const applications: Application[] = stored ? JSON.parse(stored) : []
    
    // Check for existing application
    const existingIndex = applications.findIndex(
      app => app.clubId === payload.clubId && app.applicant.email === payload.applicant.email
    )
    
    const newApplication: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...payload,
      submittedAt: new Date().toISOString(),
      status: 'Submitted'
    }
    
    if (existingIndex !== -1) {
      applications[existingIndex] = newApplication
    } else {
      applications.push(newApplication)
    }
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(applications))
    
    // Get club name for response
    try {
      const club = await getClubById(payload.clubId)
      return {
        ...newApplication,
        clubName: club.name
      }
    } catch {
      return newApplication
    }
  }
}

export async function updateApplicationStatus(applicationId: string, newStatus: Application['status']): Promise<Application> {
  if (USE_API) {
    throw new Error('Status updates not available via API in demo mode')
  } else {
    if (typeof window === 'undefined') {
      throw new Error('Cannot update application on server side')
    }
    
    const stored = localStorage.getItem('ansxtra_applications')
    if (!stored) throw new Error('Application not found')
    
    const applications: Application[] = JSON.parse(stored)
    const appIndex = applications.findIndex(app => app.id === applicationId)
    
    if (appIndex === -1) throw new Error('Application not found')
    
    applications[appIndex].status = newStatus
    applications[appIndex].updatedAt = new Date().toISOString()
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(applications))
    return applications[appIndex]
  }
}

export async function deleteApplication(applicationId: string): Promise<boolean> {
  if (USE_API) {
    throw new Error('Application withdrawal not available via API in demo mode')
  } else {
    if (typeof window === 'undefined') {
      throw new Error('Cannot delete application on server side')
    }
    
    const stored = localStorage.getItem('ansxtra_applications')
    if (!stored) return false
    
    const applications: Application[] = JSON.parse(stored)
    const filteredApplications = applications.filter(app => app.id !== applicationId)
    
    if (applications.length === filteredApplications.length) {
      return false
    }
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(filteredApplications))
    return true
  }
}

export async function checkExistingApplication(clubId: string, email: string): Promise<Application | null> {
  const applications = await getApplications(email)
  return applications.find(app => app.clubId === clubId) || null
}

export function getNextStatus(currentStatus: Application['status']): Application['status'] {
  const statusProgression = {
    'Submitted': 'Under Review' as const,
    'Under Review': 'Accepted' as const,
    'Accepted': 'Rejected' as const,
    'Rejected': 'Submitted' as const
  }
  
  return statusProgression[currentStatus] || 'Submitted'
}
