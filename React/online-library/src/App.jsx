import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";

function Layout() {

  const location = useLocation();

  const hideNavbar =
    location.pathname.includes(
      "not-found"
    );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/books/:category"
          element={<BrowseBooks />}
        />

        <Route path="/search" element={<SearchResults />} />

        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        <Route
          path="/add-book"
          element={<AddBook />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}