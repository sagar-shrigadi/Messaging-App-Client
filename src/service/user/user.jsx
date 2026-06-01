import { useEffect, useState } from "react";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(res.data.message);
        }
        setUsers(json.data);
      } catch (err) {
        console.error("service getAllUsers", err);
        setError(err.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);
  return { users, error, loading };
};

export default useAllUsers;
