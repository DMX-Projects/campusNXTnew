import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Faculty } from '../../types';

export const facultyApi = createApi({
  reducerPath: 'facultyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Faculty'],
  endpoints: (builder) => ({
    getFaculties: builder.query<Faculty[], void>({
      query: () => '/faculty',
      providesTags: ['Faculty'],
    }),
    getFacultyById: builder.query<Faculty, string>({
      query: (id) => `/faculty/${id}`,
      providesTags: (result, error, id) => [{ type: 'Faculty', id }],
    }),
    createFaculty: builder.mutation<Faculty, Partial<Faculty>>({
      query: (faculty) => ({
        url: '/faculty',
        method: 'POST',
        body: faculty,
      }),
      invalidatesTags: ['Faculty'],
    }),
    updateFaculty: builder.mutation<Faculty, { id: string; data: Partial<Faculty> }>({
      query: ({ id, data }) => ({
        url: `/faculty/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Faculty', id }],
    }),
    deleteFaculty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/faculty/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Faculty'],
    }),
    getFacultiesByDepartment: builder.query<Faculty[], string>({
      query: (department) => `/faculty?department=${department}`,
      providesTags: ['Faculty'],
    }),
  }),
});

export const {
  useGetFacultiesQuery,
  useGetFacultyByIdQuery,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useGetFacultiesByDepartmentQuery,
} = facultyApi;