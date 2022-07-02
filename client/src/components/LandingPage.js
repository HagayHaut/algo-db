import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import styled from "styled-components";

const PageContainer = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #242424;
  color: white;
  font-family: "Nanum Gothic";
  position: relative;
  overflow: auto;
`;

const LogoMottoContainer = styled.div`
  margin: 5px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 657px;
`;

const Logo = styled.p`
  font-family: "Modak";
  font-size: 3rem;
  color: #05d5fa;
  background-color: #000;
  border-radius: 5%;
  padding-top: 42px;
  padding-bottom: 0;
  padding-left: 42px;
  padding-right: 18px;
`;

const ToggleLabel = styled.label`
  margin-top: 6px;
`;

const ToggleButton = styled.button`
  margin: 20px;
  cursor: pointer;
  background: #fdee30;
  padding: 5px;
  font-weight: bold;
`;

const Motto = styled.p`
  margin-top: 4px;
  font-size: 1.6rem;
`;

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <PageContainer>
      <TopContainer>
        <LogoMottoContainer>
          <Logo>algoDB!</Logo>
          <Motto>Solve. Store. Share.</Motto>{" "}
          <ToggleLabel style={{ marginTop: "20px" }}>
            {showLogin ? "Not a user? Sign up for free." : "Already a user?"}
          </ToggleLabel>
          <ToggleButton onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Go To Sign Up" : "Go To Login"}
          </ToggleButton>
        </LogoMottoContainer>
        {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      </TopContainer>
    </PageContainer>
  );
}

export default LandingPage;
