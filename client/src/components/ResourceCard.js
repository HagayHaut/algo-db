import React from "react";
import ReactMarkdown from "react-markdown";
import { HiOutlineExternalLink } from "react-icons/hi";
import styled from "styled-components";

const ResourceCardContainer = styled.div`
  width: 95%;
  position: relative;
  margin: 35px 5px 5px 5px;
  background-color: #222;
  padding: 7px;
  color: #fefefe;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  margin: 0 8px 0 8px;
`;

const Divider = styled.div`
  border-top: 1px solid #444;
  height: 1px;
  position: relative;
  margin: 0 12px 12px 12px;
`;

const IsFree = styled.p`
  float: left;
  position: relative;
  font-size: 0.75rem;
  color: #555;
`;

const Category = styled.p`
  float: right;
  position: relative;
  font-size: 0.75rem;
  color: #555;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: #0021f3;
`;

const MarkdownContainer = styled.div`
  height: 130px;
  margin-top: 10px;
  border: 1px solid #444;
  overflow-y: scroll;
  color: #ddd;
  padding: 12px;
`;

function ResourceCard({ resource }) {
  const { title, description, external_url, is_free, resource_category } =
    resource;

  return (
    <ResourceCardContainer>
      <Divider />
      <IsFree>{is_free ? "Free" : "Not Free"}</IsFree>
      <Category>{resource_category}</Category>
      <Anchor href={external_url} target="_blank">
        <Title>
          {title} <HiOutlineExternalLink />
        </Title>
      </Anchor>
      <MarkdownContainer>
        <ReactMarkdown>{description}</ReactMarkdown>
      </MarkdownContainer>
    </ResourceCardContainer>
  );
}

export default ResourceCard;
