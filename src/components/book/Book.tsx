import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useGetBookQuery } from '../../api/apiSlice';
import { useAppSelector } from '../../hooks/hooks';
import { IBook } from '../../types/types';
import Spinner from '../spinner/Spinner';
import BookInfo from './BookInfo';
import './book.scss';

function renderView(book: IBook, navigate: NavigateFunction) {
  return (
    <>
      {' '}
      <div className="book__author-wrapper">
        <span className="book__author">
          {book?.authors ? book?.authors[0] : 'Author unknown'}
        </span>
        <span className="book__back" onClick={() => navigate(-1)}>
          Previous page
        </span>
      </div>
      <h2 className="book__title">{book?.title}</h2>
      <div className="book__inner">
        <div className="book__img-cont">
          {book?.img ? (
            <img src={book?.img} alt="book" className="book__img" />
          ) : (
            <span>no image</span>
          )}
        </div>
        <div className="book__info-inner">
          {book?.description && (
            <p className="book__description">
              {book?.description.replace(/<\/?[a-zA-Z]+>/gi, '')}
            </p>
          )}
          <BookInfo book={book} />
        </div>
      </div>
    </>
  );
}

function Book() {
  const navigate = useNavigate();
  const ids = useAppSelector((state) => state.book.ids);
  const {
    data: book,
    isError,
    isLoading,
    isSuccess,
  } = useGetBookQuery({ ids });

  const renderItem = renderView(book as IBook, navigate);
  return (
    <div className="book">
      <div className="book__container">
        {isLoading && <Spinner />}
        {isError ? (
          <div className="book__error">
            Error! Please reload the page or try again later{' '}
          </div>
        ) : null}
        {isSuccess && renderItem}
      </div>
    </div>
  );
}

export default Book;
