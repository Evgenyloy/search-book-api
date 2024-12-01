import { useGetBooksQuery } from '../../api/apiSlice';
import BooksItem, { IBooksItem } from '../booksItem/booksItem';
import './books.scss';

function Books() {
  const { data: books, isError, isLoading, status } = useGetBooksQuery();
  //console.log(books);

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
