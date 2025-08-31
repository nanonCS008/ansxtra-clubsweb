import { Club, Event, User } from '@/types';

export const clubs: Club[] = [
  {
    id: '1',
    slug: 'unicef',
    name: 'UNICEF',
    description: 'Join UNICEF to make a difference in children\'s lives worldwide. We focus on advocacy, fundraising, and community service projects that support UNICEF\'s mission.',
    shortDescription: 'Advocating for children\'s rights and supporting UNICEF\'s global mission through local initiatives.',
    coverImage: '/images/unicef.jpg',
    isOpenForApplications: true,
    category: 'Community Service',
    memberCount: 45
  },
  {
    id: '2',
    slug: 'interact',
    name: 'Interact',
    description: 'Interact is Rotary International\'s service club for young people. We develop leadership skills while serving our community through various projects.',
    shortDescription: 'Leadership development through community service and international understanding.',
    coverImage: '/images/interact.jpg',
    isOpenForApplications: true,
    category: 'Leadership',
    memberCount: 38
  },
  {
    id: '3',
    slug: 'model-united-nations',
    name: 'Model United Nations',
    description: 'Experience international diplomacy through Model UN. Learn about global issues, practice public speaking, and develop critical thinking skills.',
    shortDescription: 'Simulate UN conferences and develop diplomatic skills through debate and negotiation.',
    coverImage: '/images/mun.jpg',
    isOpenForApplications: false,
    category: 'Academic',
    memberCount: 52
  },
  {
    id: '4',
    slug: 'moot-court',
    name: 'Moot Court',
    description: 'Compete in simulated court proceedings. Develop legal reasoning, public speaking, and analytical skills through mock trials.',
    shortDescription: 'Practice legal advocacy through simulated court proceedings and competitions.',
    coverImage: '/images/moot-court.jpg',
    isOpenForApplications: true,
    category: 'Academic',
    memberCount: 28
  },
  {
    id: '5',
    slug: 'operation-smile',
    name: 'Operation Smile',
    description: 'Support children with cleft lip and palate through fundraising, awareness campaigns, and volunteer work.',
    shortDescription: 'Helping children with cleft lip and palate through fundraising and awareness.',
    coverImage: '/images/operation-smile.jpg',
    isOpenForApplications: true,
    category: 'Community Service',
    memberCount: 33
  },
  {
    id: '6',
    slug: 'sports',
    name: 'Sports',
    description: 'Join our sports club to stay active, build teamwork skills, and participate in various athletic activities and competitions.',
    shortDescription: 'Stay active and build teamwork through various sports and athletic activities.',
    coverImage: '/images/sports.jpg',
    isOpenForApplications: false,
    category: 'Athletics',
    memberCount: 67
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'UNICEF Fundraising Gala',
    description: 'Annual fundraising event to support children in need worldwide.',
    date: '2024-03-15',
    time: '18:00',
    location: 'School Auditorium'
  },
  {
    id: '2',
    title: 'Interact Community Cleanup',
    description: 'Monthly community service project to keep our neighborhood clean.',
    date: '2024-03-20',
    time: '09:00',
    location: 'Local Park'
  },
  {
    id: '3',
    title: 'MUN Conference',
    description: 'Annual Model United Nations conference with schools from across the region.',
    date: '2024-04-10',
    time: '08:00',
    location: 'Conference Center'
  },
  {
    id: '4',
    title: 'Moot Court Competition',
    description: 'Intra-school moot court competition to practice legal advocacy.',
    date: '2024-03-25',
    time: '14:00',
    location: 'School Library'
  },
  {
    id: '5',
    title: 'Operation Smile Awareness Day',
    description: 'Raising awareness about cleft lip and palate conditions.',
    date: '2024-04-05',
    time: '12:00',
    location: 'School Courtyard'
  },
  {
    id: '6',
    title: 'Sports Tournament',
    description: 'Annual inter-class sports tournament featuring various athletic competitions.',
    date: '2024-04-15',
    time: '08:00',
    location: 'School Sports Complex'
  }
];

export const sampleUser: User = {
  id: '1',
  email: 'student@amnuaysilpa.ac.th',
  name: 'John Doe',
  grade: 'Grade 11',
  applications: [
    {
      id: '1',
      clubId: '1',
      clubName: 'UNICEF',
      studentName: 'John Doe',
      grade: 'Grade 11',
      reason: 'I want to make a positive impact on children\'s lives and learn about global issues.',
      status: 'In Review',
      appliedAt: '2024-03-01'
    }
  ],
  memberships: []
};