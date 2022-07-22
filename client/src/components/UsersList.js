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
  max-height: 74vh;
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

const Input = styled.input`
  margin: 4px 0 8px 0;
  color: #eee;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
  width: 200px;
  margin-left: 10px;
  border: none;
  border-radius: 5%;
  padding: 2px;
`;

function UsersList({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const response = await fetch("/users");
    const users = await response.json();
    setAllUsers(users);
  }

  const userCards = allUsers
    .filter((userObj) =>
      userObj.username.toLowerCase().includes(search.toLowerCase())
    )
    .map((userObj, i) => (
      <UserCard key={i} user={userObj} isMe={userObj.id === user.id} />
    ));

  return (
    <PageContainer>
      <PageTitle>Users</PageTitle>

      <UserListContainer>
        <Input
          type="text"
          placeholder="Find user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {userCards}
      </UserListContainer>
    </PageContainer>
  );
}

export default UsersList;
