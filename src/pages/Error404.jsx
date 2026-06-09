import { Link } from "react-router";

const Error404 = () => {
  return (
    <section className="min-h-dvh min-w-dvw flex flex-col justify-center items-center gap-6 md:gap-8">
      <h1 className="text-7xl md:text-9xl font-extrabold">404</h1>
      <h2 className="text-4xl md:text-5xl font-bold">Oops!</h2>
      <p className="text-xl md:text-2xl max-w-[35ch] text-center">
        The Page you are looking for doesn't exist. Please go to back to
        homepage.
      </p>
      <Link
        to="/"
        className="cursor-pointer text-lg px-4 py-2 font-semibold bg-black hover:bg-gray-800 text-white rounded transition-colors"
      >
        Go Home
      </Link>
    </section>
  );
};

export default Error404;
