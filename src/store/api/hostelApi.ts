import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hostelApi = createApi({
  reducerPath: 'hostelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOSTEL_API_URL || 'http://localhost:5000',
  }),
  tagTypes: ['Room', 'Complaint', 'Leave', 'Hostel'],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => '/rooms',
      providesTags: ['Room'],
    }),
    getRoomById: builder.query({
      query: (id) => `/rooms/${id}`,
      providesTags: (result, error, id) => [{ type: 'Room', id }],
    }),
    getComplaints: builder.query({
      query: () => '/complaints',
      providesTags: ['Complaint'],
    }),
    getLeaveApplications: builder.query({
      query: () => '/leaveApplications',
      providesTags: ['Leave'],
    }),
    createComplaint: builder.mutation({
      query: (complaint) => ({
        url: '/complaints',
        method: 'POST',
        body: complaint,
      }),
      invalidatesTags: ['Complaint'],
    }),
    updateComplaintStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/complaints/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Complaint', id }],
    }),
    createLeaveApplication: builder.mutation({
      query: (leave) => ({
        url: '/leaveApplications',
        method: 'POST',
        body: leave,
      }),
      invalidatesTags: ['Leave'],
    }),
    updateLeaveStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/leaveApplications/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Leave', id }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useGetComplaintsQuery,
  useGetLeaveApplicationsQuery,
  useCreateComplaintMutation,
  useUpdateComplaintStatusMutation,
  useCreateLeaveApplicationMutation,
  useUpdateLeaveStatusMutation,
} = hostelApi;