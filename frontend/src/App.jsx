import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Home, Dashboard, Tutorial, Login, Signup } from "./pages/";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tutorials" element={<Tutorial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutorials/:_id" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default App;
