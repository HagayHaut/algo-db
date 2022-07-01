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
  background-color: #c4a484;
`;

const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const CloseButton = styled.button`
  float: right;
  position: relative;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const ChallengeTitle = styled.h3`
  margin-bottom: 15px;
  text-align: center;
`;

const ExternalUrl = styled.a`
  float: left;
  position: relative;
  top: 5px;
  left: 5px;
  cursor: pointer;
  color: blue;
`;

function Challenge({
  selectedChallenge,
  user,
  forUser,
  clearSelectedChallenge,
}) {
  const { title, description, solutions, category_id, external_url } =
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
        {external_url && (
          <ExternalUrl>
            <a href={external_url} target="_blank">
              Source
            </a>
          </ExternalUrl>
        )}
        <CloseButton onClick={clearSelectedChallenge}>Close</CloseButton>
        <ChallengeTitle>{title}</ChallengeTitle>
        <ReactMarkdown>{description}</ReactMarkdown>
        <h5>Category</h5>
        <p>{CATEGORIES[category_id - 1]}</p>
        <h4>
          {forUser ? `${user.username}'s` : "All"} Solutions for {title}
        </h4>
        <SolutionListContainer>{displaySolutions}</SolutionListContainer>
      </ChallengeDesc>
    </ChallengeContainer>
  );
}

export default Challenge;
