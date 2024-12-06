import Header from '../header/Header';
import Books from '../books/Books';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../mainLayout/MainLayout';
import Book from '../book/Book';
import { useBooksQuery } from '../../hooks/useBooksQuery';
import './App.css';

function App() {
  const {
    books,
    isFetching,
    isSuccess,
    isError,
    setSkip,
    isLoading,
    booksEnded,
    skip,
  } = useBooksQuery();

  return (
    <Router>
      <div className="app">
        <Header
          setSkip={setSkip}
          books={books}
          isSuccess={isSuccess}
          isFetching={isFetching}
          booksEnded={booksEnded}
          skip={skip}
        />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Books
                  books={books}
                  isSuccess={isSuccess}
                  isFetching={isFetching}
                  isError={isError}
                  booksEnded={booksEnded}
                />
              }
            />
            <Route path="book" element={<Book />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
