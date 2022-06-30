import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";

const SolutionContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  text-align: left;
`;

const NotesContainer = styled.div`
  border: 1px solid black;
`;

const ChallengeDesc = styled.div`
  border: 1px solid black;
`;

function Solution({ selectedSolution, index }) {
  const { solution, time_complexity, space_complexity, notes, language } =
    selectedSolution;

  function getLanguage(str) {
    switch (str) {
      case "csharp":
        return "C#";
      case "cpp":
        return "C++";
      case "php":
        return "PHP";
      default:
        return str[0].toUpperCase() + str.slice(1);
    }
  }

  return (
    <SolutionContainer>
      <h4>{index + 1}.</h4>
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
        <h5>Language</h5>
        <p>{getLanguage(language)}</p>
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
