import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import {
  SiUdemy,
  SiFreecodecamp,
  SiKhanacademy,
  SiYoutube,
  SiLeetcode,
  SiHackerrank,
  SiEdx,
  SiStackoverflow,
  SiHackerearth,
} from "react-icons/si";

import styled from "styled-components";

const ResourcesContainer = styled.div`
  width: 28vw;
  height: 100vh;
  background-color: #222;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #222;
`;

const TopLeftContainer = styled.div`
  border-right: 1px solid #444;
  top: 30px;
  width: 18vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #222;
`;

const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
  padding: 3px 8px 3px 8px;
  position: relative;
  width: 100%;
  top: 30px;
`;

const QuickLinkTitle = styled.p`
  margin-top: 3px;
  font-size: 10px;
  color: #bbb;
  text-align: center;
`;

const ResourceLink = styled.a`
  font-size: 8px;
  color: #bbb;
  text-decoration: none;
`;

const ListItemOuterContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ListItemInnerContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 18vw;
  height: 40vh;
  overflow-y: auto;
  background: #151515;
  padding: 5px 0 5px 0;
  &::-webkit-scrollbar {
    width: 0.7em;
    border: 1px solid #000;
  }

  &::-webkit-scrollbar-track {
    background: #222;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(57, 57, 57);
  }
`;

const ResourceItem = styled.p`
  border-radius: 3px;
  font-size: 12px;
  margin: 2px 10px 2px 10px;
  padding: 4px;
  cursor: pointer;
  background-color: #151515;
  color: #ddd;
  &:hover {
    background-color: rgb(57, 57, 57);
  }
`;

const PageTitle = styled.h2`
  text-align: left;
  color: #ddd;
  font-size: 1.1rem;
  margin: 10px 0 0 12px;
`;

const Divider = styled.div`
  border-top: 1px solid #444;
  height: 1px;
  position: relative;
  width: 90%;
`;

const BigDivider = styled.div`
  border-top: 1px solid #444;
  height: 1px;
  position: relative;
  margin: 8px 12px 0 12px;
`;

const Input = styled.input`
  margin: 4px 0 8px 0;
  color: #eee;
  background-color: rgb(57, 57, 57);
  color: #ddd;
  width: 60%;
  margin-left: 10px;
  border: none;
  border-radius: 5%;
  padding: 2px;
`;

const Select = styled.select`
  background-color: rgb(57, 57, 57);
  color: #ddd;
  margin: 4px 0 4px 12px;
  width: 100%;
  border: none;
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

const Filter = styled.div`
  display: flex;
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
  const [freeOnly, setFreeOnly] = useState(true);
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
    .filter((resource) => !freeOnly || resource.is_free)
    .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
    .map((resource, i) => (
      <ResourceItem key={i} onClick={() => updateSelected(resource.id)}>
        {resource.title}
      </ResourceItem>
    ));

  return (
    <ResourcesContainer>
      <TopContainer>
        <TopLeftContainer>
          <PageTitle>Resources</PageTitle>
          <BigDivider />
          <Filter>
            <div style={{ width: "50%" }}>
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
            </div>
            <div>
              <Label>Free only?</Label>
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={() => setFreeOnly((prev) => !prev)}
              />
            </div>
          </Filter>

          <Input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {resourceCount > 0 && <Count>{resourceCount} Resources</Count>}
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
        </TopLeftContainer>

        <TopRightContainer>
          <QuickLinkTitle>QUICK LINKS</QuickLinkTitle>
          <Divider />
          <ResourceLink href="https://www.freecodecamp.org/" target="_blank">
            <SiFreecodecamp />
            &nbsp; FreeCodeCamp
          </ResourceLink>
          <Divider />
          <ResourceLink
            href="https://www.khanacademy.org/computing/computer-science/algorithms"
            target="_blank"
          >
            <SiKhanacademy />
            &nbsp; Khan Academy
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink
            href="https://leetcode.com/explore/interview/"
            target="_blank"
          >
            <SiLeetcode /> &nbsp;LeetCode
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://neetcode.io/" target="_blank">
            <SiYoutube />
            &nbsp; NeetCode
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://www.hackerearth.com/" target="_blank">
            <SiHackerearth />
            &nbsp; HackerEarth
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://www.udemy.com/" target="_blank">
            <SiUdemy />
            &nbsp; Udemy
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://www.hackerrank.com/" target="_blank">
            <SiHackerrank />
            &nbsp; HackerRank
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://www.edx.org/" target="_blank">
            <SiEdx />
            &nbsp; edX
          </ResourceLink>{" "}
          <Divider />
          <ResourceLink href="https://stackoverflow.com/" target="_blank">
            <SiStackoverflow />
            &nbsp; Stack Overflow
          </ResourceLink>
          <Divider />
        </TopRightContainer>
      </TopContainer>

      <ResourceCard resource={selectedResource} />
    </ResourcesContainer>
  );
}

export default Resources;
