import { useRef, useState } from "react";
import LogUser from "../service/auth/login";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [validationError, setValidationError] = useState([]);
  const [credentialsError, setCredentialsError] = useState("");
  const btnRef = useRef(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    btnRef.current.textContent = "Logging in...";

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await LogUser({ username, password });

    if (res.success) {
      localStorage.setItem("token", res.data);
      navigate("/");
    } else {
      btnRef.current.textContent = "Log in";

      if (res.message === "Validation Failed!") {
        setCredentialsError("");
        setValidationError(res.errors);
      } else {
        setCredentialsError(res.message);
        setValidationError([]);
      }
    }
  };
  return (
    <section className="flex flex-col gap-4 items-center justify-center m-auto p-4 w-dvw max-w-136">
      <h1 className="text-4xl mr-auto">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="w-full py-5 flex flex-col gap-5">
        <div className="flex-1 flex flex-col ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="username"
            className="rounded-sm p-1 px-2 bg-dark-200 text-lg border"
          />
        </div>
        <div className="flex-1 flex flex-col ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="current-password"
            className="rounded-sm p-1 px-2 bg-dark-200 text-lg border"
          />
        </div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col justify-start gap-3 text-red-500">
          {validationError && validationError.map((e) => <p>{e.message}</p>)}
          {credentialsError && <p>{credentialsError}</p>}
        </div>
        <div className="flex justify-end gap-5">
          <Link
            to="/"
            className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2 rounded transition-all"
          >
            Global Chat
          </Link>
          <button
            ref={btnRef}
            className="cursor-pointer py-2 px-6 rounded text-white bg-gray-800 hover:bg-gray-700 transition-all"
          >
            Log in
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
