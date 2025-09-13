export interface Club {
  id: string
  name: string
  type: 'Teacher-run' | 'Student-led'
  category: string
  image: string
  description: string
  whatYouDo: string[]
  meeting: {
    day: string
    time: string
    location: string
  }
  contacts: {
    leader: {
      name: string
      email: string
    }
    advisor: {
      name: string
      email: string
    }
  }
  acceptingApplications: boolean
  faq: Array<{
    q: string
    a: string
  }>
}

export interface Application {
  id: string
  clubId: string
  clubName: string
  studentName: string
  studentEmail: string
  studentId: string
  grade: string
  motivation: string
  experience: string
  commitment: string
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected'
  submittedAt: string
  updatedAt: string
}

export interface FilterOptions {
  search: string
  day: string
  type: string
  category: string
  accepting: string
}

export interface FormErrors {
  [key: string]: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
}

export interface User {
  name: string
  email: string
  grade: string
}
