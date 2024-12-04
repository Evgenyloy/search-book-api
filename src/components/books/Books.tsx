import { useGetBooksQuery } from '../../api/apiSlice';
import BooksItem, { IBooksItem } from '../booksItem/BooksItem';
import Spinner from '../spinner/Spinner';
import {
  setTotalBooks,
  setLoadingStatus,
  setBooksData,
} from '../../slices/slice';
import './books.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';

function Books() {
  const subject = useAppSelector((state) => state.book.categories);
  const orderBy = useAppSelector((state) => state.book.sorting);
  const search = useAppSelector((state) => state.book.search);
  const skipFetch = useAppSelector((state) => state.book.skipFetch);
  const [offset, setOffset] = useState(0);
  const [maxResults, setMaxResults] = useState(3);
  const {
    status,
    data: books,
    currentData,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetBooksQuery(
    { search, subject, orderBy, offset, maxResults },
    { skip: skipFetch }
  );

  const dispatch = useAppDispatch();

  const bookList = useAppSelector((state) => state.book.booksData);
  useEffect(() => {
    if (!books) {
      return;
    } else {
      if (bookList.some((el) => books.includes(el))) {
        return;
      } else {
        dispatch(setBooksData(books));
      }
    }
  }, [books]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTotalBooks(books ? books[0].totalItems : ''));
      dispatch(setLoadingStatus(false));
    }
    if (isLoading) {
      dispatch(setLoadingStatus(true));
    }
  }, [books, isSuccess, isLoading]);

  const handleClick = () => {
    setOffset((offset) => offset + 3);
    // setMaxResults((r) => r + 3);
    // setMaxResults(30);
  };

  const items = bookList?.map((book: IBooksItem) => {
    return <BooksItem book={book} key={book.id} />;
  });
  console.log(books);

  const renderItems = isSuccess ? items : null;
  const spinner = isFetching && bookList?.length === 0 ? <Spinner /> : null;
  return (
    <div className="books">
      <div className="container">
        <div className="books__inner">
          {' '}
          {spinner}
          {renderItems}
        </div>

        {bookList.length === 0 ? null : (
          <button className="books__button" onClick={handleClick}>
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Books;
