import videoContext from "./videosContext";
import { useEffect, useState } from "react";
import link from "../../ServerLink";

const VideoState = (props) => {
  
  const [videoLibrary, setVideoLibrary] = useState([]);

  // Get all Notes
  const getVideos = async () => {
    // API Call
    const response = await fetch(`${link}/api/videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setVideoLibrary(json);
    console.log(videoLibrary);
  }

  useEffect(()=>{
    getVideos();
  },[]); 

  return (
    <videoContext.Provider
      value={{ videoLibrary,getVideos }}
    >
      {props.children}
    </videoContext.Provider>
  );
};
export default VideoState;