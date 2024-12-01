import { BasicSelect } from '../select/Select';
import { BsSearch } from 'react-icons/bs';

import './header.module.scss';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">Search for books</h1>
          <div className="header__search-inner">
            <input type="text" className="header__search" />
            <BsSearch className="header__search-icon" />
          </div>
          <div className="header__filter filter">
            <div className="filter__inner">
              <p className="filter__name">Sorting by</p>
              <BasicSelect
                args={[
                  'all',
                  'art',
                  'biography',
                  'computers',
                  'history',
                  'medical',
                  'poetry',
                ]}
              />
            </div>
            <div className="filter__inner">
              <p className="filter__name">Sorting by</p>
              <BasicSelect args={['relevance', 'newest']} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
