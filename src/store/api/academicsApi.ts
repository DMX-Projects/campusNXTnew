import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const academicsApi = createApi({
  reducerPath: 'academicsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Course', 'Timetable', 'Department'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses',
      providesTags: ['Course'],
    }),
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    getTimetables: builder.query({
      query: () => '/timetables',
      providesTags: ['Timetable'],
    }),
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Department'],
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: '/courses',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Course', id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetTimetablesQuery,
  useGetDepartmentsQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = academicsApi;