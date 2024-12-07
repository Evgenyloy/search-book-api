import { setOffset } from '../../slices/slice';
import { BsQuestionCircle } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IBooksProps } from '../../types/types';
import { useScrollSave } from '../../hooks/useScrollSave';
import BooksItem from '../booksItem/BooksItem';
import Spinner from '../spinner/Spinner';
import './books.scss';

const Books = ({ books, isFetching, isSuccess, isError }: IBooksProps) => {
  const offset = useAppSelector((state) => state.book.offset);
  const search = useAppSelector((state) => state.book.search);
  const dispatch = useAppDispatch();

  useScrollSave(books);

  const items = books?.map((book) => {
    return <BooksItem book={book} key={book.id} />;
  });
  const spinner = isFetching && books?.length === 0 ? <Spinner /> : null;

  return (
    <div className="books">
      <div className="container">
        <div className="books__inner">
          {' '}
          {isError ? (
            <div className="books__error">
              Error! Please reload the page or try again later{' '}
            </div>
          ) : null}
          {spinner}
          {isSuccess && items}
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
        {/* +totalBooks === 0 && !isFetching && !skip */}
        {books.length < offset + 20 && !isFetching && search ? (
          <div className="books__results">
            <span>No more results.</span>
            <p
              className="books__tooltip"
              data-tooltip="Google Книги соблюдают авторские права, договорные и другие
              юридические ограничения, связанные с местоположением конечного
              пользователя. В результате некоторые пользователи могут не иметь
              доступа к книжному контенту из определенных стран. Например,
              некоторые книги доступны для предварительного просмотра только в
              США; мы опускаем такие ссылки предварительного просмотра для
              пользователей из других стран. Таким образом, результаты API
              ограничены в зависимости от IP-адреса вашего сервера или
              клиентского приложения."
            >
              <BsQuestionCircle className="books__tooltip-icon" />
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
