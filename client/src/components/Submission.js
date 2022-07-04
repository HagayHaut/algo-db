import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import AddSolution from "./AddSolution";
import AddResource from "./AddResource";
import styled from "styled-components";

const SubmissionPage = styled.div`
  text-align: center;
  background-color: lightgrey;
  position: relative;
  top: 30px;
  height: calc(100vh - 30px);
  background-color: rgb(57, 57, 57);
`;

const ToggleContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Toggle = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: auto;
  color: #fefefe;
`;

const VertDivider = styled.div`
  border-right: 1px solid #fefefe;
  width: 1px;
  height: 1.5rem;
  margin: 2px;
`;

const ToggleButtons = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const ToggleButton = styled.p`
  margin: 4px;
`;

const ToggleLabel = styled.p`
  color: #fefefe;
  margin: 4px 4px 4px 0;
`;

function Submission({ user }) {
  const [displayForm, setDisplayForm] = useState("solution");

  const addNew = () => {
    switch (displayForm) {
      case "solution":
        return <AddSolution user={user} />;
      case "challenge":
        return <AddChallenge />;
      default:
        return <AddResource />;
    }
  };

  return (
    <SubmissionPage>
      <ToggleContainer>
        <Toggle>
          <ToggleButtons>
            <VertDivider />
            <ToggleButton onClick={() => setDisplayForm("solution")}>
              Solution
            </ToggleButton>
            <VertDivider />
            <ToggleButton onClick={() => setDisplayForm("challenge")}>
              Challenge
            </ToggleButton>
            <VertDivider />
            <ToggleButton onClick={() => setDisplayForm("resource")}>
              Resource
            </ToggleButton>
            <VertDivider />
          </ToggleButtons>
        </Toggle>
      </ToggleContainer>

      {addNew()}
    </SubmissionPage>
  );
}

export default Submission;
