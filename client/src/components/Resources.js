import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import styled from "styled-components";

const ResourcesContainer = styled.div`
  width: 28vw;
  top: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #c4a484;
  height: calc(100vh - 30px);
`;

const PageTitle = styled.p`
  font-family: "Modak";
  text-align: center;
  font-size: 2rem;
`;

const Input = styled.input`
  margin-bottom: 4px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const Select = styled.select`
  margin-bottom: 10px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const Label = styled.label`
  margin-top: 4px;
`;

const ListItemOuterContainer = styled.div`
  position: relative;
  overflow: auto;
`;

const ListItemInnerContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 20vw;
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px 0 5px 0;
`;

const ResourceItem = styled.p`
  border: 1px solid black;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2px;
  padding-top: 3px;
  padding-left: 4px;
  cursor: pointer;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
  &:hover {
    background-color: rgb(72, 72, 72);
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
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState(
    initialSelectedResource
  );

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    const firstResource = resources[0];
    setSelectedResource(firstResource);
  }, [resources]);

  async function getResources() {
    const response = await fetch("/resources");
    const data = await response.json();
    setResources(data);
  }

  function updateSelected(id) {
    const newSelectedResource = resources.find(
      (resource) => resource.id === id
    );
    setSelectedResource(newSelectedResource);
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
        {resource.title}
      </ResourceItem>
    ));

  return (
    <ResourcesContainer>
      <PageTitle>Resources!</PageTitle>
      <Input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
