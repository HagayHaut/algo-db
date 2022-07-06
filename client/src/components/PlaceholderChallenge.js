import React from "react";
import styled from "styled-components";
import { GiPencilRuler } from "react-icons/gi";

const PlaceholderContainer = styled.div`
  width: 56%;
  background-color: rgb(57, 57, 57);
  position: relative;
  top: 30px;
`;

const MessageContainer = styled.div``;

const IconContainer = styled.div`
  color: #bbb;
  font-size: 3rem;
  margin: 40px 0 0 0;
  text-align: center;
`;

const Logo = styled.p`
  height: auto;
  width: 200px;
  margin: 100px auto auto auto;
  font-family: "Modak";
  font-size: 2.5rem;
  color: #05d5fa;
  background-color: black;
  position: relative;
  border-radius: 5%;
  padding-top: 60px;
  padding-bottom: 0;
  padding-left: 55px;
`;

const PlaceholderMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  margin-top: 30px;
  color: #bbb;
`;

function PlaceholderChallenge() {
  return (
    <PlaceholderContainer>
      <MessageContainer>
        <Logo>algoDB</Logo>
        <IconContainer>
          <GiPencilRuler />
        </IconContainer>

        <PlaceholderMessage>Select a challenge for more</PlaceholderMessage>
      </MessageContainer>
    </PlaceholderContainer>
  );
}

export default PlaceholderChallenge;
