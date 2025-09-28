import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
     id: string;
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

interface IPost {
     userId: number;
     id: number;
     title: string;
     body: string;
}


export interface UpdateBookRequest extends Partial<CreateBookRequest> {
     id: string;
}

// Mock API base URL - replace with actual API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';


export const booksApi = createApi({
     reducerPath: 'booksApi',
     baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
     }),
     tagTypes: ['Book'],
     endpoints: (builder) => ({
     getBooks: builder.query<Book[], void>({
          query: () => '/posts',
          providesTags: ['Book'],
          // Transform mock data to match our Book interface
          transformResponse: (response: IPost[]): Book[] => {
          return response.slice(0, 20).map((post, index) => ({
          id: post.id.toString(),
          title: post.title,
          author: `Author ${index + 1}`,
          genre: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'][index % 5],
          isbn: `978-${Math.floor(Math.random() * 1000000000)}`,
          description: post.body,
          copies: Math.floor(Math.random() * 10) + 1,
          available: Math.random() > 0.2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
     }));
     },
     }),
     getBook: builder.query<Book, string>({
     query: (id) => `/posts/${id}`,
     providesTags: (result, error, id) => [{ type: 'Book', id }],
     transformResponse: (response: IPost): Book => ({
          id: response.id.toString(),
          title: response.title,
          author: `Author ${response.id}`,
          genre: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'][response.id % 5],
          isbn: `978-${Math.floor(Math.random() * 1000000000)}`,
          description: response.body,
          copies: Math.floor(Math.random() * 10) + 1,
          available: Math.random() > 0.2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
     }),
     }),
     createBook: builder.mutation<Book, CreateBookRequest>({
     query: (newBook) => ({
          url: '/posts',
          method: 'POST',
          body: newBook,
     }),
     invalidatesTags: ['Book'],
     transformResponse: (response: { id?: number }, meta, arg): Book => ({
          id: response.id?.toString() || Date.now().toString(),
          title: arg.title,
          author: arg.author,
          genre: arg.genre,
          isbn: arg.isbn,
          description: arg.description,
          copies: arg.copies,
          available: arg.available ?? true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
     }),
     }),
     updateBook: builder.mutation<Book, UpdateBookRequest>({
     query: ({ id, ...patch }) => ({
          url: `/posts/${id}`,
          method: 'PUT',
          body: patch,
     }),
     invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
     }),
     deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
     query: (id) => ({
          url: `/posts/${id}`,
          method: 'DELETE',
     }),
     invalidatesTags: ['Book'],
     }),
}),
});