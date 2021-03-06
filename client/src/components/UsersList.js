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

const Divider = styled.div`
  border-top: 1px solid #111;
  width: 550px;
  margin: 0 auto 0 auto;
`;

const Controls = styled.div`
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 4px;
`;

const ControlsContainer = styled.div`
  position: fixed;
  z-index: 100;
  background-color: #1a1a1a;
  height: 35px;
  width: 600px;
`;

const SortContainer = styled.div`
  margin-left: 10px;
`;

const Radio = styled.input`
  margin: 4px;
  accent-color: #05d5fa;
`;

const RadioLabel = styled.label`
  margin: 0 30px 0 8px;
`;

const SortBy = styled.p`
  margin-right: 20px;
  padding: 4px;
  margin-left: 20px;
`;

const UserCardContainer = styled.div`
  position: relative;
  top: 35px;
`;

function UsersList({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortByDate, setSortByDate] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const response = await fetch("/users");
    const users = await response.json();
    setAllUsers(users);
  }

  let userCards = allUsers.filter((userObj) =>
    userObj.username.toLowerCase().includes(search.toLowerCase())
  );

  if (!sortByDate) {
    userCards = userCards.sort(
      (a, b) => b.counts.solution_count - a.counts.solution_count
    );
  }

  userCards = userCards.map((userObj, i) => (
    <UserCard key={i} user={userObj} isMe={userObj.id === user.id} />
  ));

  return (
    <PageContainer>
      <PageTitle>Users</PageTitle>

      <UserListContainer>
        <ControlsContainer>
          <Controls>
            <Input
              type="text"
              placeholder="Find user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SortBy>Sort by:</SortBy>
            <SortContainer>
              <Radio
                type="radio"
                checked={sortByDate}
                onChange={(e) => setSortByDate((prev) => !prev)}
              />
              <RadioLabel>Date joined</RadioLabel>
              <Radio
                type="radio"
                checked={!sortByDate}
                onChange={(e) => setSortByDate((prev) => !prev)}
              />
              <RadioLabel>Solution count</RadioLabel>
            </SortContainer>
          </Controls>
          {/* <Divider /> */}
        </ControlsContainer>
        <UserCardContainer>{userCards}</UserCardContainer>
      </UserListContainer>
    </PageContainer>
  );
}

export default UsersList;
