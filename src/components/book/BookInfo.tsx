import { IBook } from "../../types/types";

interface IBookInfoProps {
  book: IBook;
}

function BookInfo({ book }: IBookInfoProps) {
  const infoItems = [
    { label: "Page count", value: book?.pageCount },
    { label: "Publisher", value: book?.publisher },
    { label: "Published date", value: book?.publishedDate },
    { label: "Content version", value: book?.contentVersion },
    { label: "Print type", value: book?.printType },
    { label: "Language", value: book?.language },
    {
      label: "Category",
      value: book?.categories ? book.categories : "No category",
    },
  ];

  return (
    <div className="book__info">
      <h3 className="book__section-title">Details</h3>
      <div className="book__info-grid">
        {infoItems.map((item, index) => (
          <div key={index} className="book__info-item">
            <div className="book__info-label">{item.label}</div>
            <div className="book__info-value">{item.value}</div>
          </div>
        ))}
      </div>

      {book?.bookLink && (
        <a
          href={book.bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="book__external-link"
        >
          View on Google Books ↗
        </a>
      )}
    </div>
  );
}

export default BookInfo;
