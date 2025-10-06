import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

// Define the base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the auth state
    const token = (getState() as RootState).auth.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Student',
    'Faculty',
    'Course',
    'Attendance',
    'Exam',
    'Timetable',
    'Fee',
    'Book',
    'Placement',
    'Hostel',
    'Transport',
    'Notification',
    'Leave',
    'Dashboard',
    'Report'
  ],
  endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {
  usePrefetch,
} = api;

