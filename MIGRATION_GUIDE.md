# Migration Guide: Context API to Redux Toolkit & RTK Query

## Overview

This document outlines the major changes made to restructure the repository following industry standards and prepare for RTK Query integration.

## Major Changes

### 1. State Management Migration

**Before**: React Context API
- AuthContext
- ThemeContext
- NavigationContext

**After**: Redux Toolkit
- Redux store with slices
- RTK Query for API calls
- Type-safe hooks

### 2. Folder Structure Reorganization

**New Structure**:
```
src/
├── config/          # App configuration
├── features/        # Feature modules
├── layouts/         # Layout components
├── shared/          # Shared components
├── store/           # Redux store
│   ├── api/        # RTK Query services
│   └── slices/     # Redux slices
├── types/           # TypeScript types
│   ├── models/     # Domain models
│   ├── api/        # API types
│   └── forms/      # Form types
└── utils/           # Utilities
```

### 3. API Integration with RTK Query

Created dedicated API services:
- `baseApi.ts` - Base configuration
- `studentApi.ts` - Student endpoints
- `facultyApi.ts` - Faculty endpoints
- `academicsApi.ts` - Academic endpoints
- `hostelApi.ts` - Hostel endpoints
- `libraryApi.ts` - Library endpoints
- `placementApi.ts` - Placement endpoints
- `examinationApi.ts` - Examination endpoints

### 4. TypeScript Enhancements

- Comprehensive type definitions
- Strict type checking
- Domain models for all entities
- API response types
- Form validation types

### 5. Removed Dependencies

- json-server (replaced with RTK Query)
- concurrently (no longer needed)
- heroicons duplicate entry

### 6. Added Dependencies

- @reduxjs/toolkit
- react-redux
- @types/react-redux
- prettier

## Migration Steps for Developers

### 1. Update Import Paths

```typescript
// Before
import { useAuth } from './contexts/AuthContext';

// After
import { useAuth } from './features/auth/hooks/useAuth';
```

### 2. Use Redux Hooks

```typescript
// Before
const { user, login } = useAuth();

// After
import { useAppSelector } from './store/hooks';
const user = useAppSelector(state => state.auth.user);
```

### 3. API Calls with RTK Query

```typescript
// Before
const fetchStudents = async () => {
  const response = await fetch('/api/students');
  const data = await response.json();
  setStudents(data);
};

// After
import { useGetStudentsQuery } from './store/api/studentApi';
const { data: students, isLoading, error } = useGetStudentsQuery();
```

### 4. Update Component Locations

- Common components: `src/shared/`
- Layout components: `src/layouts/`
- Feature components: `src/features/[feature-name]/`

## Benefits of the New Structure

1. **Scalability**: Feature-based modules make it easy to add new features
2. **Type Safety**: Comprehensive TypeScript coverage
3. **Performance**: RTK Query provides caching and optimistic updates
4. **Developer Experience**: Better organization and discoverability
5. **Testing**: Easier to test with Redux DevTools
6. **Code Splitting**: Feature modules can be lazy loaded

## Next Steps

1. Connect to actual backend APIs
2. Implement authentication with JWT
3. Add error boundaries
4. Set up CI/CD pipeline
5. Add comprehensive testing
6. Implement data caching strategies

## Common Issues and Solutions

### Issue: Module not found errors
**Solution**: Update import paths to match new structure

### Issue: TypeScript errors
**Solution**: Use the new type definitions from `src/types`

### Issue: API calls not working
**Solution**: Configure environment variables in `.env`

### Issue: State not persisting
**Solution**: Redux state persists to localStorage for auth

## Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)