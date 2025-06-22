import { NavigateFunction } from "react-router-dom";
import { IBook } from "../../types/types";
import BookInfo from "./BookInfo";

function BookView(book: IBook, navigate: NavigateFunction) {
  return (
    <div className="book__wrapper">
      <button className="book__back" onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div className="book__inner">
        <div className="book__cover">
          {book?.img ? (
            <img src={book?.img} alt={book?.title} className="book__img" />
          ) : (
            <div className="book__img-placeholder">
              <span>No cover available</span>
            </div>
          )}
        </div>

        <div className="book__details">
          <div className="book__header">
            <h1 className="book__title">{book?.title}</h1>
            <p className="book__author">
              by{" "}
              {book?.authors && book?.authors.length !== 0
                ? book.authors.join(", ")
                : "Unknown author"}
            </p>
          </div>

          <div className="book__description-container">
            <h3 className="book__section-title">Description</h3>
            {book?.description ? (
              <p className="book__description">
                {book.description.replace(/<\/?[a-zA-Z]+>/gi, "")}
              </p>
            ) : (
              <p className="book__description">No description available</p>
            )}
          </div>

          <BookInfo book={book} />
        </div>
      </div>
    </div>
  );
}

export default BookView;
