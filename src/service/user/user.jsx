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
          throw new Error(json.message);
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
const useGlobalMessages = (refreshToggle) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGlobalMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/chats/global`,
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }
        setMessages(json.data);
      } catch (err) {
        console.error("service get all global messages", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGlobalMessages();
  }, [refreshToggle]);
  return { messages, loading, error };
};
const useMessagesBetweenUsers = (userId, token, refreshToggle) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllGlobalMessages = async () => {
      try {
        if (userId === undefined) return { messages: false };
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/chats/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }
        setMessages(json.data);
      } catch (err) {
        console.error("service get all global messages", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGlobalMessages();
  }, [userId, token, refreshToggle]);
  return { messages, loading, error };
};
export { useAllUsers, useGlobalMessages, useMessagesBetweenUsers };
