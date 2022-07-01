import React, { useState, useEffect } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
`;

const UserPageContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  /* border: 1px solid black; */
  width: 300px;
  position: relative;
`;

const ListItemContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow: auto;
`;

const ChallengeListItems = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 280px;
  overflow-y: auto;
  overflow-x: hidden;
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

const ControlsDiv = styled.div`
  top: 30px;
  position: sticky;
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 300px;
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
        <ControlsDiv>
          <h1>Hello, {user.username}!</h1>
          <h3>My Solutions:</h3>
        </ControlsDiv>

        <ListItemContainer>
          <ChallengeListItems>{userChallengeItems}</ChallengeListItems>
        </ListItemContainer>
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
