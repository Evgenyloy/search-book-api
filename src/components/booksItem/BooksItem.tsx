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
      <div className="books__img-cont">
        <img src={img} alt="" className="books__img" />
      </div>
      <p className="books__category">{category}</p>
      <h2 className="books__title">{title}</h2>
      <p className="books__author">{author}</p>
    </div>
  );
};

export default BooksItem;
