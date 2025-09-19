import App from "@/App";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
     {
          path: "/",
          element: <App></App>,
          children: [
               { path: "home", Component: Home }
          ]
     }
]);

export default router;