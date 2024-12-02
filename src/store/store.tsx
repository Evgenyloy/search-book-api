import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import book from '../slices/slice';

const store = configureStore({
  reducer: { book, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
