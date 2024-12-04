import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBooksItem } from '../components/booksItem/BooksItem';

interface IInitialState {
  categories: string;
  sorting: string;
  search: string;
  ids: string;
  totalBooks: number | string;
  skipFetch: boolean;
  loadingStatus: boolean;
  booksData: IBooksItem[];
}

const initialState: IInitialState = {
  categories: 'all',
  sorting: 'relevance',
  search: '',
  ids: '',
  totalBooks: '',
  skipFetch: true,
  loadingStatus: false,
  booksData: [],
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    setSearching: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIds: (state, action: PayloadAction<string>) => {
      state.ids = action.payload;
    },
    setTotalBooks: (state, action: PayloadAction<number | ''>) => {
      state.totalBooks = action.payload;
    },
    setSkipFetch: (state, action: PayloadAction<boolean>) => {
      state.skipFetch = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setBooksData: (state, action: PayloadAction<IBooksItem[]>) => {
      state.booksData.push(...action.payload);
    },
    deleteBooksData: (state) => {
      state.booksData = [];
    },
  },
});

const { reducer, actions } = slice;
export default reducer;
export const {
  setCategories,
  setSorting,
  setSearching,
  setIds,
  setTotalBooks,
  setSkipFetch,
  setLoadingStatus,
  setBooksData,
  deleteBooksData,
} = actions;
