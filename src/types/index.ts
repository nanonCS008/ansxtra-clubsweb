export interface Club {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  tags: string[];
  type: 'student_led' | 'teacher_led';
  isOpen: boolean;
  memberCount: number;
  coverImageUrl: string;
  meetingInfo: string;
  advisors: string[];
  leaders: string[];
  events: ClubEvent[];
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Student {
  id: string;
  email: string;
  studentId: string;
  fullName: string;
  grade: string;
  applications: Application[];
  memberships: Membership[];
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  clubSlug: string;
  status: 'Submitted' | 'In Review' | 'Accepted' | 'Rejected';
  submittedAt: string;
  reason: string;
  fullName: string;
  grade: string;
}

export interface Membership {
  id: string;
  clubId: string;
  clubName: string;
  clubSlug: string;
  role: 'Member' | 'Leader' | 'Advisor';
  joinedAt: string;
}

export interface ApplicationFormData {
  fullName: string;
  grade: string;
  reason: string;
}

export interface AuthSession {
  studentId: string;
  email: string;
  fullName: string;
  isAuthenticated: boolean;
}