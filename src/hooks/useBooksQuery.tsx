import { useAppSelector, useAppDispatch } from './hooks';
import { useState, useEffect } from 'react';
import { useGetBooksQuery } from '../api/apiSlice';
import { setTotalBooks } from '../slices/slice';

export function useBooksQuery() {
  const offset = useAppSelector((state) => state.book.offset);
  const subject = useAppSelector((state) => state.book.categories);
  const orderBy = useAppSelector((state) => state.book.sorting);
  const search = useAppSelector((state) => state.book.search);
  const totalBooks = useAppSelector((state) => state.book.totalBooks);
  const [maxResults, setMaxResults] = useState(20);
  const [skip, setSkip] = useState(true);
  const [booksEnded, setBooksEnded] = useState(false);
  const {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    data: books = [],
  } = useGetBooksQuery(
    {
      search,
      subject,
      orderBy,
      offset,
      maxResults,
    },
    { skip }
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (books.length) {
      dispatch(setTotalBooks(books[0].totalItems));
    }

    let ended = false;
    if (books.length < 20) {
      ended = true;
    }

    setBooksEnded((e) => ended);
  }, [isLoading, isFetching]);

  return {
    isError,
    isSuccess,
    isFetching,
    books,
    setSkip,
    isLoading,
    booksEnded,
    skip,
  };
}
