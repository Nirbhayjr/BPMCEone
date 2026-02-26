# 🎓 BPMCEOne - Campus Management Platform

<div align="center">
  <img src="public/logo.png" alt="BPMCE Logo" width="120" height="120">
  <h3>Complete Digital Campus Solution for BPMCE Madhepura</h3>
  <p>Streamlining campus life with AI-powered features, real-time tracking, and seamless student services</p>
</div>

---

## 📋 Overview

**BPMCEOne** is a comprehensive campus management and student support platform designed specifically for BP Mandal College of Engineering (BPMCE), Madhepura. Built with modern web technologies, it provides students with a unified dashboard to manage academics, track attendance, submit complaints, access resources, and stay connected with campus life.

### ✨ Key Highlights

- 🎯 **All-in-One Platform**: Single dashboard for all campus needs
- 📊 **Smart Attendance Tracking**: Routine-based system with health indicators
- 📝 **Anonymous Complaints**: Privacy-focused complaint management
- 📚 **Resource Library**: PYQ uploads, Notes Vault, and academic materials
- 🔐 **Secure & Private**: All data stored locally in browser
- 🎨 **Modern UI/UX**: Dark mode with glassmorphism design
- 📱 **Responsive Design**: Works seamlessly on all devices

---

## 🚀 Features

### 📚 Academic Management
- **AI Study Planner**: Personalized study schedules powered by AI
- **Attendance Tracker**: 
  - Weekly routine setup with subject scheduling
  - Daily attendance marking (Present/Absent)
  - Real-time percentage calculation
  - Health status indicators (Green ≥85%, Yellow 75-84%, Red <75%)
  - localStorage persistence
- **CGPA Calculator**: Advanced GPA/CGPA computation
- **Notes Vault**: Centralized repository for study materials
- **PYQ Section**: 
  - Upload previous year question papers
  - Filter by exam type, year, branch, semester, subject
  - PDF file support with validation
  - Contributor attribution

### 🎓 Student Services
- **Complaints System**:
  - Submit complaints with optional anonymity
  - Category-based organization (Academic, Infrastructure, Hostel, etc.)
  - Priority levels (Low, Medium, High, Critical)
  - Status tracking (Pending, In Progress, Resolved, Rejected)
  - Detailed complaint view with resolution updates
- **Campus Safety**: 24/7 emergency support with SOS features
- **Lost & Found**: AI-powered item matching for lost belongings
- **Notices Board**: Stay updated with campus announcements
- **Alumni Network**: Connect with alumni for career guidance
- **Career Guidance**: AI-driven career recommendations
- **Wellness Center**: Mental health and wellness resources

### 🔐 Authentication & User Management
- **Secure Sign Up/Sign In**: Local authentication system
- **User Profiles**: Role-based access (Student/Admin)
- **Session Management**: Persistent login with auto-redirect
- **Demo Account**: Pre-configured demo credentials for testing

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Glassmorphism** - Modern frosted glass UI design

### State & Routing
- **React Router v6** - Client-side routing with protected routes
- **Context API** - Global state management (AuthContext)
- **LocalStorage** - Persistent data storage

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **bun** package manager
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/Nirbhayjr/BPMCEone.git

# 2. Navigate to project directory
cd BPMCEone

# 3. Install dependencies
npm install
# or using bun
bun install

# 4. Start development server
npm run dev
# or using bun
bun run dev

# 5. Open your browser
# Visit: http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

The production-ready files will be in the `dist/` folder.

---

## 🎮 Usage Guide

### First Time Setup

1. **Sign Up**:
   - Navigate to `/onboarding` or click "Get Started"
   - Fill in your details (Name, Roll Number, Branch, Gender, Hometown)
   - Create a password
   - Optionally upload your class routine

2. **Sign In**:
   - Use your roll number and password
   - **Demo Account**: 
     - Roll Number: `24118128006`
     - Password: `7488754178`

### Key Features Usage

#### Attendance Tracking
1. Click "Setup Routine" on the Attendance page
2. Add subjects with their weekly schedule
3. Mark daily attendance (Present/Absent buttons)
4. View attendance percentages and health status

#### Submit Complaints
1. Navigate to Complaints section
2. Toggle "Submit Anonymously" if needed
3. Fill in title, description, category, and priority
4. Track complaint status in the dashboard

#### Upload PYQs
1. Go to PYQ section
2. Click "Upload PYQ"
3. Fill in exam details (type, year, branch, semester, subject)
4. Upload PDF file
5. Submit (your details auto-populate as uploader)

---

## 📁 Project Structure

```
BPMCEone/
├── public/                      # Static assets
│   ├── logo.png                # College logo
│   ├── campus-bg.jpg           # Background images
│   └── ...
├── src/
│   ├── components/             # React components
│   │   ├── layout/            # Layout components
│   │   │   ├── AppSidebar.tsx # Fixed sidebar navigation
│   │   │   ├── Navbar.tsx     # Top navigation bar
│   │   │   └── DashboardLayout.tsx
│   │   ├── ui/                # shadcn/ui components
│   │   └── ProtectedRoute.tsx # Route guard
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication state
│   ├── pages/                 # Page components
│   │   ├── LandingPage.tsx    # Homepage
│   │   ├── Onboarding.tsx     # Sign up/Sign in
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Attendance.tsx     # Attendance tracker
│   │   ├── Complaints.tsx     # Complaints system
│   │   ├── PYQs.tsx          # PYQ repository
│   │   └── ...
│   ├── lib/                   # Utilities
│   │   ├── utils.ts          # Helper functions
│   │   └── theme.ts          # Theme management
│   ├── hooks/                 # Custom hooks
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🎨 Design System

### Color Palette
- **Deep Navy**: `#0A1022` - Background
- **Royal Blue**: `#1E3A8A` - Primary
- **Gold**: `#FBBF24` - Accent
- **Green**: `#10B981` - Attendance/Success
- **Red**: `#EF4444` - Safety/Critical
- **Yellow**: `#F59E0B` - Warnings

### Theme
- **Dark Mode**: Default theme with glassmorphism effects
- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Animations**: Smooth transitions powered by Framer Motion

---

## 🔒 Data Privacy

- ✅ All user data stored locally in browser's `localStorage`
- ✅ No backend server or external database
- ✅ Data never leaves your device
- ✅ Anonymous complaint submission option
- ✅ No third-party analytics or tracking

### LocalStorage Keys
- `campusone_user` - User profile data
- `campusone_session` - Active session flag
- `campusone_routine` - Weekly routine schedule
- `campusone_attendance` - Attendance records
- `campusone_complaints` - Submitted complaints
- `campusone_pyqs` - Uploaded question papers

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Use Tailwind CSS for styling
- Add comments for complex logic
- Test features thoroughly before PR

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Nirbhay Kumar**
- GitHub: [@Nirbhayjr](https://github.com/Nirbhayjr)
- Roll Number: 24118128006
- Branch: 3D Animation & Gaming
- College: BPMCE Madhepura

---

## 🙏 Acknowledgments

- **BPMCE Madhepura** - For the opportunity to build this platform
- **shadcn/ui** - For the amazing component library
- **Lovable** - For the initial project scaffold
- All contributors and testers

---

## 📞 Support

For issues, questions, or suggestions:
- 🐛 [Report a Bug](https://github.com/Nirbhayjr/BPMCEone/issues)
- 💡 [Request a Feature](https://github.com/Nirbhayjr/BPMCEone/issues)
- 📧 Email: [Contact Developer]

---

<div align="center">
  <p>Built with ❤️ for BPMCE students</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
