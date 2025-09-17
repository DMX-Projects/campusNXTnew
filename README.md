# College Management System

A modern, scalable college management system built with React, TypeScript, Redux Toolkit, and RTK Query.

## 🏗️ Project Structure

```
src/
├── config/          # Application configuration and constants
├── features/        # Feature-based modules
│   ├── auth/       # Authentication module
│   ├── students/   # Student management
│   ├── faculty/    # Faculty management
│   ├── academics/  # Academic management
│   └── ...         # Other feature modules
├── layouts/        # Layout components
├── shared/         # Shared/common components
├── store/          # Redux store configuration
│   ├── api/       # RTK Query API services
│   └── slices/    # Redux slices
├── types/          # TypeScript type definitions
│   ├── models/    # Domain models
│   ├── api/       # API types
│   └── forms/     # Form types
├── utils/          # Utility functions
└── routes/         # Route configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Other Commands

- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview production build

## 🏛️ Architecture

### State Management

The application uses Redux Toolkit for state management with the following slices:
- **Auth Slice**: User authentication and authorization
- **Theme Slice**: Dark/light mode management
- **Navigation Slice**: Sidebar and navigation state

### API Integration

RTK Query is used for API calls with separate endpoints for:
- Student Management
- Faculty Management
- Academic Services
- Examination System
- Library Management
- Hostel Management
- Placement Services

### Feature-Based Structure

Each feature module contains:
- Components specific to that feature
- Hooks for business logic
- Local utilities and helpers
- Feature-specific types

### Type Safety

The project uses TypeScript throughout with:
- Strict type checking
- Comprehensive type definitions
- Type-safe API calls with RTK Query

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_HOSTEL_API_URL=http://localhost:5000

# Environment
VITE_ENV=development

# Feature Flags
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_DEBUG=false
```

### Constants

Application constants are defined in `src/config/constants.ts`:
- User roles
- Route paths
- API endpoints
- Status types
- Date formats

## 📦 Dependencies

### Core Dependencies
- React 18
- TypeScript 5
- Redux Toolkit
- React Router v7
- Tailwind CSS

### UI Libraries
- Heroicons
- Lucide React
- Framer Motion
- Recharts
- React Big Calendar

## 🔒 Authentication

The application supports multiple user roles:
- Student
- Faculty
- HOD (Head of Department)
- Principal
- Admin
- Librarian
- Warden
- Parent
- Dean
- Chairperson
- TPO (Training & Placement Officer)
- Lab Assistant
- Accountant
- Security
- Maintenance

Each role has specific permissions and access to different modules.

## 🛠️ Development Guidelines

### Code Style
- Use functional components with hooks
- Follow the feature-based folder structure
- Keep components small and focused
- Use TypeScript for all new code
- Follow the established naming conventions

### State Management
- Use RTK Query for API calls
- Keep Redux store normalized
- Use selectors for derived state
- Implement proper loading and error states

### Testing
- Write unit tests for utilities
- Test Redux slices and reducers
- Mock API calls in tests
- Aim for good test coverage

## 📝 License

This project is proprietary and confidential.

## 🤝 Contributing

Please follow the established patterns and conventions when contributing to this project.