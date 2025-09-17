import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Student } from '../../types';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => '/students',
      providesTags: ['Student'],
    }),
    getStudentById: builder.query<Student, string>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    createStudent: builder.mutation<Student, Partial<Student>>({
      query: (student) => ({
        url: '/students',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation<Student, { id: string; data: Partial<Student> }>({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentsByDepartment: builder.query<Student[], string>({
      query: (department) => `/students?department=${department}`,
      providesTags: ['Student'],
    }),
    searchStudents: builder.query<Student[], string>({
      query: (searchTerm) => `/students?q=${searchTerm}`,
      providesTags: ['Student'],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsByDepartmentQuery,
  useSearchStudentsQuery,
} = studentApi;