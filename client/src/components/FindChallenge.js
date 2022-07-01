import { useState, useEffect } from "react";
import Challenge from "./Challenge";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
`;

const ChallengeStyle = styled.p`
  border: 1px solid black;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 3px;
  padding-left: 4px;
  cursor: pointer;
`;

const ChallengeListContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  /* border: 1px solid black; */
  width: 300px;
  position: relative;
`;

const ListItemContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow: auto;
`;

const ChallengeListItems = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 280px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Input = styled.input`
  margin-bottom: 20px;
`;

const P = styled.p`
  margin-left: 20px;
`;

const ControlsDiv = styled.div`
  top: 30px;
  position: sticky;
  display: flex;
  text-align: left;
  flex-direction: column;
  border: 1px solid black;
  width: 300px;
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
];

function FindChallenge({ user }) {
  const initialSelectedChallenge = {
    id: "",
    title: "",
    description: "",
    category_id: "",
    external_url: "",
    solutions: [],
  };

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [allChallenges, setAllChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialSelectedChallenge
  );

  useEffect(() => {
    getAllChallenges();
  }, []);

  async function getAllChallenges() {
    const response = await fetch("/challenges");
    const data = await response.json();
    setAllChallenges(data);
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
    .map((chal, i) => (
      <ChallengeStyle key={i} onClick={() => updateSelected(chal.id)}>
        {chal.title}
      </ChallengeStyle>
    ));

  function handleCategoryChange(e) {
    const cat = e.target.value;

    setSelectedCategory(cat);
  }

  const forUser = false;

  return (
    <PageContainer>
      <ChallengeListContainer>
        <ControlsDiv>
          <h1>Find Challenges</h1>
          <label>Filter by category</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="array">Array</option>
            <option value="binary-tree">Binary Tree</option>
            <option value="bit-manipulation">Bit Manipulation</option>
            <option value="graph">Graph</option>
            <option value="hashmap">Hash Map</option>
            <option value="linked-list">Linked List</option>
            <option value="math">Math</option>
            <option value="recursion">String</option>
            <option value="set">Set</option>
            <option value="sliding-window">Sliding Window</option>
            <option value="sort">Sort</option>
            <option value="stack-queue">Stack/Queue</option>
            <option value="string">Recursion</option>
            <option value="two-pointer">Two Pointer</option>
          </select>
          <label>Search</label>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ControlsDiv>
        <ListItemContainer>
          <ChallengeListItems>
            {displayChallenges.length > 0 ? (
              displayChallenges
            ) : (
              <P>0 challenges found.</P>
            )}
          </ChallengeListItems>
        </ListItemContainer>
      </ChallengeListContainer>
      {selectedChallenge.description && (
        <Challenge
          selectedChallenge={selectedChallenge}
          user={user}
          forUser={forUser}
          clearSelectedChallenge={() =>
            setSelectedChallenge(initialSelectedChallenge)
          }
        />
      )}
    </PageContainer>
  );
}

export default FindChallenge;
