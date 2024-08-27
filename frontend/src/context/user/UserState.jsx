import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import UserContext from "./userContext";
import link from "../../ServerLink";
const UserState = (props) => {
  const cookies = new Cookies();
  const [user, setUser] = useState([]); // Initial state set to an empty array

  // Define getUserInfo outside the useEffect to make it accessible throughout the component
  const getUserInfo = async () => {
    try {
      // API Call
      const response = await fetch(`${link}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: cookies.get("authtoken"), // Ensure correct cookie name
        },
      });

      const json = await response.json();
      setUser(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  // Function to clear user info during logout
  const setUserInfo = () => {
    setUser([]);
  };
  const updateUserProgress = async (progressData) => {
    try {
      const response = await fetch(`${link}/api/user/updateProgress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: cookies.get("authtoken"),
        },
        body: JSON.stringify(progressData),
      });

      // Check if the response is successful (status 200-299)
      if (response.ok) {
        const data = await response.json();
        const { userData, message } = data;

        console.log(userData, message);

        // Assuming the updated user object is returned
        setUser(userData); // Update the user context state
      } else {
        // If response is not successful, handle it accordingly
        const errorMessage = await response.text(); // Read the error message from the response
        console.error("Failed to update user progress:", errorMessage);
      }
    } catch (error) {
      console.error("Failed to update user progress:", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ getUserInfo, user, setUserInfo, updateUserProgress }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
