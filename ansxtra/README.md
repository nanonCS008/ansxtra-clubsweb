# ANSxtra - Amnuaysilpa School Clubs Platform

A modern, visually appealing demo website for Amnuaysilpa School where students can browse clubs and apply to join.

## 🎨 Design Features

- **School Colors**: Uses the official school colors (Pink #EF5DA8, Purple #6C47FF, Blue #2AA3FF)
- **Modern UI**: Clean, card-based layout with smooth animations and hover effects
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Professional Look**: Polished design that reflects the school's brand

## 🚀 Features

### For Students
- **Browse Clubs**: View all available clubs with search and filter functionality
- **Club Details**: Detailed information about each club including events
- **Apply to Join**: Submit applications with name, grade, and reason for joining
- **Track Applications**: Monitor application status (Submitted, In Review, Accepted, Rejected)
- **Dashboard**: Personal dashboard showing applications and memberships

### Mock Data
- **6 Demo Clubs**: UNICEF, Interact, Model United Nations, Moot Court, Operation Smile, Sports
- **Application Statuses**: Real-time status tracking
- **Events**: Sample events for each club

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Authentication**: Mock login system (localStorage-based)

## 📱 Pages

- `/` → Redirects to `/clubs`
- `/clubs` → Grid of club cards with search and filters
- `/clubs/[slug]` → Individual club detail page with tabs (About, Events, Application)
- `/me` → Student dashboard (requires authentication)
- `/auth` → Login page (only accepts @student.amnuaysilpa.ac.th emails)

## 🚀 Getting Started

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

### Demo Login

Since this is a demo website, you can use any email ending with `@student.amnuaysilpa.ac.th`:

- `student@student.amnuaysilpa.ac.th`
- `john.doe@student.amnuaysilpa.ac.th`
- `any.name@student.amnuaysilpa.ac.th`

## 🎯 Usage

1. **Browse Clubs**: Visit `/clubs` to see all available clubs
2. **Search & Filter**: Use the search bar and category filter to find specific clubs
3. **View Details**: Click on any club card to see detailed information
4. **Apply**: If a club is open for applications, fill out the application form
5. **Track Progress**: Check your dashboard at `/me` to monitor application statuses

## 🎨 Customization

### Colors
The school colors are defined in `tailwind.config.ts`:
- Pink: `#EF5DA8`
- Purple: `#6C47FF` 
- Blue: `#2AA3FF`

### Adding New Clubs
Edit `src/data/mockData.ts` to add more clubs or modify existing ones.

### Styling
All components use Tailwind CSS classes and can be easily customized in their respective files.

## 📁 Project Structure

```
ansxtra/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context for state management
│   ├── data/               # Mock data and types
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Club Cards
- Beautiful gradient backgrounds
- Status badges (Open/Closed for applications)
- Hover effects and animations
- Category tags and member counts

### Application System
- Form validation
- Success messages
- Status tracking
- User-friendly interface

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤝 Contributing

This is a demo project, but feel free to:
- Report bugs
- Suggest improvements
- Fork and modify for your own use

## 📄 License

This project is created for demonstration purposes for Amnuaysilpa School.

---

**Built with ❤️ for Amnuaysilpa School**
