const postMsgGlobal = async (message, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats/global`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("service post msg global error", err);
  }
};
export default postMsgGlobal;
