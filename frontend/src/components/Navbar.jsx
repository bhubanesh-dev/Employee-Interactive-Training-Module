import { useState, useEffect, useMemo,useContext } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate, NavLink } from "react-router-dom";
import UserContext from "../context/user/userContext";

const Navbar = () => {

    const navigate = useNavigate();
  // Create the cookies instance using useMemo to avoid recreating it on every render
  const cookies = useMemo(() => new Cookies(), []);
    const {setUserInfo} = useContext(UserContext)
  const [isCookiePresent, setIsCookiePresent] = useState(false);

  useEffect(() => {
    const checkCookie = () => {
      if (cookies.get("authtoken")) {
        setIsCookiePresent(true);
      } else {
        setIsCookiePresent(false);
      }
    };

    // Check if the cookie is present when the component mounts
    checkCookie();

    // Optional: If the cookie might change dynamically, you can poll for changes
    const interval = setInterval(checkCookie, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Now cookies is stable and won't change on every render

  const handleLogout = () => {
    cookies.remove("authtoken"); // Use the memoized cookies instance
    setIsCookiePresent(false); // Update the state to reflect cookie removal
    setUserInfo();
    navigate('/')
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              LizMotors
            </span>
          </NavLink>
          {!isCookiePresent ? (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link
                to="/login"
                className="text-sm text-white hover:underline"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div
                onClick={handleLogout}
                className="text-sm text-white hover:underline cursor-pointer"
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tutorials"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Tutorials
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
