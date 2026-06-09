import { useMessagesBetweenUsers } from "../../service/user/user";
import profile from "../../assets/defaultProfile.png";
import { ArrowLeft, EllipsisVertical, SendHorizonal } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";
import { deleteMsg } from "../../service/message/deleteMsg";
import socket from "../../service/socket/socket";

const User = ({ isUserSelected, setIsUserSelected, usersChatToDisplay }) => {
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { user, token } = useOutletContext();
  const { messages, setMessages, error, loading } = useMessagesBetweenUsers(
    usersChatToDisplay.id,
    token,
    refreshToggle,
  );

  const formRef = useRef(null);
  const messageEndRef = useRef(null);
  let navigate = useNavigate();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.emit("join-private", {
      userOne: user.id,
      userTwo: usersChatToDisplay.id,
    });
    socket.on("private", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off("private");
  }, [setMessages, user?.id, usersChatToDisplay?.id]);

  const postMsgHandler = async (e, targetUserId) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      const message = formData.get("message");

      socket.emit("private", { token, message, targetUserId });
      formRef.current?.reset();
    } catch (error) {
      alert(`some error occurered! please refresh the page! ${error}`);
    }
  };

  const deleteMsgHandler = async (e, messageId) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    try {
      const res = await deleteMsg(token, messageId);

      if (res.success) {
        setRefreshToggle((prev) => !prev);
      } else {
        alert(`delete error, ${res.message}`);
      }
    } catch (error) {
      console.error("Delete Comment", error);
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
          <li>{error || "something went wrong! please refresh the page!"}</li>
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
        <section className="max-h-[80dvh] sm:max-h-[unset] overflow-y-scroll border grow py-2">
          {messages.map((msg) =>
            msg.authorId === user?.id ? (
              <article
                key={msg.id}
                className="flex flex-row-reverse gap-1 py-1 px-3 items-center justify-start my-2"
              >
                <button
                  className="cursor-pointer"
                  popoverTarget={`${msg.id}'sPopover`}
                  style={{ anchorName: `${msg.id}'sAnchor` }}
                >
                  <EllipsisVertical className="size-4" />
                </button>
                <div
                  popover="auto"
                  id={`${msg.id}'sPopover`}
                  style={{ positionAnchor: `${msg.id}'sAnchor` }}
                  className="absolute [position-area:top_left] m-0 bg-white px-6 py-1.5 border rounded shadow-md text-base"
                >
                  <form onSubmit={(e) => deleteMsgHandler(e, msg.id)}>
                    <button className="cursor-pointer">Delete</button>
                  </form>
                </div>
                <h2 className="max-w-[18ch] sm:max-w-[28ch] lg:max-w-[40ch] 2xl:max-w-[unset] font-bold rounded py-1 px-4 text-start bg-gray-200">
                  {msg.content}
                </h2>
              </article>
            ) : (
              <article
                key={msg.id}
                className="flex gap-3 py-1 px-3 items-center justify-start"
              >
                <h2 className="max-w-[18ch] sm:max-w-[28ch] lg:max-w-[40ch] 2xl:max-w-[unset] font-bold rounded py-1 px-4 text-start bg-gray-200">
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
            onSubmit={(e) => postMsgHandler(e, usersChatToDisplay.id)}
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
