import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Login from "./src/components/auth/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
