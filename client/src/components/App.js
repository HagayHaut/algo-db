import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import UserPage from "./UserPage";
import FindChallenge from "./FindChallenge";
import Submission from "./Submission";

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
      }
    });
  }

  if (!user) return <LandingPage onLogin={setUser} />;

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<UserPage user={user} />} />
        <Route path="/challenges" element={<FindChallenge user={user} />} />
        <Route path="/new" element={<Submission user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
