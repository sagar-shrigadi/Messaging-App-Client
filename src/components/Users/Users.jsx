import { useOutletContext } from "react-router";
import profile from "../../assets/defaultProfile.png";
import { useAllUsers } from "../../service/user/user";

const Users = ({
  isUserSelected,
  setIsUserSelected,
  setUsersChatToDisplay,
  chatType,
}) => {
  const { user } = useOutletContext();
  const { users, error, loading } = useAllUsers();
  // console.log(users);

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
      className={`${isUserSelected ? "hidden" : "flex"} ${chatType === "global" ? "hidden" : ""} grow md:flex flex-col border min-w-80 md:max-w-80 max-h-dvh`}
    >
      <div className="text-3xl p-2">
        <h1 className="font-bold">Users</h1>
      </div>
      <section className="overflow-y-scroll grow ">
        {users.map((u) =>
          u.id === user?.id ? (
            ""
          ) : (
            <article
              key={u.id}
              className="flex items-center gap-3 py-2.5 px-3 border-t last:border-b cursor-pointer"
              onClick={() => {
                setIsUserSelected(true);
                setUsersChatToDisplay({ id: u.id, username: u.username });
              }}
            >
              <img
                src={profile}
                alt="default user avatar"
                className="rounded-full w-10"
              />
              <h2 className="self-start font-bold">{u.username}</h2>
            </article>
          ),
        )}
      </section>
    </section>
  );
};
export default Users;
