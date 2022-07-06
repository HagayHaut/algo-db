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
  height: 100vh;
  background-color: rgb(57, 57, 57);
  color: white;
  font-family: "Nanum Gothic";
  position: relative;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.7em;
  }

  &::-webkit-scrollbar-track {
    background: #222;
    border-right: 1px solid rgb(57, 57, 57);
    border-left: 1px solid rgb(57, 57, 57);
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(57, 57, 57);
    border-right: 1px solid rgb(21, 21, 21);
    border-left: 1px solid rgb(21, 21, 21);
  }
`;

const LogoMottoContainer = styled.div`
  margin: 5px;
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
  color: #bbb;
  display: inline-block;
`;

const Toggle = styled.p`
  margin-top: 6px;
  color: #05d5fa;
  display: inline-block;
  cursor: pointer;
`;

// const ToggleLabel2 = styled.label`
//   margin-top: 6px;
//   color: #bbb;
//   display: inline-block;
// `;

const Motto = styled.p`
  margin-top: 10px;
  font-size: 1.3rem;
  color: #999;
`;

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <PageContainer>
      <LogoMottoContainer>
        <Logo>algoDB</Logo>
        <Motto>Solve. Save. Share.</Motto>{" "}
      </LogoMottoContainer>
      {showLogin ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      {showLogin ? (
        <>
          <ToggleLabel>
            Not a user?&nbsp;
            <Toggle onClick={() => setShowLogin(!showLogin)}>
              {" "}
              Sign up for free!
            </Toggle>
          </ToggleLabel>
        </>
      ) : (
        <ToggleLabel>
          Already a user? &nbsp;
          <Toggle onClick={() => setShowLogin(!showLogin)}>Go to Login.</Toggle>
        </ToggleLabel>
      )}
    </PageContainer>
  );
}

export default LandingPage;
