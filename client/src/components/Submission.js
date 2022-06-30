import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import AddSolution from "./AddSolution";

function Submission({ user }) {
  const [showAddSolution, setShowAddSolution] = useState(true);

  const addNew = showAddSolution ? (
    <AddSolution user={user} />
  ) : (
    <AddChallenge />
  );

  return (
    <div>
      <h1>Add {showAddSolution ? "Solution" : "Challenge"}</h1>
      <button onClick={() => setShowAddSolution(!showAddSolution)}>
        {showAddSolution
          ? "Switch To Challenge Mode"
          : "Switch To Solution Mode"}
      </button>
      {addNew}
    </div>
  );
}

export default Submission;
