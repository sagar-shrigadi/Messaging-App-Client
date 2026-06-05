import { useMessagesBetweenUsers } from "../../service/user/user";
import profile from "../../assets/defaultProfile.png";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";
import postMsgUser from "../../service/message/postMsgUser";

const User = ({ isUserSelected, setIsUserSelected, usersChatToDisplay }) => {
  console.log("in user chats component target user info", usersChatToDisplay);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { user, token } = useOutletContext();
  const { messages, error, loading } = useMessagesBetweenUsers(
    usersChatToDisplay.id,
    token,
    refreshToggle,
  );
  console.log("messages betwenn users", messages);

  const formRef = useRef(null);
  const messageEndRef = useRef(null);
  let navigate = useNavigate();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const postMsgHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      const message = formData.get("message");

      // usersChatToDisplay.id (id of the user whom the message is to be send)
      const res = await postMsgUser(token, usersChatToDisplay.id, { message });

      if (res.success) {
        formRef.current?.reset();
        setRefreshToggle((prev) => !prev);
      }
    } catch (error) {
      alert(`some error occurered! please refresh the page! ${error}`);
    }
  };

  if (loading)
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  if (error)
    return (
      <section>
        <ul>
          <li>{error}</li>
        </ul>
      </section>
    );
  return (
    <section
      className={`${!isUserSelected ? "hidden" : "flex"} md:flex flex-col border max-h-dvh grow`}
    >
      <div className="text-2xl p-2 flex items-center gap-1">
        <button
          className="cursor-pointer md:hidden"
          onClick={() => setIsUserSelected(false)}
        >
          <ArrowLeft className="size-6" />
        </button>
        {isUserSelected ? (
          <div className="flex gap-3 items-center justify-start">
            <img
              src={profile}
              alt="default user avatar"
              className="rounded-full w-8 self-end"
            />
            <h2 className="font-bold ">{usersChatToDisplay?.username}</h2>
          </div>
        ) : (
          <h2 className="font-bold">User Chat</h2>
        )}
      </div>
      {isUserSelected ? (
        <section className="max-h-[80dvh] sm:max-h-[unset] overflow-y-scroll border grow pb-2">
          {messages.map((msg) =>
            msg.authorId === user?.id ? (
              <article
                key={msg.id}
                className="flex flex-row-reverse py-1 px-3 items-center justify-start my-2"
              >
                <h2 className="max-w-[28ch] sm:max-w-[40ch] font-bold rounded py-1 px-4 text-start bg-gray-200">
                  {msg.content}
                </h2>
              </article>
            ) : (
              <article
                key={msg.id}
                className="flex gap-3 py-1 px-3 items-center justify-start"
              >
                <h2 className="max-w-[28ch] sm:max-w-[40ch] font-bold rounded py-1 px-4 text-start bg-gray-200">
                  {msg.content}
                </h2>
              </article>
            ),
          )}
          <div ref={messageEndRef} />
        </section>
      ) : (
        <section className="grid place-items-center grow pb-2 border">
          <h1 className="text-2xl font-bold text-center md:max-w-[25ch] lg:max-w-[unset]">
            Please select a user to view their messages...
          </h1>
        </section>
      )}
      {usersChatToDisplay?.id && (
        <div className="p-2 border">
          <form
            ref={formRef}
            onSubmit={postMsgHandler}
            className="flex justify-between items-center gap-4"
          >
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Send your message..."
              required
              maxLength={100}
              className="border grow py-1 px-2 rounded"
            />
            <button className="cursor-pointer">
              <SendHorizonal className="size-7" />
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default User;
