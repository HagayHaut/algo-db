import { useState, useEffect } from "react";
import Challenge from "./Challenge";
import Resources from "./Resources";
import styled from "styled-components";
import PlaceholderChallenge from "./PlaceholderChallenge";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 30px);
  background-color: #222;
  color: #ddd;
`;

const ChallengeListContainer = styled.div`
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

const ListItemContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow-x: hidden;
  overflow-y: auto;

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
  margin: 8px 12px 0 12px;
`;

const Input = styled.input`
  margin: 4px 0 8px 0;
  color: #eee;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
  width: 80%;
  margin-left: 10px;
  border: none;
  border-radius: 5%;
  padding: 2px;
`;

const Select = styled.select`
  background-color: rgb(57, 57, 57);
  color: #ddd;
  margin: 4px 0 4px 12px;
  width: 79%;
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

const CATEGORIES = [
  "array",
  "hashmap",
  "linked-list",
  "tree",
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
  "dynamic-programming",
];

function FindChallenge({ user }) {
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [allChallenges, setAllChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialSelectedChallenge
  );

  useEffect(() => {
    getAllChallenges();
    getCounts();
  }, []);

  async function getAllChallenges() {
    const response = await fetch("/challenges");
    const data = await response.json();
    setAllChallenges(data);
  }

  async function getCounts() {
    const response = await fetch("/count");
    const data = await response.json();
    setCounts(data);
  }

  function updateSelected(id) {
    const challenge = allChallenges.find((challenge) => challenge.id === id);
    setSelectedChallenge(challenge);
  }

  const displayChallenges = allChallenges
    .filter(
      (challenge) =>
        selectedCategory === "All" ||
        challenge.category_id === CATEGORIES.indexOf(selectedCategory) + 1
    )
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
    .map((chal, i) => (
      <ChallengeStyle key={i} onClick={() => updateSelected(chal.id)}>
        {chal.title}
      </ChallengeStyle>
    ));

  const forUser = false;

  return (
    <PageContainer>
      <ChallengeListContainer>
        <ControlsDiv>
          <PageTitle>Challenges</PageTitle>
          <Divider />
          <Label>Filter by category</Label>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="array">Array</option>
            <option value="bit-manipulation">Bit Manipulation</option>
            <option value="dynamic-programming">Dynamic Programming</option>
            <option value="graph">Graph</option>
            <option value="hashmap">Hash Map</option>
            <option value="linked-list">Linked List</option>
            <option value="math">Math</option>
            <option value="recursion">Recursion</option>
            <option value="search">Search</option>
            <option value="set">Set</option>
            <option value="sliding-window">Sliding Window</option>
            <option value="sort">Sort</option>
            <option value="stack-queue">Stack/Queue</option>
            <option value="string">String</option>
            <option value="tree">Tree</option>
            <option value="two-pointer">Two Pointer</option>
          </Select>
          <Input
            type="text"
            placeholder="Search all challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {counts.solution_count ? (
            <Count>
              {search.length
                ? `${displayChallenges.length} Results`
                : `${counts.solution_count} Solutions for ${counts.challenge_count} Challenges`}
            </Count>
          ) : null}
        </ControlsDiv>
        <ListItemContainer>
          <ChallengeListItems>
            {!allChallenges.length ? (
              <ChallengeStyle>Loading...</ChallengeStyle>
            ) : displayChallenges.length ? (
              displayChallenges
            ) : (
              <ChallengeStyle>0 challenges found.</ChallengeStyle>
            )}
          </ChallengeListItems>
        </ListItemContainer>
      </ChallengeListContainer>
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
      <Resources user={user} />
    </PageContainer>
  );
}

export default FindChallenge;
