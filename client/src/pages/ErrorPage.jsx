import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="btn btn-primary mt-6"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;