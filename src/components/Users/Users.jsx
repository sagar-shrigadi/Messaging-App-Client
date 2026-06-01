import profile from "../../assets/defaultProfile.png";
import useAllUsers from "../../service/user/user";

const Users = () => {
  const { users, error, loading } = useAllUsers();
  console.log(users);

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
    <section className="flex flex-col gap-6 border min-w-80 sm:py-1">
      <h1 className="font-bold text-3xl px-2">Users</h1>
      <section className="scroll-y">
        {users.map((u) => (
          <article
            key={u.id}
            className="flex items-center gap-3 py-2.5 px-3 border-t last:border-b cursor-pointer"
          >
            <img
              src={profile}
              alt="default user avatar"
              className="rounded-full w-10"
            />
            <h2 className="self-start font-bold">{u.username}</h2>
          </article>
        ))}
      </section>
    </section>
  );
};
export default Users;
