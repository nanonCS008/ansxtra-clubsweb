import clubsData from '@/data/clubs.json';
import studentsData from '@/data/students.json';
import { Club, Student, Application, ApplicationFormData } from '@/types';

// Get all clubs
export function getAllClubs(): Club[] {
  return clubsData;
}

// Get club by slug
export function getClubBySlug(slug: string): Club | undefined {
  return clubsData.find(club => club.slug === slug);
}

// Get filtered clubs
export function getFilteredClubs(
  searchQuery: string = '',
  statusFilter: 'all' | 'open' | 'closed' = 'all',
  categoryFilter: string = 'all'
): Club[] {
  let filtered = clubsData;

  // Filter by status
  if (statusFilter === 'open') {
    filtered = filtered.filter(club => club.isOpen);
  } else if (statusFilter === 'closed') {
    filtered = filtered.filter(club => !club.isOpen);
  }

  // Filter by category
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(club => club.tags.includes(categoryFilter));
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(club =>
      club.name.toLowerCase().includes(query) ||
      club.shortDescription.toLowerCase().includes(query) ||
      club.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}

// Get all students
export function getAllStudents(): Student[] {
  return studentsData;
}

// Get student by email
export function getStudentByEmail(email: string): Student | undefined {
  return studentsData.find(student => student.email === email);
}

// Get student by student ID
export function getStudentById(studentId: string): Student | undefined {
  return studentsData.find(student => student.studentId === studentId);
}

// Submit application
export function submitApplication(
  clubId: string,
  formData: ApplicationFormData,
  studentEmail: string
): Application | null {
  const student = getStudentByEmail(studentEmail);
  if (!student) return null;

  const club = clubsData.find(c => c.id === clubId);
  if (!club) return null;

  const newApplication: Application = {
    id: Date.now().toString(),
    clubId,
    clubName: club.name,
    clubSlug: club.slug,
    status: 'Submitted',
    submittedAt: new Date().toISOString(),
    reason: formData.reason,
    fullName: formData.fullName,
    grade: formData.grade,
  };

  // In a real app, this would update the database
  // For demo purposes, we'll just return the new application
  return newApplication;
}

// Get all available tags
export function getAllTags(): string[] {
  const allTags = new Set<string>();
  clubsData.forEach(club => {
    club.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// Get all available categories for filtering
export function getAvailableCategories(): string[] {
  return getAllTags();
}