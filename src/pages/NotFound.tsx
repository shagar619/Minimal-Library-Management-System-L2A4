import { Link } from "react-router-dom";

const NotFound = () => {
return (
     <div className="min-h-screen flex items-center justify-center bg-white px-6">
     <div className="text-center">
          <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-80 mx-auto mb-8"
     />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="bg-[hsl(173_58%_39%)] p-2 text-white font-semibold cursor-pointer rounded hover:bg-slate-700">
          Go Back Home
          </Link>
     </div>
     </div>
);
};

export default NotFound;
