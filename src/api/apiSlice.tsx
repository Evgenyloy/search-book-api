import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBooksItem } from '../components/booksItem/booksItem';

interface IQueryRequest {
  items: {};
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1',
    method: 'GET',
    headers: {},
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksItem[], void>({
      query: (/* search, orderBy, subject */) => ({
        url: '/volumes?q=flowers+subject=art&orderBy=newest&key=',
      }),
      transformResponse: (response: any, meta, arg) => {
        const data = response.items?.map((item: any, index: any) => ({
          author: item.volumeInfo.authors[0],
          img: item.volumeInfo.imageLinks.thumbnail,
          category: item.volumeInfo.categories[0],
          title: item.volumeInfo.title,
          id: item.id,
          description: item.volumeInfo.description,
        }));

        return data;
      },
    }),
  }),
});

export const { useGetBooksQuery } = apiSlice;
