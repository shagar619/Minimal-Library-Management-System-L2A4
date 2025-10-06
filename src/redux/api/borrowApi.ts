

// ==========================
// Types
// ==========================

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BorrowRequest {
     bookId: string;
     quantity: number;
     dueDate: string;  // ISO string (e.g., 2025-10-10)
}

export interface Borrow {
     _id: string;
     bookId: string;
     bookTitle: string;
     isbn: string;
     quantity: number;
     dueDate: string;
     borrowedAt: string;
}

export interface BorrowSummary {
     bookTitle: string;
     isbn: string;
     totalQuantityBorrowed: number;
}

// API Response wrapper
interface ApiResponse<T> {
     success: boolean;
     message: string;
     borrow?: T;
     borrows?: T[];
     created?: T;
     updated?: T;
     summary?: BorrowSummary[];
}

// ==========================
// API Base URL
// ==========================
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';





// ==========================
// RTK Query setup
// ==========================

export const borrowsApi = createApi({
     reducerPath: 'borrowsApi',
     baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
     tagTypes: ['Borrow'],
     endpoints: (builder) => ({
     // POST /borrows → borrow a book
     borrowBook: builder.mutation<Borrow, BorrowRequest>({
          query: (data) => ({
          url: '/borrows',
          method: 'POST',
          body: data,
     }),
     invalidatesTags: [{ type: 'Borrow', id: 'LIST' }],
     transformResponse: (response: ApiResponse<Borrow>): Borrow => {
          return response.created!;
     },
     }),

    // GET /borrows → all borrow records
    getBorrows: builder.query<Borrow[], void>({
      query: () => '/borrows',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Borrow' as const, id: _id })),
              { type: 'Borrow', id: 'LIST' },
            ]
          : [{ type: 'Borrow', id: 'LIST' }],
      transformResponse: (response: ApiResponse<Borrow>): Borrow[] => {
        return response.borrows || [];
      },
    }),

    // GET /borrows/summary → total borrowed by title
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrows/summary',
      providesTags: [{ type: 'Borrow', id: 'SUMMARY' }],
      transformResponse: (response: ApiResponse<BorrowSummary>): BorrowSummary[] => {
        return response.summary || [];
      },
    }),

    // PUT /borrows/:id → update borrow (e.g., mark as returned)
    updateBorrow: builder.mutation<Borrow, { id: string; data: Partial<BorrowRequest> }>({
      query: ({ id, data }) => ({
        url: `/borrows/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Borrow', id },
        { type: 'Borrow', id: 'LIST' },
      ],
      transformResponse: (response: ApiResponse<Borrow>): Borrow => {
        return response.updated!;
      },
    }),

    // DELETE /borrows/:id
    deleteBorrow: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/borrows/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Borrow', id },
        { type: 'Borrow', id: 'LIST' },
      ],
      transformResponse: (response: ApiResponse<Borrow>) => ({
        success: response.success,
        id: response.borrow?._id || '',
      }),
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowsQuery,
  useGetBorrowSummaryQuery,
  useUpdateBorrowMutation,
  useDeleteBorrowMutation,
} = borrowsApi;