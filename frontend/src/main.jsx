import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import VideoState from "./context/videos/VideoState.jsx";
import UserState from "./context/user/UserState.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserState>
        <VideoState>
          <App />
        </VideoState>
      </UserState>
    </BrowserRouter>
  </StrictMode>
);
