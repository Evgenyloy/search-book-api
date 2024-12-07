import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useGetBookQuery } from '../../api/apiSlice';
import { useAppSelector } from '../../hooks/hooks';
import { IBook } from '../../types/types';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
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

          <ul className="book__additional-info">
            <li className="book__info-item book__pageCount">
              Page count: <span>{book?.pageCount}</span>
            </li>
            <li className="book__info-item book__publisher">
              Publisher: <span>{book?.publisher}</span>
            </li>
            <li className="book__info-item book__publishedDate">
              Published date: <span>{book?.publishedDate}</span>
            </li>

            <li className="book__info-item book__content-version">
              Content version: <span>{book?.contentVersion}</span>
            </li>
            <li className="book__info-item book__print-type">
              Print type: <span>{book?.printType}</span>
            </li>
            <li className="book__info-item book__language">
              Language: <span>{book?.language}</span>{' '}
            </li>
            <li className="book__info-item book__category">
              Category:{' '}
              {book?.categories ? (
                <span>{book?.categories}</span>
              ) : (
                <span>no category</span>
              )}
            </li>
            <a
              href={book?.bookLink}
              target="_blank"
              className="book__info-item book__saleInfo"
            >
              Book info: <span>{book?.title}</span>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

function Book() {
  const ids = useAppSelector((state) => state.book.ids);
  const navigate = useNavigate();
  const {
    data: book,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetBookQuery({ ids });

  useEffect(() => {
    document.querySelector('.book')?.scrollIntoView({ behavior: 'smooth' });
  }, [isFetching]);

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
