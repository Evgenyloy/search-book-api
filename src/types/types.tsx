import store from "../store/store";
import { apiSlice } from "../api/apiSlice";

export interface RootState {
  book: IInitialState;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}
export type AppDispatch = typeof store.dispatch;

export interface IFilteredBooksArgs {
  search: string;
  orderBy: string;
  categories: string;
  offset: number;
  maxResults: number;
}

export interface IBookArg {
  ids: string;
}

export interface IBook {
  authors: string[];
  description: string;
  img: string;
  pageCount: number;
  publishedDate: string;
  title: string;
  publisher: string;
  bookLink: string;
  categories: string[];
  printType: string;
  contentVersion: string;
  language: string;
}

export type Ref = HTMLDivElement;

export interface IBooksProps {
  props: {
    books: IBooksItem[];
    isSuccess: boolean;
    isFetching: boolean;
    isError: boolean;
  };
}

export interface IHeaderProps {
  props: {
    setSkip: React.Dispatch<React.SetStateAction<boolean>>;
    isFetching: boolean;
  };
}

export interface IBooksItem {
  id: string;
  ids: string;
  title: string;
  author: string[];
  img: string;
  category: string[];
  description: string;
  totalItems?: number;
}

export type TSelectCategoriesProps = {
  categoryDisplay: boolean;
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TSelectSortingProps = {
  sortDisplay: boolean;
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface IInitialState {
  categories: string;
  sorting: string;
  search: string;
  ids: string;
  totalBooks: number;
  offset: number;
}

export interface GoogleBookResponse {
  volumeInfo: {
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
    pageCount?: number;
    publishedDate?: string;
    title?: string;
    publisher?: string;
    previewLink?: string;
    categories?: string[];
    printType?: string;
    contentVersion?: string;
    language?: string;
  };
}

export interface GoogleBooksResponse {
  items?: Array<{
    id: string;
    volumeInfo: {
      authors?: string[];
      imageLinks?: { thumbnail?: string };
      categories?: string[];
      title?: string;
      description?: string;
    };
  }>;
  totalItems?: number;
}
