import { useAppDispatch } from "../../hooks/hooks";
import { setIds } from "../../slices/slice";
import { Link } from "react-router-dom";
import { IBooksItem } from "../../types/types";
import "./booksItem.scss";

interface IBooksItemProps {
  book: IBooksItem;
}

function BooksItem({ book }: IBooksItemProps) {
  const { img, category, title, ids, author } = book;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    sessionStorage.setItem("ids", JSON.stringify(ids));
  };

  return (
    <div className="books__item" onClick={handleClick}>
      <div className="books__img-cont">
        {img ? (
          <img src={img} alt="book" className="books__img" />
        ) : (
          <span>no image</span>
        )}
      </div>
      <p className="books__author">{author ? author[0] : "Author unknown"}</p>
      <h2 className="books__title">{title}</h2>
      <p className="books__category">{category ? category : "no category"}</p>
      <Link
        to="book"
        id={ids}
        className="books__link"
        onClick={() => dispatch(setIds(ids))}
      ></Link>
    </div>
  );
}

export default BooksItem;
