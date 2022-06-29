import React from "react";
import styled from "styled-components";

const SolutionContainer = styled.div`
  border: 1px solid black;
`;

function Solution({ solution }) {
  console.log(solution);
  return (
    <SolutionContainer>
      Solution for {solution.challenge.title}
    </SolutionContainer>
  );
}

export default Solution;
