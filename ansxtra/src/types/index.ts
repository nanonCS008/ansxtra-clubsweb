export interface Club {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  isOpenForApplications: boolean;
  category: string;
  memberCount: number;
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  studentName: string;
  grade: string;
  reason: string;
  status: 'Submitted' | 'In Review' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  grade: string;
  applications: Application[];
  memberships: string[]; // club IDs
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}