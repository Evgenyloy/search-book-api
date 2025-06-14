import { useAppSelector, useAppDispatch } from "./hooks";
import { useState, useEffect } from "react";
import { useGetBooksQuery } from "../api/apiSlice";
import { setTotalBooks } from "../slices/slice";

export function useBooksQuery() {
  const dispatch = useAppDispatch();
  const offset = useAppSelector((state) => state.book.offset);
  const categories = useAppSelector((state) => state.book.categories);
  const orderBy = useAppSelector((state) => state.book.sorting);
  const search = useAppSelector((state) => state.book.search);
  const [maxResults, setMaxResults] = useState(20);
  const [skip, setSkip] = useState(true);
  const {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    data: books = [],
  } = useGetBooksQuery(
    {
      search,
      categories,
      orderBy,
      offset,
      maxResults,
    },
    { skip }
  );
  useEffect(() => {
    if (search) {
      dispatch(setTotalBooks(books[0]?.totalItems ? books[0]?.totalItems : 0));
    }
  }, [isSuccess]);

  return {
    isError,
    isSuccess,
    isFetching,
    books,
    setSkip,
    isLoading,
    skip,
  };
}
