import { FC } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setIds } from '../../slices/slice';
import { Link } from 'react-router-dom';
import './booksItem.scss';

export interface IBooksItem {
  author: string[] | undefined;
  category: string[] | undefined;
  description?: string | undefined;
  id?: string;
  img: string;
  title: string;
  ids: string;
  totalItems: number;
}

interface IBooksItemProps {
  book: IBooksItem;
}

const BooksItem: FC<IBooksItemProps> = ({ book }) => {
  if (!book) return;
  const dispatch = useAppDispatch();
  const { img, category, title, ids, author } = book;

  return (
    <div className="books__item">
      <div className="books__img-cont">
        {img ? (
          <img src={img} alt="book" className="books__img" />
        ) : (
          <span>no image</span>
        )}
      </div>
      <p className="books__author">{author ? author[0] : 'Author unknown'}</p>
      <h2 className="books__title">{title}</h2>
      <p className="books__category">{category ? category : 'no category'}</p>
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
