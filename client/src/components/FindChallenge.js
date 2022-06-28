import { useState, useEffect } from "react";

function FindChallenge() {
  const [allChallenges, setAllChallenges] = useState([]);

  useEffect(() => {
    getAllChallenges();
  }, []);

  async function getAllChallenges() {
    const response = await fetch("/challenges");
    const data = await response.json();
    setAllChallenges(data);
  }

  const challengeItems = allChallenges.map((challenge) => (
    <div>
      <p>{challenge.title}</p>
    </div>
  ));

  return (
    <div>
      <h1>Find Challenges</h1>
      {challengeItems}
    </div>
  );
}

export default FindChallenge;
