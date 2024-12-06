import { AppDispatch } from '../types/types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';
import { setOffset } from '../slices/slice';
import { NavigateFunction } from 'react-router-dom';
import { apiSlice } from '../api/apiSlice';

export const handleSelectClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  setFilter: (value: React.SetStateAction<string>) => void,
  setDisplay: (value: React.SetStateAction<boolean>) => void,
  dispatch: AppDispatch,
  setSliceFilter:
    | ActionCreatorWithPayload<string, 'filters/setSorting'>
    | ActionCreatorWithPayload<string, 'filters/setCategories'>,
  search: string,
  pathname: string,
  navigate: NavigateFunction
) => {
  if (!(e.target instanceof HTMLElement)) return;
  if (pathname !== '/#/') {
    navigate('/');
  }
  dispatch(setOffset(0));
  dispatch(apiSlice.util.resetApiState());
  setFilter(e.target.id);
  setDisplay(false);
  dispatch(setSliceFilter(e.target.id));
};

export function handler(
  event: MouseEvent,
  selectSortingRef: React.MutableRefObject<null>,
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  selectCategoryRef: React.MutableRefObject<null>,
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (
    selectSortingRef.current &&
    !(selectSortingRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setSortDisplay(false);
  }

  if (
    selectCategoryRef.current &&
    !(selectCategoryRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setCategoryDisplay(false);
  }
}
