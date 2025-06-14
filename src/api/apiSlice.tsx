import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IBookArg,
  IFilteredBooksArgs,
  IBook,
  IBooksItem,
} from "../types/types";
import { apiKey } from "./api";
import { v4 as uuidv4 } from "uuid";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1",
    method: "GET",
    headers: {},
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksItem[], IFilteredBooksArgs>({
      query: ({ search, categories, orderBy, offset, maxResults }) => ({
        url: `/volumes?q=${search}+intitle=${categories}&orderBy=${orderBy}&maxResults=${maxResults}&startIndex=${offset}&key=${apiKey}`,
      }),
      providesTags: ["Books"],
      transformResponse: (response: any) => {
        const data = response.items?.map((item: any) => ({
          author: item.volumeInfo?.authors,
          img: item.volumeInfo?.imageLinks?.thumbnail,
          category: item.volumeInfo?.categories,
          title: item.volumeInfo?.title,
          id: uuidv4(),
          description: item.volumeInfo?.description,
          ids: item?.id,
          totalItems: response.totalItems,
        }));

        return data;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData) => {
        if (responseData) currentCacheData.push(...responseData);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getBook: builder.query<IBook, IBookArg>({
      query: ({ ids }) => ({
        url: `/volumes/${ids}?key=${apiKey}`,
      }),
      transformResponse: (response: any) => {
        const data = {
          authors: response.volumeInfo?.authors,
          description: response.volumeInfo?.description,
          img: response.volumeInfo.imageLinks?.small,
          pageCount: response.volumeInfo?.pageCount,
          publishedDate: response.volumeInfo?.publishedDate,
          title: response.volumeInfo?.title,
          publisher: response.volumeInfo?.publisher,
          bookLink: response.volumeInfo?.previewLink,
          categories: response.volumeInfo?.categories,
          printType: response.volumeInfo?.printType,
          contentVersion: response.volumeInfo?.contentVersion,
          language: response.volumeInfo?.language,
        };
        return data;
      },
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = apiSlice;
