import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserCard from "./UserCard";

const PageContainer = styled.div`
  background-color: rgb(57, 57, 57);
  height: calc(100vh - 30px);
  position: relative;
  top: 30px;
`;

const PageTitle = styled.p`
  padding: 12px;
  text-align: center;
  color: #bbb;
  font-size: 1.5rem;
`;

const UserListContainer = styled.div`
  width: 600px;
  margin: 20px auto 20px auto;
  background-color: #222;
`;

function UsersList({ user }) {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const response = await fetch("/users");
    const users = await response.json();
    setAllUsers(users);
  }

  const userCards = allUsers.map((userObj, i) => (
    <UserCard key={i} user={userObj} isMe={userObj.id === user.id} />
  ));

  return (
    <PageContainer>
      <PageTitle>Users</PageTitle>
      <UserListContainer>{userCards}</UserListContainer>
    </PageContainer>
  );
}

export default UsersList;
