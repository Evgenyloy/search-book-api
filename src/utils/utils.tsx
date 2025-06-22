import { AppDispatch } from "../types/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";
import {
  setCategories,
  setOffset,
  setSearching,
  setSorting,
  setTotalBooks,
} from "../slices/slice";
import { NavigateFunction } from "react-router-dom";
import { apiSlice } from "../api/apiSlice";

export const handleSelectClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  setDisplay: (value: React.SetStateAction<boolean>) => void,
  dispatch: AppDispatch,
  setSliceFilter:
    | ActionCreatorWithPayload<string, "filters/setSorting">
    | ActionCreatorWithPayload<string, "filters/setCategories">,
  navigate: NavigateFunction
) => {
  if (!(e.target instanceof HTMLElement)) return;
  navigate("/");
  dispatch(setOffset(0));
  dispatch(apiSlice.util.resetApiState());
  setDisplay(false);
  dispatch(setSliceFilter(e.target.id));
};

export function clearAll(
  dispatch: AppDispatch,
  setSkip: (value: React.SetStateAction<boolean>) => void,
  setSearch: (value: React.SetStateAction<string>) => void,
  navigate: NavigateFunction
) {
  navigate("/");
  setSkip(true);
  setSearch("");
  dispatch(setOffset(0));
  dispatch(apiSlice.util.resetApiState());
  dispatch(setSearching(""));
  dispatch(setCategories("all"));
  dispatch(setSorting("relevance"));
  dispatch(setTotalBooks(0));
}

export function searchBook(
  dispatch: AppDispatch,
  setSkip: (value: React.SetStateAction<boolean>) => void,
  setSearch: (value: React.SetStateAction<string>) => void,
  search: string,
  navigate: NavigateFunction,
  bookLength: unknown | [] | undefined
) {
  navigate("/");
  setSkip(false);
  dispatch(setSearching(search));
  setSearch("");
  if (bookLength) {
    dispatch(apiSlice.util.resetApiState());
    dispatch(setOffset(0));
  }
}
