import { EllipsisVertical, SendHorizonal } from "lucide-react";
import profile from "../../assets/defaultProfile.png";
import { useGlobalMessages } from "../../service/user/user";
import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useRef, useState } from "react";
import { deleteMsg } from "../../service/message/deleteMsg";
import socket from "../../service/socket/socket";

const Global = () => {
  const { user, token } = useOutletContext();
  const [refreshToggle, setRefreshToggle] = useState(false);

  const { messages, setMessages, error, loading } =
    useGlobalMessages(refreshToggle);
  let navigate = useNavigate();

  const formRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("global", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => socket.off("global");
  }, [setMessages]);

  const postMsgHandler = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      const message = formData.get("message");

      socket.emit("global", { token, message });
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
          <li>{error}</li>
        </ul>
      </section>
    );
  return (
    <section className="flex flex-col border max-h-dvh grow">
      <div className="text-3xl p-2 flex items-center">
        <h2 className="font-bold">Global Chat</h2>
      </div>
      <section className="max-h-[79.5dvh] sm:max-h-[unset] overflow-y-scroll border grow pb-2">
        {messages.map((msg) =>
          msg.authorId === user?.id ? (
            <article
              key={msg.id}
              className="flex flex-row-reverse py-1 px-3 items-center justify-start my-2"
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
              <h2 className="max-w-[18ch] sm:max-w-[28ch] lg:max-w-[40ch] 2xl:max-w-[unset] font-bold rounded py-1 px-4 text-start bg-gray-200 text-balance">
                {msg.content}
              </h2>
            </article>
          ) : (
            <article
              key={msg.id}
              className="flex gap-3 py-1 px-3 items-center justify-start"
            >
              <img
                src={profile}
                alt="default user avatar"
                className="rounded-full w-8 self-end"
              />
              <div className="flex flex-col py-1 gap-1">
                <p className="text-xs">@{msg.author.username}</p>
                <h2 className="max-w-[18ch] sm:max-w-[28ch] lg:max-w-[40ch] 2xl:max-w-[unset] font-bold rounded py-1 px-4 text-start bg-gray-200">
                  {msg.content}
                </h2>
              </div>
            </article>
          ),
        )}
        <div ref={messagesEndRef} />
      </section>
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
    </section>
  );
};

export default Global;
