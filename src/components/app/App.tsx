import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  createHashRouter,
} from "react-router-dom";
import { useBooksQuery } from "../../hooks/useBooksQuery";
import Header from "../header/Header";
import Books from "../books/Books";
import MainLayout from "../mainLayout/MainLayout";
import Book from "../book/Book";

function App() {
  const { books, isFetching, isSuccess, isError, setSkip } = useBooksQuery();

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <div className="app">
          <Header props={{ setSkip, isFetching }} />
          <ScrollRestoration /> <MainLayout />
        </div>
      ),
      children: [
        {
          index: true,
          element: <Books props={{ books, isSuccess, isFetching, isError }} />,
        },
        {
          path: "book",
          element: <Book />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
