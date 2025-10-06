import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../app/api';
import { LoginRequest, LoginResponse, RefreshTokenRequest, ChangePasswordRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../../types/api';

// Mock data for development
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@aicas.edu',
    fullName: 'Administrator',
    role: 'Master Admin',
    departmentId: '1',
    institutionId: '1',
    centreId: '1',
    permissions: ['*'],
  },
  {
    id: '2',
    username: 'student1',
    email: 'student1@aicas.edu',
    fullName: 'John Doe',
    role: 'Student',
    departmentId: '1',
    institutionId: '1',
    centreId: '1',
    permissions: ['view_own_profile', 'view_own_attendance'],
  },
  {
    id: '3',
    username: 'faculty1',
    email: 'faculty1@aicas.edu',
    fullName: 'Dr. Jane Smith',
    role: 'Faculty',
    departmentId: '1',
    institutionId: '1',
    centreId: '1',
    permissions: ['view_students', 'mark_attendance'],
  },
  {
    id: '4',
    username: 'principal',
    email: 'principal@aicas.edu',
    fullName: 'Dr. Principal Head',
    role: 'Principal',
    departmentId: '1',
    institutionId: '1',
    centreId: '1',
    permissions: ['view_all_profiles', 'manage_academic_calendar'],
  },
];

// Mock delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        try {
          // Simulate API delay
          await delay(1000);
          
          // Mock authentication logic
          const user = mockUsers.find(
            u => u.username === credentials.username
          );
          
          if (!user) {
            return {
              error: {
                status: 401,
                data: { message: 'Invalid credentials' }
              }
            };
          }
          
          // In a real app, you would verify the password here
          if (credentials.password !== 'password') {
            return {
              error: {
                status: 401,
                data: { message: 'Invalid credentials' }
              }
            };
          }
          
          const response: LoginResponse = {
            user,
            token: `mock-jwt-token-${user.id}`,
            refreshToken: `mock-refresh-token-${user.id}`,
            expiresIn: 3600,
          };
          
          return { data: response };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),

    // Refresh token endpoint
    refreshToken: builder.mutation<{ token: string; refreshToken: string }, RefreshTokenRequest>({
      queryFn: async (request) => {
        try {
          await delay(500);
          
          // Mock refresh token validation
          if (!request.refreshToken.startsWith('mock-refresh-token-')) {
            return {
              error: {
                status: 401,
                data: { message: 'Invalid refresh token' }
              }
            };
          }
          
          const userId = request.refreshToken.split('-').pop();
          const response = {
            token: `mock-jwt-token-${userId}`,
            refreshToken: `mock-refresh-token-${userId}`,
          };
          
          return { data: response };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
    }),

    // Change password endpoint
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      queryFn: async (request) => {
        try {
          await delay(1000);
          
          // Mock password change logic
          if (request.currentPassword !== 'password') {
            return {
              error: {
                status: 400,
                data: { message: 'Current password is incorrect' }
              }
            };
          }
          
          return {
            data: { message: 'Password changed successfully' }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
    }),

    // Forgot password endpoint
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      queryFn: async (request) => {
        try {
          await delay(1000);
          
          // Mock email validation
          const user = mockUsers.find(u => u.email === request.email);
          
          if (!user) {
            return {
              error: {
                status: 404,
                data: { message: 'Email not found' }
              }
            };
          }
          
          return {
            data: { message: 'Password reset email sent successfully' }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
    }),

    // Reset password endpoint
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      queryFn: async (request) => {
        try {
          await delay(1000);
          
          // Mock token validation
          if (!request.token || request.token !== 'valid-reset-token') {
            return {
              error: {
                status: 400,
                data: { message: 'Invalid or expired reset token' }
              }
            };
          }
          
          return {
            data: { message: 'Password reset successfully' }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
    }),

    // Logout endpoint
    logout: builder.mutation<{ message: string }, void>({
      queryFn: async () => {
        try {
          await delay(500);
          
          return {
            data: { message: 'Logged out successfully' }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),

    // Get current user profile
    getCurrentUser: builder.query<any, void>({
      queryFn: async () => {
        try {
          await delay(500);
          
          // In a real app, you would get the user from the JWT token
          const user = mockUsers[0]; // Default to admin for demo
          
          return { data: user };
        } catch (error) {
          return {
            error: {
              status: 401,
              data: { message: 'Unauthorized' }
            }
          };
        }
      },
      providesTags: ['User'],
    }),

    // Update user profile
    updateProfile: builder.mutation<any, Partial<any>>({
      queryFn: async (updates) => {
        try {
          await delay(1000);
          
          // Mock profile update
          const updatedUser = {
            ...mockUsers[0],
            ...updates,
          };
          
          return { data: updatedUser };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Internal server error' }
            }
          };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi;

