import React, { useState, useEffect } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: auto;
`;

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 95vh;
  overflow: scroll;
`;

const UserChallenge = styled.p`
  border: 1px solid black;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 3px;
  padding-left: 4px;
  cursor: pointer;
  width: 280px;
  text-align: left;
`;

function UserPage({ user }) {
  const initialSelectedChallenge = {
    id: "",
    title: "",
    description: "",
    category_id: "",
    external_url: "",
    solutions: [],
  };

  const [userChallenges, setUserChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialSelectedChallenge
  );

  useEffect(() => {
    getUserChallenges();
  }, []);

  async function getUserChallenges() {
    const response = await fetch(`/users/${user.id}/challenges`);
    const data = await response.json();
    setUserChallenges(data);
  }

  function updateSelected(id) {
    const challenge = userChallenges.find((challenge) => challenge.id === id);
    setSelectedChallenge(challenge);
  }

  const userChallengeItems = userChallenges.map((chal, i) => (
    <UserChallenge key={i} onClick={() => updateSelected(chal.id)}>
      {chal.title}
    </UserChallenge>
  ));

  const forUser = true;

  return (
    <PageContainer>
      <UserPageContainer>
        <h1>Hello, {user.username}!</h1>
        <h3>My Solutions:</h3>
        {userChallengeItems}
      </UserPageContainer>
      {selectedChallenge.description && (
        <Challenge
          selectedChallenge={selectedChallenge}
          user={user}
          forUser={forUser}
          clearSelectedChallenge={() =>
            setSelectedChallenge(initialSelectedChallenge)
          }
        />
      )}
    </PageContainer>
  );
}

export default UserPage;
