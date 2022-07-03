import React, { useState } from "react";
import Solution from "./Solution";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { HiOutlineExternalLink } from "react-icons/hi";

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
  background-color: #222;
  color: #bbb;
  padding: 20px;
  font-size: 0.8rem;
`;

const SolutionListContainer = styled.div`
  overflow-y: auto;
  background-color: #222;
  overflow-x: hidden;
  height: calc(100vh - 65px);
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
  text-align: center;
  font-size: 16;
  display: inline;
  margin: 10px 10px 10px 12px;
`;

const Divider = styled.div`
  background-color: #444;
  width: 100%;
  height: 2px;
`;

const Hint = styled.p`
  margin-top: 15px;
  display: inline-block;
  cursor: pointer;
`;

const StyleSelectContainer = styled.div`
  position: relative;
  bottom: 5px;
  display: inline-block;
  left: 5px;
  margin: 10px 12px 0 0;
`;

const StyleSelect = styled.select`
  background-color: #222;
  width: 70px;
  font-size: 10px;
  color: #fefefe;
`;

const TitleSelectSticky = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 10px;
`;

function Challenge({
  selectedChallenge,
  user,
  forUser,
  clearSelectedChallenge,
}) {
  const [showHint, setShowHint] = useState(false);
  const [codeStyle, setCodeStyle] = useState("xt256");

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
          codeStyle={codeStyle}
        />
      ));
  } else {
    displaySolutions = solutions.map((sol, i) => (
      <Solution
        key={i}
        selectedSolution={sol}
        index={i}
        user={user}
        codeStyle={codeStyle}
      />
    ));
  }

  return (
    <ChallengeContainer>
      {external_url && (
        <ExternalUrl href={external_url} target="_blank">
          <HiOutlineExternalLink />
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
      <TitleSelectSticky>
        <AllSolutionsTitle>
          {forUser ? `${user.username}'s` : "All"} Solutions{" "}
        </AllSolutionsTitle>
        <StyleSelectContainer>
          <Label>code styles</Label>{" "}
          <StyleSelect
            value={codeStyle}
            onChange={(e) => setCodeStyle(e.target.value)}
          >
            <option value="xt256">xt256</option>
            <option value="agate">agate</option>
            <option value="arta">arta</option>
            <option value="ascetic">ascetic</option>
            <option value="dracula">dracula</option>
            <option value="gml">gml</option>
            <option value="far">far</option>
            <option value="hopscotch">hopscotch</option>
            <option value="lioshi">lioshi</option>
            <option value="magula">magula</option>
            <option value="monokai">monokai</option>
            <option value="nnfx">nnfx</option>
            <option value="nord">nord</option>
            <option value="obsidian">obsidian</option>
            <option value="ocean">ocean</option>
            <option value="pojoaque">pojoaque</option>
            <option value="purebasic">purebasic</option>
            <option value="railscasts">railscasts</option>
            <option value="routeros">routeros</option>
            <option value="srcery">srcery</option>
            <option value="tomorrow">tomorrow</option>
            <option value="vs">vs</option>
            <option value="vs2015">vs2015</option>
            <option value="sunburst">sunburst</option>
            <option value="xcode">xcode</option>
          </StyleSelect>
        </StyleSelectContainer>
      </TitleSelectSticky>

      <Divider />
      <SolutionListContainer>{displaySolutions}</SolutionListContainer>
    </ChallengeContainer>
  );
}

export default Challenge;
