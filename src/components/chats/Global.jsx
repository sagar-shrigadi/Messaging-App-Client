import { SendHorizonal } from "lucide-react";
import profile from "../../assets/defaultProfile.png";
import { useGlobalMessages } from "../../service/user/user";
import { useOutletContext } from "react-router";

const Global = () => {
  const { user } = useOutletContext();
  console.log("user info in global", user);

  const { messages, error, loading } = useGlobalMessages();
  //   console.log(messages);

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
      <section className="overflow-y-scroll border grow pb-2">
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
      </section>
      <div className="flex justify-between items-center gap-4 p-2 min-h-10 border">
        <form className="grow">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Send your message..."
            className="border min-w-full py-1 px-2 rounded"
          />
        </form>
        <SendHorizonal className="size-7 cursor-pointer" />
      </div>
    </section>
  );
};

export default Global;
