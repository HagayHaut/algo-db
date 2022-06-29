import React from "react";
import styled from "styled-components";

const SolutionContainer = styled.div`
  border: 1px solid black;
`;

const Canvas = styled.div`
  white-space: pre-wrap;
`;

const Line = styled.p`
  margin: 0;
  font-family: "Courier New", Courier, monospace;
`;

function Solution({ selectedSolution }) {
  const { solution, time_complexity, space_complexity, challenge, notes } =
    selectedSolution;

  const displaySolution = solution
    .split("\n")
    .map((line, i) => <Line key={i}>{line}</Line>);

  return (
    <SolutionContainer>
      <p>Solution for {challenge.title}</p>
      <Canvas>{displaySolution}</Canvas>
    </SolutionContainer>
  );
}

export default Solution;
