import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";

const SolutionContainer = styled.div`
  border: 1px solid black;
`;

function Solution({ selectedSolution }) {
  const {
    solution,
    time_complexity,
    space_complexity,
    challenge,
    notes,
    language,
  } = selectedSolution;

  return (
    <SolutionContainer>
      <p>Solution for {challenge.title}</p>
      <SyntaxHighlighter language={language} style={obsidian}>
        {solution}
      </SyntaxHighlighter>
    </SolutionContainer>
  );
}

export default Solution;
