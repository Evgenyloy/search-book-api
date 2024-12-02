import { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setCategories } from '../../slices/slice';
import { categories } from '../../data';
import { handleSelectClick } from '../../utils/utils';

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
          data-sort={name}
          onClick={handleClick}
        >
          {name}
        </a>
      </li>
    );
  });
  return selectItems;
}

function SelectCategories() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState('all');
  const [categoryDisplay, setCategoryDisplay] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(
          event.target as HTMLElement
        )
      ) {
        setCategoryDisplay(false);
      }
    };
    document.addEventListener('click', handler);
  }, [dropdownRef]);

  const renderItems = renderView(categories, category, (e) =>
    handleSelectClick(
      e,
      setCategory,
      setCategoryDisplay,
      dispatch,
      setCategories
    )
  );

  return (
    <div className="dropdown" ref={dropdownRef}>
      <p
        className="dropdown__name"
        onClick={(e) => setCategoryDisplay((display) => !display)}
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

export default SelectCategories;
