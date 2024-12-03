import { FC } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setIds } from '../../slices/slice';
import { Link } from 'react-router-dom';
import './booksItem.scss';

export interface IBooksItem {
  book: {
    author: string;
    category: string;
    description?: string;
    id?: string;
    img: string;
    title: string;
    ids: string;
  };
}

const BooksItem: FC<IBooksItem> = ({ book }) => {
  const dispatch = useAppDispatch();
  const { img, category, title, author, ids } = book;

  return (
    <div className="books__item">
      <div className="books__img-cont">
        {img ? (
          <img src={img} alt="book" className="books__img" />
        ) : (
          <span>no image</span>
        )}
      </div>
      <p className="books__category">{category}</p>
      <h2 className="books__title">{title}</h2>
      <p className="books__author">{author}</p>
      <Link
        to="book"
        id={ids}
        className="books__link"
        onClick={() => dispatch(setIds(ids))}
      ></Link>
    </div>
  );
};

export default BooksItem;
