import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  categories: string;
  sorting: string;
  search: string;
  ids: string;
}

const initialState: IInitialState = {
  categories: 'all',
  sorting: 'relevance',
  search: '',
  ids: '',
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
  },
});

const { reducer, actions } = slice;
export default reducer;
export const { setCategories, setSorting, setSearching, setIds } = actions;
