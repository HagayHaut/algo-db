import React, { useState, useEffect } from "react";
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

const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const CloseButton = styled.button`
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

function Challenge({
  selectedChallenge,
  user,
  forUser,
  clearSelectedChallenge,
}) {
  const { title, external_url, description, solutions } = selectedChallenge;

  let challengeDescLines;

  if (description) {
    challengeDescLines = description
      .split("\n")
      .map((line, i) => <p key={i}>{line}</p>);
  }

  let displaySolutions;

  if (forUser) {
    displaySolutions = solutions
      .filter((sol) => sol.user_id === user.id)
      .map((sol, i) => (
        <Solution
          key={i}
          selectedSolution={sol}
          index={i}
          user={user}
          forUser={forUser}
        />
      ));
  } else {
    displaySolutions = solutions.map((sol, i) => (
      <Solution key={i} selectedSolution={sol} index={i} user={user} />
    ));
  }

  return (
    <ChallengeContainer>
      <ChallengeDesc>
        <CloseButtonContainer>
          <CloseButton onClick={clearSelectedChallenge}>X</CloseButton>
        </CloseButtonContainer>
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
