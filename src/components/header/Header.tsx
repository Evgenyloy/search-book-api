import { BsSearch } from 'react-icons/bs';
import SelectCategories from '../select/SelectCategories';
import SelectSorting from '../select/SelectSorting';
import { useState, useRef, useEffect } from 'react';
import {
  setSearching,
  setSkipFetch,
  setLoadingStatus,
  deleteBooksData,
} from '../../slices/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.module.scss';

function handler(
  event: MouseEvent,
  selectSortingRef: React.MutableRefObject<null>,
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  selectCategoryRef: React.MutableRefObject<null>,
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (
    selectSortingRef.current &&
    !(selectSortingRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setSortDisplay(false);
  }

  if (
    selectCategoryRef.current &&
    !(selectCategoryRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setCategoryDisplay(false);
  }
}

function Header() {
  const dispatch = useAppDispatch();
  const skipFetch = useAppSelector((state) => state.book.skipFetch);
  const searchResult = useAppSelector((state) => state.book.search);
  const loading = useAppSelector((state) => state.book.loadingStatus);
  const [search, setSearch] = useState('');

  const [sortDisplay, setSortDisplay] = useState(false);
  const selectSortingRef = useRef(null);

  const [categoryDisplay, setCategoryDisplay] = useState(false);
  const selectCategoryRef = useRef(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setSearch(e.target.value);
  };

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
  }, [selectSortingRef, selectCategoryRef]);

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const handleSearchClick = () => {
    if (search === '') return;
    if (pathname !== '/#/') {
      dispatch(deleteBooksData());
      dispatch(setSearching(search));
      setSearch('');
      navigate('/');
      dispatch(setLoadingStatus(true));
    } else {
      dispatch(deleteBooksData());
      dispatch(setSearching(search));
      setSearch('');
      dispatch(setLoadingStatus(true));
    }
    if (skipFetch) {
      dispatch(setSkipFetch(false));
    }
  };

  const handleEnterPress = (event: any) => {
    if (event.key === 'Enter' && pathname !== '/#/') {
      navigate('/');
      dispatch(deleteBooksData());
      dispatch(setSearching(search));
      setSearch('');
      dispatch(setSkipFetch(false));
      dispatch(setLoadingStatus(true));
    }
  };

  const totalBooks = useAppSelector((state) => state.book.totalBooks);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">
            <Link to="/">Search for books</Link>
          </h1>
          <div className="header__search-inner">
            <input
              type="text"
              className="header__search"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleEnterPress}
            />

            {loading ? (
              <span className="header__total-books">searching...</span>
            ) : (
              <span className="header__total-books">
                {(totalBooks as number) > 0 && !loading
                  ? ` ${totalBooks} 
                    results found for the query
                     ${searchResult} `
                  : ''}
              </span>
            )}

            <BsSearch
              className="header__search-icon"
              onClick={() => handleSearchClick()}
            />
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
