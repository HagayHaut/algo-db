import React from "react";
import styled from "styled-components";

const PlaceholderContainer = styled.div`
  width: 56%;
  background-color: rgb(57, 57, 57);
  position: relative;
  top: 30px;
  color: #fefefe;
`;

const MessageContainer = styled.div``;

const Logo = styled.p`
  height: auto;
  width: 200px;
  margin: 100px auto auto auto;
  font-family: "Modak";
  font-size: 2.5rem;
  color: #fdee30;
  background-color: #151515;
  position: relative;
  border-radius: 5%;
  padding-top: 42px;
  padding-bottom: 0;
  padding-left: 42px;
`;

const PlaceholderMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 30px;
`;

function PlaceholderChallenge() {
  return (
    <PlaceholderContainer>
      <MessageContainer>
        <Logo>algoDB!</Logo>
        <PlaceholderMessage>Select challenge for details</PlaceholderMessage>
      </MessageContainer>
    </PlaceholderContainer>
  );
}

export default PlaceholderChallenge;
