import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { HiOutlineExternalLink } from "react-icons/hi";
import styled from "styled-components";
import UserPage from "./UserPage";

const ResourceCardContainer = styled.div`
  width: 95%;
  position: relative;
  margin: 35px 5px 5px 5px;
  background-color: #222;
  padding: 7px;
  color: #999;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.7rem;
  text-align: center;
  margin: 0 8px 0 8px;
`;

const Divider = styled.div`
  border-top: 1px solid #444;
  height: 1px;
  position: relative;
  margin: 0 0 12px 0;
`;

const IsFree = styled.p`
  float: left;
  position: relative;
  font-size: 0.6rem;
  color: #777;
`;

const Category = styled.p`
  float: right;
  position: relative;
  font-size: 0.6rem;
  color: #777;
`;

const Anchor = styled.a`
  float: right;
  position: relative;
  text-decoration: none;
  color: #05d5fa;
`;

const MarkdownContainer = styled.div`
  height: 15vh;
  margin-top: 10px;
  border: 1px solid #444;
  overflow-y: auto;
  overflow-x: hidden;
  color: #999;
  font-size: 12px;
  padding: 12px;
  user-select: text;
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
    border-right: 1px solid rgb(21, 21, 21);
    border-left: 1px solid rgb(21, 21, 21);
  }
`;

const DeleteButton = styled.p`
  margin-bottom: 10px;
  cursor: pointer;
`;

function ResourceCard({ resource, user, onDelete }) {
  const { title, description, external_url, is_free, resource_category, id } =
    resource;

  function handleClick() {
    onDelete(id);
  }

  return (
    <ResourceCardContainer>
      <Divider />
      <IsFree>{is_free ? "Free" : "Not Free"}</IsFree>
      <Category>{resource_category}</Category>

      <Title>{title} </Title>

      <MarkdownContainer>
        <Anchor href={external_url} target="_blank">
          <HiOutlineExternalLink />{" "}
        </Anchor>
        {user.id === 1 ? (
          <DeleteButton onClick={handleClick}>Delete</DeleteButton>
        ) : null}
        <ReactMarkdown>{description}</ReactMarkdown>
      </MarkdownContainer>
    </ResourceCardContainer>
  );
}

export default ResourceCard;
