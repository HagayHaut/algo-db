import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const ResourceCardContainer = styled.div`
  height: 100%;
  width: 95%;
  position: relative;
  margin: 35px 5px 5px 5px;
  background-color: #fefefe;
  padding: 7px;
  overflow-y: scroll;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
`;

const IsFree = styled.p`
  float: left;
  position: relative;
  font-size: 0.75rem;
`;

const Category = styled.p`
  float: right;
  position: relative;
  font-size: 0.75rem;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: blue;
`;

function ResourceCard({ resource }) {
  const { title, description, external_url, is_free, resource_category } =
    resource;

  return (
    <ResourceCardContainer>
      <IsFree>{is_free ? "Free" : "Not Free"}</IsFree>
      <Category>{resource_category}</Category>
      <Anchor href={external_url} target="_blank">
        <Title>{title}</Title>
      </Anchor>
      <ReactMarkdown>{description}</ReactMarkdown>
    </ResourceCardContainer>
  );
}

export default ResourceCard;
