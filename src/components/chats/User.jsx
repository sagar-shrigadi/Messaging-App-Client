import { useMessagesBetweenUsers } from "../../service/user/user";
import profile from "../../assets/defaultProfile.png";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useOutletContext } from "react-router";

const User = ({ isUserSelected, setIsUserSelected, usersChatToDisplay }) => {
  console.log("in user chats component target user info", usersChatToDisplay);

  const { user, token } = useOutletContext();
  const { messages, error, loading } = useMessagesBetweenUsers(
    usersChatToDisplay.id,
    token,
  );
  console.log("messages betwenn users", messages);

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
          <div className="flex gap-3 p-1 items-center justify-start">
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
        <section className="overflow-y-scroll border grow py-2 flex flex-col gap-3">
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
        </section>
      ) : (
        <section className="grid place-items-center grow pb-2 border">
          <h1 className="text-2xl font-bold text-center md:max-w-[25ch] lg:max-w-[unset]">
            Please select a user to view their messages...
          </h1>
        </section>
      )}
      <div className="flex justify-between items-center gap-4 p-2 min-h-10">
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

export default User;
