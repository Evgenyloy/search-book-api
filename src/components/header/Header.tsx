import { BsSearch } from 'react-icons/bs';
import { CiEraser } from 'react-icons/ci';
import SelectCategories from '../select/SelectCategories';
import SelectSorting from '../select/SelectSorting';
import { useState, useRef, useEffect } from 'react';
import {
  setSearching,
  setOffset,
  setCategories,
  setSorting,
  setTotalBooks,
} from '../../slices/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { apiSlice } from '../../api/apiSlice';
import { handler } from '../../utils/utils';
import { IHeaderProps } from '../../types/types';
import './header.scss';

function Header({ setSkip, isFetching, skip }: IHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sortDisplay, setSortDisplay] = useState(false);
  const selectSortingRef = useRef(null);

  const [categoryDisplay, setCategoryDisplay] = useState(false);
  const selectCategoryRef = useRef(null);

  const [search, setSearch] = useState('');

  useEffect(() => {
    document.addEventListener('click', (e) =>
      handler(
        e,
        selectSortingRef,
        setSortDisplay,
        selectCategoryRef,
        setCategoryDisplay
      )
    );

    return () => {
      document.removeEventListener('click', (e) =>
        handler(
          e,
          selectSortingRef,
          setSortDisplay,
          selectCategoryRef,
          setCategoryDisplay
        )
      );
    };
  }, [selectSortingRef, selectCategoryRef]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    if (search === '') return;
    setSkip(false);
    navigate('/');
    dispatch(setOffset(0));
    dispatch(apiSlice.util.resetApiState());
    dispatch(setSearching(search));
    setSearch('');
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (search === '') return;
    if (event.key === 'Enter') {
      setSkip(false);
      navigate('/');
      dispatch(setOffset(0));
      dispatch(apiSlice.util.resetApiState());
      dispatch(setSearching(search));
      setSearch('');
    }
  };

  const handleClear = () => {
    setSkip(true);
    dispatch(setSearching(''));
    dispatch(setCategories('all'));
    dispatch(setSorting('relevance'));
    dispatch(setTotalBooks(0));
    dispatch(apiSlice.util.resetApiState());
  };

  const totalBooks = useAppSelector((state) => state.book.totalBooks);
  const searchString = useAppSelector((state) => state.book.search);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">
            <Link to="/">Search for books</Link>
          </h1>
          <div className="header__search-inner">
            <div className="header__input-inner">
              <input
                name="input"
                type="text"
                className="header__search"
                value={search}
                onChange={handleSearch}
                onKeyDown={handleEnterPress}
              />
              <div className="header__search-icon-inner">
                <BsSearch
                  className="header__search-icon search-icon-1"
                  onClick={() => handleSearchClick()}
                />
                <CiEraser
                  className="header__search-icon search-icon-2"
                  onClick={() => handleClear()}
                />
              </div>
            </div>

            <p className="header__total-books">
              {isFetching ? (
                <span className="header__total-books-sp-1">searching...</span>
              ) : (totalBooks as number) > 0 && !isFetching ? (
                <>
                  <span className="header__total-books-sp-1">
                    {' '}
                    {totalBooks} results found or your request
                  </span>
                  <span className="header__total-books-sp-2">
                    {searchString}
                  </span>
                </>
              ) : (
                ''
              )}
              {+totalBooks === 0 && !isFetching && !skip
                ? 'no results found'
                : ''}
            </p>
          </div>
          <div className="header__filter filter">
            <div className="filter__inner">
              <p className="filter__name">Categories</p>
              <SelectCategories
                ref={selectCategoryRef}
                categoryDisplay={categoryDisplay}
                setCategoryDisplay={setCategoryDisplay}
              />
            </div>
            <div className="filter__inner">
              <p className="filter__name">Sorting by</p>
              <SelectSorting
                ref={selectSortingRef}
                sortDisplay={sortDisplay}
                setSortDisplay={setSortDisplay}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
