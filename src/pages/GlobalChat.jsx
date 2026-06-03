import Global from "../components/chats/Global";
import Users from "../components/Users/Users";

const GlobalChat = () => {
  return (
    <>
      <Users chatType="global" />
      <Global />
    </>
  );
};

export default GlobalChat;
