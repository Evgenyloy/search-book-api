import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  categories: string;
  sorting: string;
  search: string;
  ids: string;
  totalBooks: number | string;
  offset: number;
}

const initialState: IInitialState = {
  categories: 'all',
  sorting: 'relevance',
  search: '',
  ids: '',
  totalBooks: '',
  offset: 0,
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
    setOffset: (state, action: PayloadAction<number | undefined>) => {
      state.offset = action.payload === 0 ? action.payload : state.offset + 20;
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
  setOffset,
} = actions;
