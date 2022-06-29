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
      <h1>Submissions</h1>
      <button onClick={() => setShowAddSolution(!showAddSolution)}>
        {showAddSolution ? "New Challenge Mode" : "New Solution Mode"}
      </button>
      {addNew}
    </div>
  );
}

export default Submission;
