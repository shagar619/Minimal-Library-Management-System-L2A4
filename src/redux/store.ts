import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";


export const store = configureStore({
     reducer: {
          [baseApi.reducerPath]: baseApi.reducer
          // [booksApi.reducerPath]: booksApi.reducer,
          // [borrowsApi.reducerPath]: borrowsApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(
          baseApi.middleware
          // booksApi.middleware,
          // borrowsApi.middleware
     ),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;