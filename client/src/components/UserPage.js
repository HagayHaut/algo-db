import React, { useState, useEffect } from "react";
import Resources from "./Resources";
import PlaceholderChallenge from "./PlaceholderChallenge";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 30px);
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
`;

const UserPageContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 22vw;
  position: relative;
  height: calc(100vh + 30px);
  background-color: #c4a484;
`;

const ControlsDiv = styled.div`
  top: 30px;
  position: sticky;
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 20vw;
`;

const Input = styled.input`
  margin-bottom: 4px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const Select = styled.select`
  margin-bottom: 14px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const Label = styled.label`
  margin-top: 4px;
`;

const ListItemContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow-y: scroll;
  overflow-x: auto;
`;

const ChallengeListItems = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 20vw;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ChallengeStyle = styled.p`
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

const CATEGORIES = [
  "array",
  "hashmap",
  "linked-list",
  "binary-tree",
  "graph",
  "two-pointer",
  "sliding-window",
  "set",
  "stack-queue",
  "sort",
  "string",
  "recursion",
  "bit-manipulation",
  "math",
  "search",
];

function UserPage({ user }) {
  const initialCounts = { solution_count: 0, challenge_count: 0 };
  const initialSelectedChallenge = {
    id: "",
    title: "",
    description: "",
    category_id: "",
    external_url: "",
    solutions: [],
  };

  const [counts, setCounts] = useState(initialCounts);
  const [userChallenges, setUserChallenges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialSelectedChallenge
  );

  useEffect(() => {
    getUserChallenges();
    getCounts();
  }, []);

  async function getUserChallenges() {
    const response = await fetch(`/users/${user.id}/challenges`);
    const data = await response.json();
    setUserChallenges(data);
  }

  async function getCounts() {
    const response = await fetch(`/users/${user.id}/count`);
    const data = await response.json();
    setCounts(data);
  }

  function updateSelected(id) {
    const challenge = userChallenges.find((challenge) => challenge.id === id);
    setSelectedChallenge(challenge);
  }

  const displayChallenges = userChallenges
    .filter(
      (challenge) =>
        selectedCategory === "All" ||
        challenge.category_id === CATEGORIES.indexOf(selectedCategory) + 1
    )
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .map((chal, i) => (
      <ChallengeStyle key={i} onClick={() => updateSelected(chal.id)}>
        {chal.title}
      </ChallengeStyle>
    ));

  const forUser = true;

  return (
    <PageContainer>
      <UserPageContainer>
        <ControlsDiv>
          <PageTitle>{user.username}</PageTitle>
          <Input
            type="text"
            placeholder="Search my challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Label>Filter by category</Label>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="array">Array</option>
            <option value="binary-tree">Binary Tree</option>
            <option value="bit-manipulation">Bit Manipulation</option>
            <option value="graph">Graph</option>
            <option value="hashmap">Hash Map</option>
            <option value="linked-list">Linked List</option>
            <option value="math">Math</option>
            <option value="recursion">String</option>
            <option value="search">Search</option>
            <option value="set">Set</option>
            <option value="sliding-window">Sliding Window</option>
            <option value="sort">Sort</option>
            <option value="stack-queue">Stack/Queue</option>
            <option value="string">Recursion</option>
            <option value="two-pointer">Two Pointer</option>
          </Select>
          <h3>My Solutions:</h3>
          {counts.solution_count && (
            <p>
              {counts.solution_count} Solutions for {counts.challenge_count}{" "}
              Challenges
            </p>
          )}
        </ControlsDiv>

        <ListItemContainer>
          <ChallengeListItems>
            {!userChallenges.length ? (
              <ChallengeStyle>Loading...</ChallengeStyle>
            ) : displayChallenges.length ? (
              displayChallenges
            ) : (
              <ChallengeStyle>0 challenges found.</ChallengeStyle>
            )}
          </ChallengeListItems>
        </ListItemContainer>
      </UserPageContainer>
      {selectedChallenge.description ? (
        <Challenge
          selectedChallenge={selectedChallenge}
          user={user}
          forUser={forUser}
          clearSelectedChallenge={() =>
            setSelectedChallenge(initialSelectedChallenge)
          }
        />
      ) : (
        <PlaceholderChallenge />
      )}
      <Resources />
    </PageContainer>
  );
}

export default UserPage;
