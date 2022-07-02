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

const ChallengeContainer = styled.div`
  border-top: 1px solid black;
  width: 66vw;
  text-align: left;
  position: relative;
  top: 30px;
  overflow-y: scroll;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const ChallengeDetails = styled.div`
  border: 1px solid black;
`;

const ChallengeDescContainer = styled.div`
  background-color: rgb(57, 57, 57);
`;

const ChallengeDescription = styled.div`
  width: 67%;
  margin: auto;
  border-radius: 10%;
  background-color: #fefefe;
  color: black;
  padding: 20px;
`;

const SolutionListContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 280px);
  background-color: #c4a484;
`;

const CloseButton = styled.button`
  float: right;
  position: relative;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const ChallengeTitle = styled.p`
  margin: 10px 0 10px 0;
  text-align: center;
  font-size: 24px;
`;

const ExternalUrl = styled.a`
  float: left;
  position: relative;
  top: 5px;
  left: 5px;
  cursor: pointer;
  text-decoration: none;
`;

const AllSolutionsTitle = styled.p`
  margin: 10px 0 10px 0;
  text-align: center;
  font-size: 16;
`;

const Divider = styled.div`
  background-color: #fefefe;
  width: 100%;
  height: 2px;
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

  function correctAorAn(str) {}

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
      <ChallengeDetails>
        {external_url && (
          <ExternalUrl>
            <a href={external_url} target="_blank">
              Source
            </a>
          </ExternalUrl>
        )}
        <CloseButton onClick={clearSelectedChallenge}>Close</CloseButton>
        <ChallengeTitle>{title}</ChallengeTitle>
        <ChallengeDescContainer>
          <ChallengeDescription>
            <ReactMarkdown>{description}</ReactMarkdown>
            <h5>Category</h5>
            <p>{CATEGORIES[category_id - 1]}</p>
          </ChallengeDescription>
        </ChallengeDescContainer>

        <AllSolutionsTitle>
          {forUser ? `${user.username}'s` : "All"} Solutions
        </AllSolutionsTitle>
        <Divider />
        <SolutionListContainer>{displaySolutions}</SolutionListContainer>
      </ChallengeDetails>
    </ChallengeContainer>
  );
}

export default Challenge;
