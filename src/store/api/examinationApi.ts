import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ExamResult, AttendanceRecord } from '../../types';

export const examinationApi = createApi({
  reducerPath: 'examinationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Exam', 'Result', 'Attendance'],
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => '/exams',
      providesTags: ['Exam'],
    }),
    getExamById: builder.query({
      query: (id) => `/exams/${id}`,
      providesTags: (result, error, id) => [{ type: 'Exam', id }],
    }),
    getExamResults: builder.query<ExamResult[], string>({
      query: (studentId) => `/results?studentId=${studentId}`,
      providesTags: ['Result'],
    }),
    getResultsByExam: builder.query<ExamResult[], string>({
      query: (examId) => `/results?examId=${examId}`,
      providesTags: ['Result'],
    }),
    createExam: builder.mutation({
      query: (exam) => ({
        url: '/exams',
        method: 'POST',
        body: exam,
      }),
      invalidatesTags: ['Exam'],
    }),
    updateExam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/exams/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Exam', id }],
    }),
    submitResults: builder.mutation({
      query: (results) => ({
        url: '/results',
        method: 'POST',
        body: results,
      }),
      invalidatesTags: ['Result'],
    }),
    getAttendance: builder.query<AttendanceRecord[], { studentId?: string; date?: string }>({
      query: ({ studentId, date }) => {
        const params = new URLSearchParams();
        if (studentId) params.append('studentId', studentId);
        if (date) params.append('date', date);
        return `/attendance?${params}`;
      },
      providesTags: ['Attendance'],
    }),
    markAttendance: builder.mutation({
      query: (attendance) => ({
        url: '/attendance',
        method: 'POST',
        body: attendance,
      }),
      invalidatesTags: ['Attendance'],
    }),
    updateAttendance: builder.mutation({
      query: ({ id, data }) => ({
        url: `/attendance/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useGetExamByIdQuery,
  useGetExamResultsQuery,
  useGetResultsByExamQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useSubmitResultsMutation,
  useGetAttendanceQuery,
  useMarkAttendanceMutation,
  useUpdateAttendanceMutation,
} = examinationApi;