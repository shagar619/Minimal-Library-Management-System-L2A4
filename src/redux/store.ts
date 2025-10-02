import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./api/bookApi";


export const store = configureStore({
     reducer: {
          [booksApi.reducerPath]: booksApi.reducer,
          // [borrowsApi.reducerPath]: borrowsApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(
          booksApi.middleware,
          // borrowsApi.middleware
     ),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;