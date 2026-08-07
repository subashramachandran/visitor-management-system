import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">

      <h1 className="text-6xl font-bold text-gray-300 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist.
      </p>


      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go back home
      </Link>

    </div>
  );
};

export default NotFound;