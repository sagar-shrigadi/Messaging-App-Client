import profile from "../../assets/defaultProfile.png";
import { useGlobalMessages } from "../../service/user/user";

const Global = () => {
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
          <li>error</li>
        </ul>
      </section>
    );
  return (
    <section className="flex flex-col gap-6 border min-w-80 sm:py-1 grow">
      <h2 className="font-bold text-3xl px-2">Global Chat</h2>
      <section className="overflow-y-scroll max-h-dvh border">
        {messages.map((msg) =>
          !msg.authorId ? (
            <article
              key={msg.id}
              className="flex flex-row-reverse py-1 px-3 items-center justify-start my-2"
            >
              <h2 className="font-bold rounded py-1 px-4 text-center bg-gray-200">
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
                <h2 className="font-bold rounded py-1 px-4 text-center bg-gray-200">
                  {msg.content}
                </h2>
              </div>
            </article>
          ),
        )}
      </section>
    </section>
  );
};

export default Global;
