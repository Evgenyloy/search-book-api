import store from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IFilteredBooksArgs {
  search: string;
  orderBy: string;
  subject: string;
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
  categories: string;
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
  author: string[] | undefined;
  category: string[] | undefined;
  description?: string | undefined;
  id?: string;
  img: string;
  title: string;
  ids: string;
  totalItems: number;
}

export type TSelectCategoriesProps = {
  categoryDisplay: boolean;
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TSelectSortingProps = {
  sortDisplay: boolean;
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};
