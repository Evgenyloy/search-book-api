import Header from '../header/Header';
import Books from '../books/Books';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../mainLayout/MainLayout';
import Book from '../book/Book';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Books />} />
            <Route path="book" element={<Book />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
