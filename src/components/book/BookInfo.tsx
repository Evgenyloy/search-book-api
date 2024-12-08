import { IBook } from '../../types/types';

interface IBookInfoProps {
  book: IBook;
}

function BookInfo({ book }: IBookInfoProps) {
  return (
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
  );
}

export default BookInfo;
