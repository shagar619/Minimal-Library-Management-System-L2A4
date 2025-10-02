import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
     reducerPath: 'baseApi',
     baseQuery: fetchBaseQuery({
          baseUrl: 'http://localhost:5000/books'
     }),
     tagTypes: ['base'],
     endpoints: (builder) => ({

          addQuiz: builder.mutation({
               query: (body) => ({
                    url: '/books',
                    method: 'POST',
                    body
               }),
               invalidatesTags: ['base']
          }),

          getAllQuiz: builder.query({
               query: () => '/books',
               providesTags: ['base']
          })
     }),
});

export const { useGetAllQuizQuery, useAddQuizMutation } = baseApi;