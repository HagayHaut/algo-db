import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import styled from "styled-components";

const PageContainer = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button`
  margin: 20px;
`;

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <PageContainer>
      <h1>ALGO-rhythm</h1>
      {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      <label style={{ marginTop: "20px" }}>
        {showLogin ? "Not a user?" : "Have an account?"}
      </label>
      <ToggleButton onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Sign Up" : "Login"}
      </ToggleButton>
    </PageContainer>
  );
}

export default LandingPage;
