import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import styled from "styled-components";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import UserPage from "./UserPage";
import FindChallenge from "./FindChallenge";
import UsersList from "./UsersList";
import Submission from "./Submission";

const StyledApp = styled.div`
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

  const navigate = useNavigate();

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
        navigate("/");
      }
    });
  }

  if (!user) return <LandingPage onLogin={setUser} />;

  return (
    <StyledApp className="App">
      <Header>
        <NavBar onLogout={handleLogout} user={user} />
      </Header>

      <Routes>
        <Route path="/" element={<UserPage user={user} />} />
        <Route path="/explore" element={<FindChallenge user={user} />} />
        <Route path="/new" element={<Submission user={user} />} />
        <Route path="/user_list" element={<UsersList user={user} />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
