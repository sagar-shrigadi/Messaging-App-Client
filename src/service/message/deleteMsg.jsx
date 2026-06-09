export const deleteMsg = async (token, messageId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/messages/${messageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      const json = await res.json();
      return json;
    } else {
      return { success: true, message: "Message deleted successfully!" };
    }
  } catch (err) {
    console.error("service delete message ", err);
  }
};
