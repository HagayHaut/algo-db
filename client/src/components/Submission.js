import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import AddSolution from "./AddSolution";
import styled from "styled-components";

const SubmissionPage = styled.div`
  text-align: center;
  background-color: lightgrey;
  position: relative;
  top: 30px;
  height: calc(100vh - 30px);
  background-color: rgb(57, 57, 57);
`;

const SubmissionsTitle = styled.p`
  font-size: 2rem;
  color: #fefefe;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: auto;
  color: #fefefe;
`;

const ToggleButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const ToggleLabel = styled.p`
  color: #fefefe;
`;

function Submission({ user }) {
  const [displayForm, setDisplayForm] = useState("solution");

  const addNew = () => {
    switch (displayForm) {
      case "solution":
        return <AddSolution user={user} />;
      case "challenge":
        return <AddChallenge user={user} />;
      default:
        return null;
    }
  };

  return (
    <SubmissionPage>
      <SubmissionsTitle>Submissions</SubmissionsTitle>
      <ToggleContainer>
        <ToggleLabel>Add a </ToggleLabel>
        <ToggleButtons>
          <p onClick={() => setDisplayForm("solution")}>Solution</p>
          <p onClick={() => setDisplayForm("challenge")}>Challenge</p>
          <p onClick={() => setDisplayForm("resource")}>Resource</p>
        </ToggleButtons>
      </ToggleContainer>

      {addNew()}
    </SubmissionPage>
  );
}

export default Submission;
