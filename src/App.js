import React from "react";

import WebcamVideo from "./components/WebcamVideo";
import { HashRouter, Route, Routes } from "react-router-dom";
import Controls from "./components/Controls";
import Test from "./components/Testing/Test";

export default function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<WebcamVideo />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  );
}

// https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/