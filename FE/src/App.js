import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Process from "./process/process";
import io from "socket.io-client";

const socket = io.connect("/");

const AppMain = () => {
  const { username, roomname } = useParams();
  return (
    <React.Fragment>
      <div className="right">
        <Chat username={username} roomname={roomname} socket={socket} />
      </div>
      <div className="left">
        <Process />
      </div>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/chat/:roomname/:username" element={<AppMain />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
