import { useState, useEffect } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: auto;
`;

const ChallengeStyle = styled.p`
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 3px;
  padding-left: 4px;
  cursor: pointer;
`;

const ChallengeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

function FindChallenge({ user }) {
  const initialSelectedChallenge = {
    id: "",
    title: "",
    description: "",
    category_id: "",
    external_url: "",
    solutions: [],
  };

  const [allChallenges, setAllChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialSelectedChallenge
  );

  useEffect(() => {
    getAllChallenges();
  }, []);

  async function getAllChallenges() {
    const response = await fetch("/challenges");
    const data = await response.json();
    setAllChallenges(data);
  }

  const challengeItems = allChallenges.map((chal, i) => (
    <ChallengeStyle key={i} onClick={() => updateSelected(chal.id)}>
      {chal.title}
    </ChallengeStyle>
  ));

  function updateSelected(id) {
    const challenge = allChallenges.find((challenge) => challenge.id === id);
    setSelectedChallenge(challenge);
  }

  const forUser = false;

  return (
    <PageContainer>
      <ChallengeListContainer>
        <h1>Find Challenges</h1>
        {challengeItems}
      </ChallengeListContainer>
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

export default FindChallenge;
