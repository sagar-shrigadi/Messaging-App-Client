import { useEffect, useState } from "react";
import User from "../components/chats/User";
import Users from "../components/Users/Users";
import { useNavigate, useOutletContext } from "react-router";

const UsersChat = () => {
  const { user } = useOutletContext();
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [usersChatToDisplay, setUsersChatToDisplay] = useState({
    id: undefined,
    username: undefined,
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    }
  });
  return (
    <>
      <Users
        isUserSelected={isUserSelected}
        setIsUserSelected={setIsUserSelected}
        setUsersChatToDisplay={setUsersChatToDisplay}
        chatType="user"
      />
      <User
        isUserSelected={isUserSelected}
        setIsUserSelected={setIsUserSelected}
        usersChatToDisplay={usersChatToDisplay}
      />
    </>
  );
};
export default UsersChat;
