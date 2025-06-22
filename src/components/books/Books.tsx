import { setOffset } from "../../slices/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IBooksProps } from "../../types/types";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import BooksItem from "../booksItem/BooksItem";
import Spinner from "../spinner/Spinner";
import "./books.scss";

const Books = ({ props }: IBooksProps) => {
  const { books, isError, isFetching, isSuccess } = props;
  const offset = useAppSelector((state) => state.book.offset);
  const search = useAppSelector((state) => state.book.search);
  const dispatch = useAppDispatch();

  const items = books?.map((book) => {
    return <BooksItem book={book} key={book.id} />;
  });
  const spinner = isFetching && books?.length === 0 ? <Spinner /> : null;
  return (
    <div className="books">
      <div className="container">
        <div className="books__inner">
          {" "}
          {isError ? (
            <div className="books__error">
              Error! Please reload the page or try again later{" "}
            </div>
          ) : null}
          {spinner}
          {isSuccess && items}
        </div>

        {books?.length !== 0 && (
          <button
            className={isFetching ? "books__button disabled" : "books__button"}
            onClick={() => dispatch(setOffset())}
            disabled={isFetching}
            style={{
              display:
                books.length < offset + 20 && !isFetching ? "none" : "block",
            }}
          >
            {isFetching ? "Loading..." : "Load more"}
          </button>
        )}
        {books.length < offset + 20 && !isFetching && search && books.length ? (
          <div className="books__results">
            <span>No more results.</span>
            {books.length > 10 && (
              <MdKeyboardDoubleArrowUp
                className="books__results-icon"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })
                }
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
