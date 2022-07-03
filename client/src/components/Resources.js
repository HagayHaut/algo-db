import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import styled from "styled-components";

const ResourcesContainer = styled.div`
  width: 28vw;
  top: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #222;
  height: calc(100vh - 30px);
`;

const PageTitle = styled.h2`
  text-align: left;
  color: #ddd;
  font-size: 1.5rem;
  margin: 10px 0 0 12px;
`;

const Input = styled.input`
  margin: 4px 0 8px 0;
  color: #eee;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
  width: 80%;
  margin-left: 10px;
`;

const Select = styled.select`
  background-color: rgb(57, 57, 57);
  color: #ddd;
  margin: 4px 0 4px 12px;
  width: 50%;
`;

const Label = styled.label`
  margin: 10px 0 4px 12px;
  font-size: 10px;
  color: #999;
`;

const Count = styled.p`
  font-size: 10px;
  margin: 0 0 8px 12px;
  color: #999;
`;

const ListItemOuterContainer = styled.div`
  position: relative;
  overflow: auto;
`;

const ListItemInnerContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 20vw;
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #151515;
  padding: 5px 0 5px 0;
`;

const ResourceItem = styled.p`
  border-radius: 3px;
  font-size: 13px;
  margin: 2px 10px 2px 10px;
  padding: 4px;
  cursor: pointer;
  background-color: #151515;
  color: #ddd;
  &:hover {
    background-color: rgb(57, 57, 57);
  }
`;

function Resources() {
  const initialSelectedResource = {
    id: null,
    title: "",
    description: "",
    resource_category: "",
    external_url: "",
    is_free: null,
  };

  const [search, setSearch] = useState("");
  const [resourceCount, setResourceCount] = useState(0);
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState(
    initialSelectedResource
  );

  useEffect(() => {
    getResources();
    getCount();
  }, []);

  useEffect(() => {
    if (!resources.length) return;
    const firstResource = resources[0];
    setSelectedResource(firstResource);
  }, [resources]);

  async function getResources() {
    const response = await fetch("/resources");
    const data = await response.json();
    setResources(data);
  }

  async function getCount() {
    const response = await fetch("/resources/count");
    const data = await response.json();
    setResourceCount(data.resources_count);
  }

  function updateSelected(id) {
    const newSelectedResource = resources.find(
      (resource) => resource.id === id
    );
    setSelectedResource(newSelectedResource);
  }

  function limitChars(str) {
    return str.length > 28 ? str.slice(0, 25) + "..." : str;
  }

  const displayResources = resources
    .filter(
      (resource) =>
        selectedCategory === "All" ||
        selectedCategory === resource.resource_category
    )
    .filter(
      (resource) =>
        resource.description.toLowerCase().includes(search.toLowerCase()) ||
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.external_url.toLowerCase().includes(search.toLowerCase())
    )
    .map((resource, i) => (
      <ResourceItem key={i} onClick={() => updateSelected(resource.id)}>
        {limitChars(resource.title)}
      </ResourceItem>
    ));

  return (
    <ResourcesContainer>
      <PageTitle>Resources</PageTitle>
      <Label>Filter by category</Label>
      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Blog">Blog</option>
        <option value="Book/PDF">Book/PDF</option>
        <option value="Challenges">Challenges</option>
        <option value="Course">Course</option>
        <option value="GitHub">GitHub</option>
        <option value="Tutorial">Tutorial</option>
        <option value="Video">Video</option>
      </Select>
      <Input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {resourceCount && <Count>{resourceCount} Resources</Count>}
      <ListItemOuterContainer>
        <ListItemInnerContainer>
          {!resources.length ? (
            <ResourceItem>Loading...</ResourceItem>
          ) : displayResources.length ? (
            displayResources
          ) : (
            <ResourceItem>0 challenges found.</ResourceItem>
          )}
        </ListItemInnerContainer>
      </ListItemOuterContainer>
      <ResourceCard resource={selectedResource} />
    </ResourcesContainer>
  );
}

export default Resources;
