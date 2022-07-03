import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import UserPage from "./UserPage";
import FindChallenge from "./FindChallenge";
import Submission from "./Submission";

const StyledApp = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  background-blend-mode: lighten;
  font-family: "Nanum Gothic";
`;

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <Header>
        <NavBar
          onLogout={handleLogout}
          user={user}
          onDarkModeClick={() => setIsDarkMode((pre) => !pre)}
          isDarkMode={isDarkMode}
        />
      </Header>

      <Routes>
        <Route path="/" element={<UserPage user={user} />} />
        <Route path="/challenges" element={<FindChallenge user={user} />} />
        <Route path="/new" element={<Submission user={user} />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
