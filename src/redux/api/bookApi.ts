import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
     _id: string; // MongoDB uses _id, not id
     title: string;
     author: string;
     genre: string;
     isbn: string;
     description?: string;
     copies: number;
     available: boolean;
     createdAt: string;
     updatedAt: string;
}

export interface CreateBookRequest {
     title: string;
     author: string;
     genre: string;
     isbn: string;
     description?: string;
     copies: number;
     available?: boolean;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> { 
     id: string;
}

// API Response Types from your backend
interface ApiResponse<T> {
     success: boolean;
     message: string;
     book?: T;
     books?: T[];
     created?: T;
     updated?: T;
     _id?: string;
}

// API base URL
const API_BASE_URL = 'http://localhost:5000';

export const booksApi = createApi({
     reducerPath: 'booksApi',
     baseQuery: fetchBaseQuery({
          baseUrl: API_BASE_URL,
     }),
     tagTypes: ['Book'],
     endpoints: (builder) => ({
          
          // GET all books
          getBooks: builder.query<Book[], void>({
               query: () => '/books', // This will call http://localhost:5000/books
               providesTags: (result) =>
                    result
                         ? [
                              ...result.map(({ _id }) => ({ type: 'Book' as const, id: _id })),
                              { type: 'Book', id: 'LIST' },
                         ]
                         : [{ type: 'Book', id: 'LIST' }],
               transformResponse: (response: ApiResponse<Book>): Book[] => {
                    return response.books || [];
               },
          }),

          // GET single book by ID
          getBook: builder.query<Book, string>({
               query: (id) => `/books/${id}`, // This will call http://localhost:5000/books/:id
               providesTags: (result, error, id) => [{ type: 'Book', id }],
               transformResponse: (response: ApiResponse<Book>): Book => {
                    return response.book!;
               },
          }),

          // POST create book
          createBook: builder.mutation<Book, CreateBookRequest>({
               query: (newBook) => ({
                    url: '/books',
                    method: 'POST',
                    body: newBook,
               }),
               invalidatesTags: [{ type: 'Book', id: 'LIST' }],
               transformResponse: (response: ApiResponse<Book>): Book => {
                    return response.created!;
               },
          }),

          // PUT update book
          updateBook: builder.mutation<Book, UpdateBookRequest >({
               query: ({ id, ...patch }) => ({
                    url: `/books/${id}`,
                    method: 'PUT',
                    body: patch,
               }),
               invalidatesTags: (result, error, { id }) => [
                    { type: 'Book', id },
                    { type: 'Book', id: 'LIST' },
               ],
               transformResponse: (response: ApiResponse<Book>): Book => {
                    return response.updated!;
               },
          }),

          // DELETE book
          deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
               query: (id) => ({
                    url: `/books/${id}`,
                    method: 'DELETE',
               }),
               invalidatesTags: (result, error, id) => [
                    { type: 'Book', id },
                    { type: 'Book', id: 'LIST' },
               ],
               transformResponse: (response: ApiResponse<Book>) => ({
                    success: response.success,
                    id: response._id || '',
               }),
          }),
     }),
});

export const {
     useGetBookQuery,
     useGetBooksQuery,
     useCreateBookMutation,
     useUpdateBookMutation,
     useDeleteBookMutation,
} = booksApi;