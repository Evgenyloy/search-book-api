import { useGetBooksQuery } from '../../api/apiSlice';
import BooksItem from '../booksItem/BooksItem';
import './books.scss';
import { useAppSelector } from '../../hooks/hooks';

function Books() {
  const subject = useAppSelector((state) => state.book.categories);
  const orderBy = useAppSelector((state) => state.book.sorting);
  const search = useAppSelector((state) => state.book.search);

  const {
    data: books,
    isError,
    isLoading,
    status,
  } = useGetBooksQuery({ search, subject, orderBy });

  const items = books?.map((book: any) => {
    return <BooksItem book={book} key={book.id} />;
  });

  return (
    <div className="books">
      <div className="container">
        <div className="books__inner">{items}</div>
      </div>
    </div>
  );
}

export default Books;
