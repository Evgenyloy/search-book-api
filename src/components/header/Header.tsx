import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { CiEraser } from "react-icons/ci";
import SelectCategories from "../select/SelectCategories";
import SelectSorting from "../select/SelectSorting";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IHeaderProps } from "../../types/types";
import HeaderResults from "./HeaderResults";
import { clearAll, searchBook } from "../../utils/utils";
import useSelectClose from "../../hooks/useSelectClose";
import "./header.scss";

function Header({ props }: IHeaderProps) {
  const { isFetching, setSkip } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sortDisplayShow, setSortDisplayShow] = useState(false);
  const selectSortingRef = useRef(null);

  const [categoryDisplayShow, setCategoryDisplayShow] = useState(false);
  const selectCategoryRef = useRef(null);

  const [search, setSearch] = useState("");
  const bookLength = useAppSelector(
    (state) => state.api?.queries?.getBooks?.data
  );

  useSelectClose(
    selectSortingRef,
    setSortDisplayShow,
    selectCategoryRef,
    setCategoryDisplayShow
  );

  const handleSearchClick = () => {
    if (!search) return;
    searchBook(dispatch, setSkip, setSearch, search, navigate, bookLength);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!search) return;
    if (event.key === "Enter") {
      searchBook(dispatch, setSkip, setSearch, search, navigate, bookLength);
    }
  };

  const handleClearAll = () => {
    clearAll(dispatch, setSkip, setSearch, navigate);
  };

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
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnterPress}
              />
              <div className="header__search-icon-inner">
                <BsSearch
                  className="header__search-icon search-icon-1"
                  onClick={() => handleSearchClick()}
                />
                <CiEraser
                  className="header__search-icon search-icon-2"
                  onClick={() => handleClearAll()}
                />
              </div>
            </div>

            <p className="header__total-books">
              {searchString && <HeaderResults isFetching={isFetching} />}
            </p>
          </div>
          <div className="header__filter filter">
            <div className="filter__inner">
              <p className="filter__name">Categories</p>
              <SelectCategories
                ref={selectCategoryRef}
                categoryDisplay={categoryDisplayShow}
                setCategoryDisplay={setCategoryDisplayShow}
              />
            </div>
            <div className="filter__inner">
              <p className="filter__name">Sorting by</p>
              <SelectSorting
                ref={selectSortingRef}
                sortDisplay={sortDisplayShow}
                setSortDisplay={setSortDisplayShow}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
