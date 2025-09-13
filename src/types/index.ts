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
    leader?: {
      name: string
      email: string
    }
    advisor?: {
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
  clubName?: string
  applicant: {
    name: string
    grade: string
    email: string
  }
  answers: {
    motivation: string
    experience?: string
    availability: string[]
  }
  submittedAt: string
  updatedAt?: string
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected'
}

export interface User {
  name: string
  email: string
  grade: string
}
