import { AppDispatch } from '../types/types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';

export const handleSelectClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  setFilter: (value: React.SetStateAction<string>) => void,
  setDisplay: (value: React.SetStateAction<boolean>) => void,
  dispatch: AppDispatch,
  setSliceFilter:
    | ActionCreatorWithPayload<string, 'filters/setSorting'>
    | ActionCreatorWithPayload<string, 'filters/setCategories'>
) => {
  if (!(e.target instanceof HTMLElement)) return;
  setFilter(e.target.id);
  setDisplay(false);
  dispatch(setSliceFilter(e.target.id));
};
