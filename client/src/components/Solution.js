import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";

const SolutionContainer = styled.div`
  border: 1px solid black;
  width: 40%;
`;

const NotesContainer = styled.div`
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
      <SyntaxHighlighter
        language={language}
        style={obsidian}
        wrapLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {solution}
      </SyntaxHighlighter>
      <NotesContainer>
        <h5>Time Complexity</h5>
        <p>{time_complexity}</p>
        <h5>Space Complexity</h5>
        <p>{space_complexity}</p>
        <h5>Notes</h5>
        <p>{notes}</p>
      </NotesContainer>
    </SolutionContainer>
  );
}

export default Solution;
