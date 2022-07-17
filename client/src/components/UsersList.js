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
  padding-top: 12px;
  text-align: center;
  color: #bbb;
  font-size: 1.5rem;
`;

const UserListContainer = styled.div`
  width: 600px;
  height: 80%;
  margin: 20px auto 80px auto;
  background-color: #222;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.7em;
  }

  &::-webkit-scrollbar-track {
    background: #222;
    border-right: 1px solid rgb(57, 57, 57);
    border-left: 1px solid rgb(57, 57, 57);
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(57, 57, 57);
  }
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
