# ANSxtra - Amnuaysilpa School Extracurricular Portal

A modern, responsive web application for students to explore and apply to extracurricular clubs at Amnuaysilpa School.

## 🎨 Features

### Core Functionality
- **Club Directory**: Browse and search through available extracurricular clubs
- **Club Details**: View comprehensive information about each club including events, advisors, and leaders
- **Application System**: Submit applications to open clubs with a simple form
- **Student Dashboard**: Track applications and memberships
- **Authentication**: Secure login with school email validation

### Design & User Experience
- **Modern UI**: Clean, card-based design with smooth animations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **School Branding**: Uses official school colors (Pink #EF5DA8, Purple #6C47FF, Blue #2AA3FF)
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript for type safety
- **State Management**: React Context API
- **Authentication**: Mock authentication system (ready for backend integration)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/             # Authentication page
│   ├── clubs/            # Clubs directory and detail pages
│   ├── me/               # Student dashboard
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Root page (redirects to /clubs)
├── components/            # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── ClubCard.tsx      # Club display card
│   ├── StatusBadge.tsx   # Application status indicator
│   ├── ApplicationForm.tsx # Club application form
│   └── EmptyState.tsx    # Empty state placeholders
├── contexts/              # React contexts
│   └── AuthContext.tsx   # Authentication state management
├── data/                  # Mock data files
│   ├── clubs.json        # Club information
│   └── students.json     # Student and application data
├── lib/                   # Utility functions
│   └── data.ts           # Data management functions
└── types/                 # TypeScript type definitions
    └── index.ts          # Application types and interfaces
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ansxtra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Account

For testing purposes, use the following demo account:
- **Email**: `650123@student.amnuaysilpa.ac.th`
- **Student ID**: 650123
- **Name**: Pattaraporn Srisai

This account has one existing application to the Model United Nations club.

## 📱 Available Routes

- **`/`** → Redirects to `/clubs`
- **`/clubs`** → Main clubs directory with search and filtering
- **`/clubs/[slug]`** → Individual club detail page
- **`/auth`** → Login page
- **`/me`** → Student dashboard (requires authentication)

## 🎯 Key Components

### ClubCard
Displays club information in an attractive card format with:
- Club logo/initial
- Name and description
- Tags and member count
- Open/closed status badge

### ApplicationForm
Simple application form with:
- Full name input
- Grade selection (7-12)
- Reason for joining (minimum 50 characters)
- Form validation and error handling

### StatusBadge
Visual status indicators for applications:
- Submitted (Blue)
- In Review (Yellow)
- Accepted (Green)
- Rejected (Red)

## 🎨 Design System

### Color Palette
- **Primary Pink**: #EF5DA8
- **Primary Purple**: #6C47FF
- **Primary Blue**: #2AA3FF
- **Neutral Grays**: Subtle backgrounds and borders
- **Status Colors**: Green for success, red for errors, etc.

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Semibold, Bold
- **Hierarchy**: Clear heading levels with consistent spacing

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Tab-based interfaces with active states

## 🔧 Customization

### Adding New Clubs
Edit `src/data/clubs.json` to add new clubs with the following structure:
```json
{
  "id": "unique-id",
  "slug": "club-slug",
  "name": "Club Name",
  "description": "Full description...",
  "shortDescription": "Brief description...",
  "tags": ["Category1", "Category2"],
  "type": "student_led",
  "isOpen": true,
  "memberCount": 15,
  "coverImageUrl": "/images/club-cover.jpg",
  "meetingInfo": "Meeting schedule...",
  "advisors": ["Advisor Name"],
  "leaders": ["Leader Name"],
  "events": [...]
}
```

### Modifying School Colors
Update the custom colors in `tailwind.config.ts`:
```typescript
colors: {
  'school-pink': '#EF5DA8',
  'school-purple': '#6C47FF',
  'school-blue': '#2AA3FF',
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables
No environment variables are required for the demo version. For production, consider adding:
- Database connection strings
- Authentication service keys
- API endpoints

## 🔮 Future Enhancements

- **Backend Integration**: Replace mock data with real database
- **Real Authentication**: Implement proper user authentication
- **Admin Panel**: Club management for administrators
- **Notifications**: Email/SMS notifications for application updates
- **File Uploads**: Support for application attachments
- **Mobile App**: React Native companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for Amnuaysilpa School. All rights reserved.

## 🆘 Support

For technical support or questions about the application, please contact the development team.

---

**Built with ❤️ for Amnuaysilpa School**