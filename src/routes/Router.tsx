import App from "@/App";
import AllBooksPage from "@/pages/AllBooks";
import CreateBookPage from "@/pages/CreateBookPage";
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
]);

export default router;