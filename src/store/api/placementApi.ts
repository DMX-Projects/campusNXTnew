import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Placement } from '../../types';

export const placementApi = createApi({
  reducerPath: 'placementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Placement', 'Application'],
  endpoints: (builder) => ({
    getPlacements: builder.query<Placement[], void>({
      query: () => '/placements',
      providesTags: ['Placement'],
    }),
    getPlacementById: builder.query<Placement, string>({
      query: (id) => `/placements/${id}`,
      providesTags: (result, error, id) => [{ type: 'Placement', id }],
    }),
    getUpcomingPlacements: builder.query<Placement[], void>({
      query: () => '/placements?status=upcoming',
      providesTags: ['Placement'],
    }),
    createPlacement: builder.mutation<Placement, Partial<Placement>>({
      query: (placement) => ({
        url: '/placements',
        method: 'POST',
        body: placement,
      }),
      invalidatesTags: ['Placement'],
    }),
    updatePlacement: builder.mutation<Placement, { id: string; data: Partial<Placement> }>({
      query: ({ id, data }) => ({
        url: `/placements/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Placement', id }],
    }),
    deletePlacement: builder.mutation<void, string>({
      query: (id) => ({
        url: `/placements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Placement'],
    }),
    applyForPlacement: builder.mutation({
      query: ({ placementId, studentId }) => ({
        url: `/placements/${placementId}/apply`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Placement', 'Application'],
    }),
    getApplicationStatus: builder.query({
      query: ({ placementId, studentId }) => 
        `/placements/${placementId}/applications/${studentId}`,
      providesTags: ['Application'],
    }),
  }),
});

export const {
  useGetPlacementsQuery,
  useGetPlacementByIdQuery,
  useGetUpcomingPlacementsQuery,
  useCreatePlacementMutation,
  useUpdatePlacementMutation,
  useDeletePlacementMutation,
  useApplyForPlacementMutation,
  useGetApplicationStatusQuery,
} = placementApi;