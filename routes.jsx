import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Login from "./src/components/auth/Login";
import GlobalChat from "./src/pages/GlobalChat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <GlobalChat /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
