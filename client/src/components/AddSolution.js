import React, { useState, useEffect } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const FormContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  width: 50%;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  text-align: center;
`;

const InputContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
`;

function AddSolution({ user }) {
  const initialFormState = {
    user_id: user.id,
    challenge_id: "",
    solution: "",
    time_complexity: "",
    space_complexity: "",
    notes: "",
  };

  const [allChallenges, setAllChallenges] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [newSolution, setNewSolution] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getAllChallenges();
  }, []);

  async function getAllChallenges() {
    const response = await fetch("/challenges");
    const data = await response.json();
    setAllChallenges(data);
  }

  const complexities = [
    "O(1)",
    "O(log-n)",
    "O(n-log-n)",
    "O(n)",
    "O(n^2)",
    "O(n!)",
  ];

  const challengeOptions = allChallenges.map((challenge) => (
    <option key={challenge.id} value={challenge.id}>
      {challenge.title}
    </option>
  ));

  const complexityOptions = complexities.map((complexity) => (
    <option key={complexity} value={complexity}>
      {complexity}
    </option>
  ));

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      ...formState,
      challenge_id: parseInt(formState.challenge_id),
    };
    fetch("/solutions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setNewSolution(data);
          setFormState(initialFormState);
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <FormContainer>
      <h2>Add a New Solution</h2>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <label>Pick Challenge</label>
          <select
            value={formState.challenge_id}
            name="challenge_id"
            onChange={handleFormChange}
          >
            <option></option>
            {challengeOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Your Solution:</label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, solution: e.target.value })
            }
          />
        </InputContainer>
        <InputContainer>
          <label>Time Complexity</label>
          <select
            value={formState.time_complexity}
            name="time_complexity"
            onChange={handleFormChange}
          >
            <option></option>
            {complexityOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Space Complexity</label>
          <select
            value={formState.space_complexity}
            name="space_complexity"
            onChange={handleFormChange}
          >
            <option></option>
            {complexityOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Solution Notes:</label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, notes: e.target.value })
            }
          />
        </InputContainer>
        {errors.length > 0 && (
          <div>
            {errors.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </div>
        )}
        <SubmitButton type="submit">Submit Solution</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddSolution;
