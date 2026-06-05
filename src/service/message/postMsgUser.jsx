const postMsgUser = async (token, userId, message) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/chats/users/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      },
    );
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("service post msg global error", err);
  }
};
export default postMsgUser;
