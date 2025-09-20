import App from "@/App";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
     {
          path: "/",
          element: <App></App>,
          errorElement: <NotFound></NotFound> ,
          children: [
               { path: "/", Component: Home }
          ]
     }
]);

export default router;