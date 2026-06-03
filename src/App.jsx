import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Outlet } from "react-router";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token !== null) {
          const getUser = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/users/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const json = await getUser.json();
          if (!getUser.ok) {
            throw new Error(json.message);
          }
          setUser(json.data);
        }
      } catch (error) {
        console.error("token set error", error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <>
      <Nav user={user} />
      <Outlet context={{ user, token, setToken }} />
    </>
  );
}

export default App;
