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
  min-height: 100vh;
  background-color: rgb(200, 200, 200);
`;

const Logo = styled.p`
  font-family: "Modak";
  font-size: 3rem;
  color: #fdee30;
  background-color: #000000;
  border-radius: 5%;
  padding-top: 40px;
  padding-bottom: 0;
  padding-left: 40px;
  padding-right: 17px;
`;

const ToggleButton = styled.button`
  margin: 20px;
  cursor: pointer;
`;

const Motto = styled.p`
  font-size: 1.8rem;
`;

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <PageContainer>
      <Logo>algoDB!</Logo>
      <br></br>
      <Motto>Store, Study, and Share Solutions.</Motto>
      <br></br>
      {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      <label style={{ marginTop: "20px" }}>
        {showLogin ? "Not a user?" : "Already a user?"}
      </label>
      <ToggleButton onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Sign Up" : "Login"}
      </ToggleButton>
    </PageContainer>
  );
}

export default LandingPage;
