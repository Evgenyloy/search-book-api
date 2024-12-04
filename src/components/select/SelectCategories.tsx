import { useState, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCategories } from '../../slices/slice';
import { categories } from '../../data';
import { handleSelectClick } from '../../utils/utils';
import { Ref } from '../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';

function renderView(
  categories: {
    name: string;
    id: string;
    data: string;
  }[],
  category: string,
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const selectItems = categories.map(({ name, id, data }) => {
    if (name === category) return;
    return (
      <li className="dropdown__item" key={id}>
        <a
          type="checkbox"
          className="dropdown__link"
          id={id}
          data-sort={data}
          onClick={handleClick}
        >
          {name}
        </a>
      </li>
    );
  });
  return selectItems;
}

export type Props = {
  categoryDisplay: boolean;
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectCategories = forwardRef<Ref, Props>(
  ({ setCategoryDisplay, categoryDisplay }, selectCategoryRef) => {
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState('all');
    const search = useAppSelector((state) => state.book.search);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const renderItems = renderView(categories, category, (e) =>
      handleSelectClick(
        e,
        setCategory,
        setCategoryDisplay,
        dispatch,
        setCategories,
        search,
        pathname,
        navigate
      )
    );
    return (
      <div className="dropdown" ref={selectCategoryRef}>
        <p
          className="dropdown__name"
          onClick={() => setCategoryDisplay((display) => !display)}
        >
          {category}{' '}
        </p>
        <ul
          className={
            categoryDisplay ? 'dropdown__list visible' : 'dropdown__list'
          }
        >
          {renderItems}
        </ul>
      </div>
    );
  }
);

export default SelectCategories;
