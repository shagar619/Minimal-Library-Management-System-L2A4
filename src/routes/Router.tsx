import App from "@/App";
import AllBooksPage from "@/pages/AllBooks";
import BookDetailPage from "@/pages/BookDetailPage";
import BorrowBookPage from "@/pages/BorrowBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import ContactPage from "@/pages/ContactPage";
import CreateBookPage from "@/pages/CreateBookPage";
import EditBookPage from "@/pages/EditBookPage";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
     {
          path: "/",
          element: <App></App>,
          errorElement: <NotFound></NotFound>,
          children: [
               { path: "/", Component: Home }
          ]
     },
     {
          path: "/books",
          element: <AllBooksPage></AllBooksPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/create-book",
          element: <CreateBookPage></CreateBookPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/edit-book/:id",
          element: <EditBookPage></EditBookPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/books/:id",
          element: <BookDetailPage></BookDetailPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/borrow/:bookId",
          element: <BorrowBookPage></BorrowBookPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/borrow-summary",
          element: <BorrowSummaryPage></BorrowSummaryPage>,
          errorElement: <NotFound></NotFound>,
     },
     {
          path: "/contact",
          element: <ContactPage></ContactPage>,
          errorElement: <NotFound></NotFound>,
     },
]);

export default router;