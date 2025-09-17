import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: ['Book', 'Issue'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    searchBooks: builder.query<Book[], string>({
      query: (searchTerm) => `/books?q=${searchTerm}`,
      providesTags: ['Book'],
    }),
    getBooksByCategory: builder.query<Book[], string>({
      query: (category) => `/books?category=${category}`,
      providesTags: ['Book'],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    issueBook: builder.mutation({
      query: ({ bookId, studentId }) => ({
        url: `/books/${bookId}/issue`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Book', 'Issue'],
    }),
    returnBook: builder.mutation({
      query: ({ bookId, studentId }) => ({
        url: `/books/${bookId}/return`,
        method: 'POST',
        body: { studentId },
      }),
      invalidatesTags: ['Book', 'Issue'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useSearchBooksQuery,
  useGetBooksByCategoryQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useIssueBookMutation,
  useReturnBookMutation,
} = libraryApi;