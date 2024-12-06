import { setOffset } from '../../slices/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BooksItem from '../booksItem/BooksItem';
import Spinner from '../spinner/Spinner';
import { IBooksProps, IBooksItem } from '../../types/types';
import './books.scss';

const Books = ({ books, isFetching, isSuccess, isError }: IBooksProps) => {
  const dispatch = useAppDispatch();
  const offset = useAppSelector((state) => state.book.offset);

  if (books.length < offset + 20) {
    console.log(books.length, offset + 20);
  } else {
    console.log(books.length, offset + 20);
  }

  const items = books?.map((book: IBooksItem) => {
    return <BooksItem book={book} key={book.id} />;
  });

  const renderItems = isSuccess ? items : null;
  const spinner = isFetching && books?.length === 0 ? <Spinner /> : null;
  return (
    <div className="books">
      <div className="container">
        <div className="books__inner">
          {' '}
          {isError ? (
            <div className="books__error">Error! Please reload the page</div>
          ) : null}
          {spinner}
          {renderItems}
        </div>

        {books?.length !== 0 && (
          <button
            className={isFetching ? 'books__button disabled' : 'books__button'}
            onClick={() => dispatch(setOffset())}
            disabled={isFetching}
            style={{
              display:
                books.length < offset + 20 && !isFetching ? 'none' : 'block',
            }}
          >
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        )}
        {books.length < offset + 20 && !isFetching ? (
          <div>these are all the results</div>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
