import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user/userContext";
import Cookies from "universal-cookie";

const Home = () => {
  const context = useContext(UserContext);
  const { user, getUserInfo } = context;

  const [display, setDisplay] = useState(true);

  const cookies = new Cookies();
  const isCookiesPresent = cookies.get("authtoken");
  useEffect(() => {
    if (!isCookiesPresent) {
      setDisplay(false);
      
    }
  }, [isCookiesPresent]);

  // Example usage

  return (
    <div className="h-[80dvh] w-full flex flex-col justify-center items-center text-center">
      {display ? (
        <>
          <p className="text-2xl  font-medium"> Welcome {user.name}</p>
          <span className="text-xl ">
            click here: <Link to="/tutorials" className="text-blue-500 underline"> visit modules</Link>
          </span>
        </>
      ) : (
        <>
          <p className="text-2xl  font-medium">Welcome user</p>

          <p className="text-xl ">Login to learnModules</p>
          <Link to="/login" className="text-blue-500 underline text-xl">Login here</Link>
        </>
      )}
    </div>
  );
};

export default Home;
