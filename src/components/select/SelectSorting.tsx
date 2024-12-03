import { useState, forwardRef } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setSorting } from '../../slices/slice';
import { sortingBy } from '../../data';
import { handleSelectClick } from '../../utils/utils';
import { Ref, Props } from '../../types/types';

function renderView(
  sortingBy: {
    name: string;
    id: string;
    data: string;
  }[],
  sort: string,
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const selectItems = sortingBy.map(({ name, id, data }) => {
    if (name === sort) return;
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

const SelectSorting = forwardRef<Ref, Props>(
  ({ setSortDisplay, sortDisplay }, dropdownRef) => {
    const dispatch = useAppDispatch();
    const [sort, setSort] = useState('relevance');

    const renderItems = renderView(sortingBy, sort, (e) =>
      handleSelectClick(e, setSort, setSortDisplay, dispatch, setSorting)
    );
    return (
      <div className="dropdown" ref={dropdownRef}>
        <p
          className="dropdown__name"
          onClick={() => setSortDisplay((display) => !display)}
        >
          {sort}{' '}
        </p>
        <ul
          className={sortDisplay ? 'dropdown__list visible' : 'dropdown__list'}
        >
          {renderItems}
        </ul>
      </div>
    );
  }
);

export default SelectSorting;
