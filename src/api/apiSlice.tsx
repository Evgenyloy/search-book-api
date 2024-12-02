import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBooksItem } from '../components/booksItem/BooksItem';
import { IFilteredBooksArgs } from '../types/types';

const apikey = 'AIzaSyA8lwTxYCrpmhOV078A5TESHVDRm6zpgOQ';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1',
    method: 'GET',
    headers: {},
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksItem[], IFilteredBooksArgs>({
      query: ({ search, subject, orderBy }) => ({
        url: `/volumes?q=${search}+subject=${subject}&orderBy=${orderBy}&key=AIzaSyA8lwTxYCrpmhOV078A5TESHVDRm6zpgOQ`,
      }),
      transformResponse: (response: any, meta, arg) => {
        console.log(response);

        const data = response.items?.map((item: any, index: any) => ({
          author: item.volumeInfo?.authors,
          img: item.volumeInfo?.imageLinks?.thumbnail,
          category: item.volumeInfo?.categories,
          title: item.volumeInfo?.title,
          id: item.id,
          description: item.volumeInfo?.description,
        }));

        return data;
      },
    }),
  }),
});

export const { useGetBooksQuery } = apiSlice;
