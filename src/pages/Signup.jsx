import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import SignUpUser from "../service/auth/signup";

const Signup = () => {
  const [validationError, setValidationError] = useState([]);
  let navigate = useNavigate();
  const btnRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    btnRef.current.textContent = "Signing in...";

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const res = await SignUpUser({ username, password, confirmPassword });

    if (res.success) {
      navigate("/login");
    } else {
      btnRef.current.textContent = "Sign Up";
      setValidationError(res.errors);
    }
  };
  return (
    <section className="flex flex-col gap-4 items-center justify-center m-auto p-4 w-dvw max-w-136">
      <h1 className="text-4xl mr-auto">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full py-5 flex flex-col gap-5">
        <div className="flex-1 flex flex-col ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            required
            minLength={3}
            maxLength={20}
            className="rounded-sm p-1 px-2 bg-dark-200 text-lg border"
          />
        </div>
        <div className="flex-1 flex flex-col ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            required
            minLength={6}
            maxLength={30}
            className="rounded-sm p-1 px-2 bg-dark-200 text-lg border"
          />
        </div>
        <div className="flex-1 flex flex-col ">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            required
            className="rounded-sm p-1 px-2 bg-dark-200 text-lg border"
          />
        </div>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
        <div className="flex flex-col justify-start gap-3 text-red-500">
          {validationError.map((err) => (
            <p>{err.message}</p>
          ))}
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
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};
export default Signup;
