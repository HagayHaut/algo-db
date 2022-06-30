import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import AddSolution from "./AddSolution";
import styled from "styled-components";

const SubmissionPage = styled.div`
  text-align: center;
  background-color: lightgrey;
  height: 100vh;
`;

function Submission({ user }) {
  const [showAddSolution, setShowAddSolution] = useState(true);

  const addNew = showAddSolution ? (
    <AddSolution user={user} />
  ) : (
    <AddChallenge />
  );

  return (
    <SubmissionPage>
      <h1>Add {showAddSolution ? "Solution" : "Challenge"}</h1>
      <button onClick={() => setShowAddSolution(!showAddSolution)}>
        {showAddSolution
          ? "Switch To Challenge Mode"
          : "Switch To Solution Mode"}
      </button>
      {addNew}
    </SubmissionPage>
  );
}

export default Submission;
