const SignUpUser = async (credentials) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
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

export default SignUpUser;
