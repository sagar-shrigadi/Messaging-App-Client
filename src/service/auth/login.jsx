const LogUser = async (credentials) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("service sign up error", err);
  }
};

export default LogUser;
