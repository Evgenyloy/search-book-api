import { BsSearch } from 'react-icons/bs';
import SelectCategories from '../select/SelectCategories';
import SelectSorting from '../select/SelectSorting';
import { useState } from 'react';
import { setSearching } from '../../slices/slice';
import './header.module.scss';
import { useAppDispatch } from '../../hooks/hooks';

function Header() {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">Search for books</h1>
          <div className="header__search-inner">
            <input
              type="text"
              className="header__search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <BsSearch
              className="header__search-icon"
              onClick={() => dispatch(setSearching(search))}
            />
          </div>
          <div className="header__filter filter">
            <div className="filter__inner">
              <p className="filter__name">Categories</p>
              <SelectCategories />
            </div>
            <div className="filter__inner">
              <p className="filter__name">Sorting by</p>
              <SelectSorting />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
