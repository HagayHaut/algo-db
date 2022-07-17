import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 4px;
  display: flex;
  border-bottom: 1px solid black;
  color: #bbb;
`;

const CountsContainer = styled.div`
  width: 22%;
  margin: 2px;
  border-right: 1px solid black;
  height: 22px;
`;

const CountTitle = styled.p`
  display: relative;
  top: 3px;
  left: 3px;
  font-size: 0.4rem;
  color: #888;
`;

const Count = styled.p`
  text-align: center;
  font-size: 0.7rem;
`;

const Joined = styled.div`
  width: 30%;
  height: 22px;
  margin: 2px;
`;

const UsernameContainer = styled.div`
  width: 25%;
  height: 22px;
  border-right: 1px solid black;
  margin: 2px;
`;

function UserCard({ user, isMe }) {
  const { username, counts, joined_on } = user;

  const color = isMe ? "#05d5fa" : "#bbb";

  const usernameStyle = {
    textAlign: "center",
    fontSize: "0.7rem",
    color,
  };

  return (
    <Card>
      <UsernameContainer>
        <CountTitle>Username</CountTitle>
        <p style={usernameStyle}>{username + (isMe ? " (me)" : "")}</p>
      </UsernameContainer>
      <CountsContainer>
        <CountTitle>Solutions</CountTitle>
        <Count>{counts.solution_count} </Count>
      </CountsContainer>
      <CountsContainer>
        <CountTitle>Challenges</CountTitle>
        <Count>{counts.challenge_count} </Count>
      </CountsContainer>
      <Joined>
        <CountTitle>Joined</CountTitle>
        <Count>{joined_on}</Count>
      </Joined>
    </Card>
  );
}

export default UserCard;
