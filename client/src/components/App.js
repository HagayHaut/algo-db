import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import UserPage from "./UserPage";
import FindChallenge from "./FindChallenge";
import Submission from "./Submission";

const StyledApp = styled.div``;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  if (!user) return <LandingPage onLogin={setUser} />;

  return (
    <StyledApp className="App">
      <NavBar onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<UserPage user={user} />} />
        <Route path="/challenges" element={<FindChallenge user={user} />} />
        <Route path="/new" element={<Submission user={user} />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
