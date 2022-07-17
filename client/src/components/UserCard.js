import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 4px;
  display: flex;
  border: 1px solid black;
  color: #bbb;
`;

const Counts = styled.div`
  width: 45%;
  background-color: black;
  margin: 2px;
`;

const Joined = styled.div`
  width: 30%;
  background-color: black;
  margin: 2px;
`;

function UserCard({ user, isMe }) {
  const { username, counts, joined_on } = user;

  const color = isMe ? "#05d5fa" : "#bbb";

  const usernameStyle = {
    width: "25%",
    backgroundColor: "black",
    color,
  };

  return (
    <Card>
      <p style={usernameStyle}>{username}</p>
      <Counts>
        {counts.solution_count} Solutions, {counts.challenge_count} Challenges
      </Counts>
      <Joined>Joined {joined_on}</Joined>
    </Card>
  );
}

export default UserCard;
