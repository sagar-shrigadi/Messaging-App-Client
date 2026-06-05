import { SendHorizonal } from "lucide-react";
import profile from "../../assets/defaultProfile.png";
import { useGlobalMessages } from "../../service/user/user";
import { useNavigate, useOutletContext } from "react-router";
import postMsgGlobal from "../../service/message/postMsgGlobal";
import { useEffect, useRef, useState } from "react";

const Global = () => {
  const { user, token } = useOutletContext();
  // console.log("user info in global", user);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const { messages, error, loading } = useGlobalMessages(refreshToggle);
  //   console.log(messages);
  let navigate = useNavigate();

  const formRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const postMsgHandler = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData(formRef.current);
      const message = formData.get("message");

      const res = await postMsgGlobal({ message }, token);

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
              <h2 className="max-w-[28ch] sm:max-w-[40ch] font-bold rounded py-1 px-4 text-start bg-gray-200">
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
                <h2 className="max-w-[28ch] sm:max-w-[40ch] font-bold rounded py-1 px-4 text-start bg-gray-200">
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
