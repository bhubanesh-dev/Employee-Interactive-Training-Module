import { useContext, useEffect } from "react";
import UserContext from "../context/user/userContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import videoContext from "../context/videos/videosContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isCookiesPresent = cookies.get("authtoken");

  useEffect(() => {
    if (!isCookiesPresent) {
      toast("Login to access.");
      navigate("/login");
    }
  }, [isCookiesPresent, navigate]);

  const { user, getUserInfo } = useContext(UserContext);
  const { videoLibrary, getVideos } = useContext(videoContext);
  useEffect(() => {
    if (!user || !videoLibrary) {
      getUserInfo();
      getVideos();
    }
  }, []);

  console.log("User Data:", user);
  console.log("Video Library:", videoLibrary);

  // Find the last watched video based on user progress
  const lastWatchedVideo = videoLibrary.find(
    (video) => video.order === user.completedVideo
  );

  return (
    <div className="flex flex-col h-screen w-full px-16 py-8 bg-gray-100">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">
        Welcome, {user.name}
      </h2>
      <p className="text-lg mb-6 text-gray-600">Email: {user.email}</p>

      <div className="flex flex-row gap-8 mb-8">
        <div className="p-6 bg-blue-400 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Completed Videos
          </h3>
          <p className="text-lg text-white">
            {user.completedVideo} /{" "}
            {videoLibrary.length > 0 ? videoLibrary.length : 0}
          </p>
        </div>
        <div className="p-6 bg-blue-400 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Last Watched Video
          </h3>
          <p className="text-lg text-white">
            {lastWatchedVideo ? lastWatchedVideo.title : "N/A"}
          </p>
          <p className="text-md text-white">
            Last Watched Timestamp: {Math.floor(user.lastVideoTimeStamp)}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
