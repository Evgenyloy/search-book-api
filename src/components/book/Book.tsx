import { useGetBookQuery } from '../../api/apiSlice';
import { useAppSelector } from '../../hooks/hooks';
import { IBook } from '../../types/types';
import Spinner from '../spinner/Spinner';
import './book.scss';

function renderView(book: IBook) {
  return (
    <>
      {' '}
      <span className="book__author">
        {book?.authors ? book?.authors[0] : 'Author unknown'}
      </span>
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
            <a href={book?.saleInfo} className="book__info-item book__saleInfo">
              Sale: <span>{book?.title}</span>
            </a>
            <li className="book__info-item book__content-version">
              Content version: <span>{book?.contentVersion}</span>
            </li>
            <li className="book__info-item book__print-type">
              Print type: <span>{book?.printType}</span>
            </li>
            <li className="book__info-item book__category">
              Category:{' '}
              {book?.categories ? (
                <span>{book?.categories}</span>
              ) : (
                <span>no category</span>
              )}
            </li>
            <li className="book__info-item book__language">
              Language: <span>{book?.language}</span>{' '}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function Book() {
  const ids = useAppSelector((state) => state.book.ids);
  const {
    data: book,
    isError,
    isLoading,
    isSuccess,
  } = useGetBookQuery({ ids });
  console.log(book?.description);
  const renderItem = renderView(book as IBook);
  return (
    <div className="book">
      <div className="book__container">
        <div className="book__wrapper">
          {isLoading && <Spinner />}
          {isSuccess && renderItem}
        </div>
      </div>
    </div>
  );
}

export default Book;
