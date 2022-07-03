import React, { useState, useEffect } from "react";
import Resources from "./Resources";
import PlaceholderChallenge from "./PlaceholderChallenge";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 30px);
  background-color: #222;
  color: #fefefe;
`;

const PageTitle = styled.h2`
  text-align: left;
  color: #ddd;
  font-size: 1.5rem;
  margin: 10px 0 0 12px;
`;

const UserPageContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 22vw;
  position: relative;
  height: 100vh;
  background-color: #222;
`;

const ControlsDiv = styled.div`
  top: 30px;
  position: sticky;
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 20vw;
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

const ListItemContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ChallengeListItems = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 20vw;
  overflow: hidden;
  background: #151515;
  padding: 8px 0 8px 0;
`;

const ChallengeStyle = styled.p`
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
          <Input
            type="text"
            placeholder="Search my challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {counts.solution_count && (
            <Count>
              {counts.solution_count} Solutions for {counts.challenge_count}{" "}
              Challenges
            </Count>
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
