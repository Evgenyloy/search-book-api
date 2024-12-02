import store from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IFilteredBooksArgs {
  search: string;
  orderBy: string;
  subject: string;
}
