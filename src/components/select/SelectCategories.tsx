import { forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCategories } from '../../slices/slice';
import { categoriesData } from '../../data';
import { handleSelectClick } from '../../utils/utils';
import { Ref, TSelectCategoriesProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';

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

const SelectCategories = forwardRef<Ref, TSelectCategoriesProps>(
  ({ setCategoryDisplay, categoryDisplay }, selectCategoryRef) => {
    const categories = useAppSelector((state) => state.book.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const renderItems = renderView(categoriesData, categories, (e) =>
      handleSelectClick(
        e,
        setCategoryDisplay,
        dispatch,
        setCategories,
        navigate
      )
    );

    return (
      <div className="dropdown" ref={selectCategoryRef}>
        <p
          className="dropdown__name"
          onClick={() => setCategoryDisplay((display) => !display)}
        >
          {categories}{' '}
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
