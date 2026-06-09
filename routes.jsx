import { createBrowserRouter } from "react-router";
import App from "./src/App";
import GlobalChat from "./src/pages/GlobalChat";
import UsersChat from "./src/pages/UsersChat";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Error404 from "./src/pages/Error404";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <GlobalChat /> },
      { path: "users", element: <UsersChat /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
