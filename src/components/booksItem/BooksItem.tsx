import { FC } from 'react';
import './booksItem.scss';

export interface IBooksItem {
  book: {
    author: string;
    category: string;
    description?: string;
    id?: string;
    img: string;
    title: string;
  };
}

const BooksItem: FC<IBooksItem> = ({ book }) => {
  // console.log(book);

  const { img, category, title, author } = book;

  return (
    <div className="books__item">
      <div className="d">sdf</div>
      <div className="books__img-cont">
        <img src={img} alt="" className="books__img" />
      </div>
      <p className="books__category">{category}</p>
      <a className="books__title" href="#">
        {title}
      </a>
      <p className="books__author">{author}</p>
    </div>
  );
};

export default BooksItem;
