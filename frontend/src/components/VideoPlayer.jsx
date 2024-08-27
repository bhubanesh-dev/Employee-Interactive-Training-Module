import { useEffect, useState, useContext, useRef } from "react";
import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";
import videoContext from "../context/videos/videosContext";
import UserContext from "../context/user/userContext";

const VideoPlayer = () => {
  const { _id } = useParams();
  const { videoLibrary } = useContext(videoContext);
  const { user, updateUserProgress } = useContext(UserContext);
  const navigate = useNavigate();

  const video = videoLibrary.find((video) => video._id === _id);
  const previousVideo = videoLibrary.find((v) => v.order === video.order - 1);
  const nextVideo = videoLibrary.find((v) => v.order === video.order + 1);

  const playerRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [lastVideoTimeStamp, setLastVideoTimeStamp] = useState(0); // Use float
  const [allowedSeekTime, setAllowedSeekTime] = useState(0); // Tracks how far the user can seek forward

  useEffect(() => {
    if (!video) {
      navigate("/tutorials"); // Redirect if video not found
      return;
    }

    // Determine the correct starting timestamp based on user's progress
    const startingTimeStamp =
      user.completedVideo + 1 === video.order && user.lastVideoTimeStamp !== 0
        ? parseFloat(user.lastVideoTimeStamp)
        : 0.0;

    setCurrentVideo(video);
    setLastVideoTimeStamp(startingTimeStamp);
    setAllowedSeekTime(startingTimeStamp); // Allow seeking only up to the starting timestamp
  }, [
    _id,
    videoLibrary,
    navigate,
    user.completedVideo,
    user.lastVideoTimeStamp,
  ]);

  // Function to save progress to the backend
  const saveProgress = (timestamp) => {
    if (user.completedVideo + 1 === video.order) {
      updateUserProgress({
        completedVideo: user.completedVideo,
        lastVideoTimeStamp: timestamp,
      }).catch((error) => {
        console.error("Failed to update user progress:", error);
      });
    }
  };

  const handleEnded = () => {
    if (user.completedVideo + 1 === video.order) {
      updateUserProgress({
        completedVideo: user.completedVideo + 1,
        lastVideoTimeStamp: 0.0, // Reset for the next video
      });
    }

    alert(
      "This video is completed. Click on the next module to visit the next video."
    );
  };

  const handleOnStart = () => {
    if (playerRef.current && lastVideoTimeStamp > 0) {
      playerRef.current.seekTo(lastVideoTimeStamp);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      const timestamp = playerRef.current.getCurrentTime();
      if (timestamp > user.lastVideoTimeStamp) saveProgress(timestamp);
    }
  };

  const handleSeek = (seekedTo) => {
    // Prevent seeking forward beyond the allowed seek time
    if (seekedTo > allowedSeekTime) {
      playerRef.current.seekTo(allowedSeekTime);
      // Automatically start playback from the allowed seek time
      playerRef.current.getInternalPlayer().play(); // Force back to the allowed time
    }
  };

  const handleProgress = (state) => {
    const { playedSeconds } = state;
    // Ensure the playedSeconds is a valid number
    if (typeof playedSeconds !== "number" || isNaN(playedSeconds)) return;
    else setAllowedSeekTime(playedSeconds); // Update allowed seek time if played naturally
  };

  // Save progress when user tries to leave the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (playerRef.current) {
        const timestamp = playerRef.current.getCurrentTime();
        saveProgress(timestamp);
      }
      // Prevents the default behavior of unloading
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Save progress when route changes
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        const timestamp = playerRef.current.getCurrentTime();
        saveProgress(timestamp);
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col lg:flex-row mx-4 lg:mx-16 mt-8 lg:mt-24 gap-5">
      <div className="w-full lg:w-1/2 flex flex-col px-8">
        {currentVideo && (
          <>
            <h1 className="text-3xl font-semibold my-4">
              <span className="font-bold mr-2">{currentVideo.order}.</span>
              {currentVideo.title}
            </h1>
            <p className="text-xl font-normal my-4">{currentVideo.metadata}</p>
            <div className="flex flex-row justify-evenly mt-64">
              <button
                className="bg-blue-500 p-2 text-white rounded-md"
                onClick={() => {
                  if (previousVideo) {
                    navigate(`/tutorials/${previousVideo._id}`);
                  } else {
                    // If there's no previous video, navigate back to the list
                    navigate("/tutorials");
                  }
                }}
              >
                {previousVideo
                  ? `Go to module ${previousVideo.order}`
                  : "Go back to list"}
              </button>
              <button
                className="bg-blue-500 p-2 text-white rounded-md"
                onClick={() => {
                  if (nextVideo && currentVideo.order <= user.completedVideo) {
                    navigate(`/tutorials/${nextVideo._id}`);
                  } else if (nextVideo) {
                    alert("Complete the current video first");
                  } else {
                    // If there's no next video, navigate back to the list
                    navigate("/tutorials");
                  }
                }}
              >
                {nextVideo
                  ? `Go to module ${nextVideo.order}`
                  : "Go back to list"}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col mt-16">
        <div className="player-wrapper">
          {currentVideo ? (
            <ReactPlayer
              ref={playerRef}
              className="w-full h-auto"
              url={currentVideo.url}
              controls
              playing={true}
              volume={null}
              onPause={handlePause}
              onEnded={handleEnded}
              onStart={handleOnStart}
              onSeek={handleSeek}
              onProgress={handleProgress}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload noplaybackrate",
                    disablePictureInPicture: true,
                  },
                },
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
