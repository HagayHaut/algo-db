import React, { useState } from "react";
import AddChallenge from "./AddChallenge";
import AddSolution from "./AddSolution";

function Submission() {
  const [showAddSolution, setShowAddSolution] = useState(true);

  const addNew = showAddSolution ? <AddSolution /> : <AddChallenge />;

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
