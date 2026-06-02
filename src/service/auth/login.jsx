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
    if (!res.ok) {
      throw new Error(json.message);
    }
    return { error: null, token: json.data };
  } catch (err) {
    console.error("service login error", err);
    return { error: err, token: null };
  }
};

export default LogUser;
