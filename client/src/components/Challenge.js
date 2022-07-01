import React from "react";
import Solution from "./Solution";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const CATEGORIES = [
  "Array",
  "Hash Map",
  "Linked List",
  "Binary Tree",
  "Graph",
  "Two Pointer",
  "Sliding Window",
  "Set",
  "Stack/Queue",
  "Sort",
  "String",
  "Recursion",
  "Bit Manipulation",
  "Math",
];

const ChallengeDesc = styled.div`
  border: 1px solid black;
  background-color: #c4a484;
`;

const ChallengeContainer = styled.div`
  border-top: 1px solid black;
  width: 66vw;
  text-align: left;
  position: relative;
  top: 30px;
  overflow-y: scroll;
`;

const SolutionListContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 280px);
  background-color: white;
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

const ChallengeTitle = styled.h3`
  margin-bottom: 15px;
  text-align: center;
`;

function Challenge({
  selectedChallenge,
  user,
  forUser,
  clearSelectedChallenge,
}) {
  const { title, external_url, description, solutions, category_id } =
    selectedChallenge;

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
          <CloseButton onClick={clearSelectedChallenge}>Close</CloseButton>
          <ChallengeTitle>{title}</ChallengeTitle>
        </CloseButtonContainer>
        <ReactMarkdown>{description}</ReactMarkdown>
        <h5>Category</h5>
        <p>{CATEGORIES[category_id - 1]}</p>
        {selectedChallenge.external_url && (
          <a href={external_url} target="_blank">
            Link To Challenge
          </a>
        )}
        <h4>
          {forUser ? `${user.username}'s` : "All"} Solutions for {title}
        </h4>
        <SolutionListContainer>{displaySolutions}</SolutionListContainer>
      </ChallengeDesc>
    </ChallengeContainer>
  );
}

export default Challenge;
