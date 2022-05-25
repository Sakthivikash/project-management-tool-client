import "./App.css";
import { Header } from "./components/Header";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { UserUpdate } from "./components/UserUpdate";
import { UpdateProject } from "./components/UpdateProject";
import { UpdateTask } from "./components/Project/UpdateTask";
import { Home } from "./components/Home/Home";
import { Landing } from "./components/LandingPage/LandingPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { useState } from "react";
import { Project } from "./components/Project/Project";

function App() {
  const [state, setState] = useState("login");
  return (
    <div className="App">
      <header>
        <Header setState={setState} state={state} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update-project/:id" element={<UpdateProject />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/project/:id" element={<Project />} />
          <Route
            path="/login"
            element={<Login setState={setState} state={state} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<UserUpdate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
