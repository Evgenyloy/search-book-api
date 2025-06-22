import { useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../../api/apiSlice";
import { useAppSelector } from "../../hooks/hooks";
import { IBook } from "../../types/types";
import Spinner from "../spinner/Spinner";
import BookView from "./BookView";
import "./book.scss";
import { useEffect } from "react";

function Book() {
  const ids = useAppSelector((state) => state.book.ids);
  const {
    data: book,
    isError,
    isLoading,
    isSuccess,
  } = useGetBookQuery({ ids });
  const navigate = useNavigate();
  const renderItem = BookView(book as IBook, navigate);

  return (
    <div className="book">
      <div className="book__container">
        {isLoading && <Spinner />}
        {isError ? (
          <div className="book__error">
            Error! Please reload the page or try again later{" "}
          </div>
        ) : null}
        {isSuccess && renderItem}
      </div>
    </div>
  );
}

export default Book;
