import React from "react";
import styled from "styled-components";

const ResourcesContainer = styled.div`
  width: 24vw;
  top: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #c4a484;
  height: calc(100vh - 30px);
`;

const PageTitle = styled.p`
  font-family: "Modak";
  text-align: center;
  font-size: 2rem;
`;

function Resources() {
  return (
    <ResourcesContainer>
      <PageTitle>Resources!</PageTitle>
    </ResourcesContainer>
  );
}

export default Resources;
