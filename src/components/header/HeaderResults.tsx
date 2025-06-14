import { useAppSelector } from "../../hooks/hooks";

interface IHeaderResultsProps {
  isFetching: boolean;
}

function HeaderResults({ isFetching }: IHeaderResultsProps) {
  const searchString = useAppSelector((state) => state.book.search);
  const totalBooks = useAppSelector((state) => state.book.totalBooks);

  return (
    <>
      {isFetching ? (
        <span className="header__total-books-sp-1">searching...</span>
      ) : (
        <>
          <span className="header__total-books-sp-1">
            {" "}
            ~{totalBooks} results found or your request
          </span>
          <span className="header__total-books-sp-2">{searchString}</span>
        </>
      )}
    </>
  );
}

export default HeaderResults;
