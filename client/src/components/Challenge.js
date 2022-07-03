import React, { useState } from "react";
import Solution from "./Solution";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

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
  "Search",
];

const ChallengeContainer = styled.div`
  width: 56%;
  text-align: left;
  position: relative;
  top: 30px;
  overflow-y: scroll;
  background-color: rgb(57, 57, 57);
  color: #ddd;
`;

const ChallengeDescContainer = styled.div`
  background-color: rgb(57, 57, 57);
`;

const ChallengeDescription = styled.div`
  width: 67%;
  margin: auto;
  border-radius: 3%;
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
  border: 1px solid rgba(57, 57, 57);
  float: right;
  position: relative;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background-color: rgb(57, 57, 57);
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

const Hint = styled.p`
  margin-top: 15px;
  display: inline-block;
  cursor: pointer;
`;

function Challenge({
  selectedChallenge,
  user,
  forUser,
  clearSelectedChallenge,
}) {
  const [showHint, setShowHint] = useState(false);

  const { title, description, solutions, category_id, external_url } =
    selectedChallenge;

  let displaySolutions;

  const hint = CATEGORIES[category_id - 1];

  function correctAorAnHint() {
    const vowelRegex = /^[aeiou]/i;
    return vowelRegex.test(hint)
      ? `This is an ${hint} Challenge`
      : `This is a ${hint} Challenge`;
  }

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
      {external_url && (
        <ExternalUrl>
          <a href={external_url} target="_blank">
            Source
          </a>
        </ExternalUrl>
      )}
      <CloseButton onClick={clearSelectedChallenge}>
        <GrClose />
      </CloseButton>
      <ChallengeTitle>{title}</ChallengeTitle>
      <ChallengeDescContainer>
        <ChallengeDescription>
          <ReactMarkdown>{description}</ReactMarkdown>
          <Hint onClick={() => setShowHint(!showHint)}>
            {showHint ? correctAorAnHint() : "Hint"}
          </Hint>
        </ChallengeDescription>
      </ChallengeDescContainer>

      <AllSolutionsTitle>
        {forUser ? `${user.username}'s` : "All"} Solutions
      </AllSolutionsTitle>
      <Divider />
      <SolutionListContainer>{displaySolutions}</SolutionListContainer>
    </ChallengeContainer>
  );
}

export default Challenge;
