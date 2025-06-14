import { NavigateFunction } from "react-router-dom";
import { IBook } from "../../types/types";
import BookInfo from "./BookInfo";

function BookView(book: IBook, navigate: NavigateFunction) {
  return (
    <>
      {" "}
      <div className="book__author-wrapper">
        <span className="book__author">
          {book?.authors ? book?.authors[0] : "Author unknown"}
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
              {book?.description.replace(/<\/?[a-zA-Z]+>/gi, "")}
            </p>
          )}
          <BookInfo book={book} />
        </div>
      </div>
    </>
  );
}

export default BookView;
