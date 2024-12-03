import store from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IFilteredBooksArgs {
  search: string;
  orderBy: string;
  subject: string;
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
  saleInfo: string;
  categories: string;
  printType: string;
  contentVersion: string;
  language: string;
}

export type Ref = HTMLDivElement;
export type Props = {
  sortDisplay: boolean;
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};
