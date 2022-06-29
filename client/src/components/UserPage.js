import React, { useState, useEffect } from "react";
import Solution from "./Solution";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

function UserPage({ user }) {
  const initialSelectedSolution = {
    id: "",
    user_id: user.id,
    challenge_id: "",
    solution: "",
    time_complexity: "",
    space_complexity: "",
    notes: "",
    challenge: { title: "" },
  };

  const [userSolutions, setUserSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(
    initialSelectedSolution
  );

  useEffect(() => {
    getUserSolutions();
  }, []);

  async function getUserSolutions() {
    const response = await fetch(`/users/${user.id}/solutions`);
    const data = await response.json();
    setUserSolutions(data);
  }

  function updateSelected(id) {
    const solution = userSolutions.find((solution) => solution.id === id);
    setSelectedSolution(solution);
  }

  const userSolutionItems = userSolutions.map((sol) => (
    <p key={sol.id} onClick={() => updateSelected(sol.id)}>
      {sol.challenge.title}
    </p>
  ));

  return (
    <PageContainer>
      <UserPageContainer>
        <h1>User Page</h1>
        <h2>Hello, {user.username}!</h2>
        <h3>My Solutions:</h3>
        {userSolutionItems}
      </UserPageContainer>
      {selectedSolution.solution && (
        <Solution selectedSolution={selectedSolution} />
      )}
    </PageContainer>
  );
}

export default UserPage;
