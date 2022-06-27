import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import Login from "./Login";
import Signup from "./Signup";

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

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <button onClick={handleLogout}>Logout</button>
      <Routes>
        {/* <Route path="login" element={<Login onLogin={setUser} />} /> */}
        <Route path="signup" element={<Signup onLogin={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
