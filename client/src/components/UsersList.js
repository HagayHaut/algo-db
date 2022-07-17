import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: rgb(57, 57, 57);
  height: calc(100vh - 30px);
  position: relative;
  top: 30px;
`;

const PageTitle = styled.p``;

function UsersList({ user }) {
  return (
    <PageContainer>
      <PageTitle>{user.username}</PageTitle>
    </PageContainer>
  );
}

export default UsersList;
