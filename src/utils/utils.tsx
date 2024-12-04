import { AppDispatch } from '../types/types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';
import { setLoadingStatus, deleteBooksData } from '../slices/slice';
import { NavigateFunction } from 'react-router-dom';

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
  dispatch(deleteBooksData());
  if (!(e.target instanceof HTMLElement)) return;
  if (pathname !== '/#/') {
    navigate('/');
  }
  setFilter(e.target.id);
  setDisplay(false);
  dispatch(setSliceFilter(e.target.id));
  if (search) {
    dispatch(setLoadingStatus(true));
  }
};
