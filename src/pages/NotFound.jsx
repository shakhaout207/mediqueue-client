import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>
        <div className="text-6xl mb-6">😕</div>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-semibold text-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;