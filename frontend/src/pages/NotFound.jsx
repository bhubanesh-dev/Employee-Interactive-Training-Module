// src/components/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
