import React from "react";
import Solution from "./Solution";
import styled from "styled-components";

const ChallengeDesc = styled.div`
  border: 1px solid black;
`;

const ChallengeContainer = styled.div`
  border: 1px solid black;
  width: 44%;
  text-align: left;
`;

function Challenge({ selectedChallenge, user }) {
  const { title, external_url, description, solutions } = selectedChallenge;

  let challengeDescLines;

  if (description) {
    challengeDescLines = description
      .split("\n")
      .map((line, i) => <p key={i}>{line}</p>);
  }

  const displaySolutions = solutions
    .filter((sol) => sol.user_id === user.id)
    .map((sol, i) => <Solution key={i} selectedSolution={sol} index={i} />);

  return (
    <ChallengeContainer>
      <ChallengeDesc>
        <h4>{title}</h4>
        <h5>Challenge Description</h5>
        <p>{challengeDescLines}</p>
        {selectedChallenge.external_url && (
          <a href={external_url} target="_blank">
            Link To Challenge
          </a>
        )}
        <h4>My Solutions for {title}</h4>
        {displaySolutions}
      </ChallengeDesc>
    </ChallengeContainer>
  );
}

export default Challenge;
