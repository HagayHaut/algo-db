import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      <label>{showLogin ? "Not a user?" : "Have an account?"}</label>
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}

export default LandingPage;
