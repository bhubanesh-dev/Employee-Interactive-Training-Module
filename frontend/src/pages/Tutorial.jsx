import { useContext, useEffect, useState } from "react";
import videoContext from "../context/videos/videosContext";
import UserContext from "../context/user/userContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Tutorial = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isCookiesPresent = cookies.get("authtoken");

  useEffect(() => {
    if (!isCookiesPresent) {
      toast("Login to access.");
      navigate("/login");
    }
  }, [isCookiesPresent, navigate]);

  const { videoLibrary } = useContext(videoContext);
  const { user } = useContext(UserContext);

  const handleVideoSelect = (video) => {
    // Check if the user can access this video
    if (user.completedVideo == 0 && video.order == 1) {
      navigate(`/tutorials/${video._id}`);
    } else if (
      video.order === user.completedVideo + 1 &&
      user.lastVideoTimeStamp > 0
    ) {
      navigate(`/tutorials/${video._id}`);
    } else if (video.order <= user.completedVideo + 1) {
      navigate(`/tutorials/${video._id}`);
    } else {
      toast("Please complete the previous videos first!");
    }
  };

  const handleContinuePlaying = () => {
    const video = videoLibrary.find((v) => v.order === user.completedVideo + 1);
    console.log(video);

    navigate(`/tutorials/${video._id}`);
  };

  return (
    <div className="flex h-screen px-32 bg-gray-100">
      <div className="w-full  p-5">
        <h3 className="text-3xl font-semibold mb-4">Video Library</h3>
        <div className="flex flex-row ">
          {" "}
          <button
            onClick={handleContinuePlaying}
            className=" bg-blue-500 p-2 text-white rounded-md"
          >
            Continue Playing
          </button>
          <div className="flex flex-row justify-evenly gap-4 ml-56">
            <span className="flex flex-row items-center gap-4">
              <div className="h-6 w-12 bg-green-400 rounded-md"></div>
              <div>completedVideo</div>
            </span>
            <span className="flex flex-row items-center gap-4">
              <div className="h-6 w-12 bg-yellow-400 rounded-md"></div>
              <div>Partially completedVideo</div>
            </span>
            <span className="flex flex-row items-center gap-4">
              <div className="h-6 w-12 bg-blue-400 rounded-md"></div>
              <div>Not completedVideo</div>
            </span>
          </div>
        </div>

        <div className="my-6 flex flex-wrap gap-5">
          {videoLibrary.map((video) => {
            // Set the default background color to blue (non-completedVideo videos)
            let backgroundColor = "bg-blue-300";

            // If the current video is completedVideo
            if (video.order <= user.completedVideo) {
              backgroundColor = "bg-green-300";
            }
            // If the current video is the next video after the completedVideo one and has a non-zero timestamp
            else if (
              video.order === user.completedVideo + 1 &&
              user.lastVideoTimeStamp > 0
            ) {
              backgroundColor = "bg-yellow-300";
            }

            return (
              <div
                key={video._id}
                className={`p-3 rounded-lg cursor-pointer shadow-sm w-48 h-56 ${backgroundColor} hover:bg-gray-200`}
                onClick={() => handleVideoSelect(video)}
              >
                {video.order}
                <p className="text-xl font-semibold p-2">{video.title}</p>
                <p className="text-sm truncate overflow-hidden p-2">
                  {video.metadata}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
