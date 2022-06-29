import React, { useState, useEffect } from "react";
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

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
`;

function AddSolution() {
  const [allChallenges, setAllChallenges] = useState([]);

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

  return (
    <FormContainer>
      <h2>Add a New Solution</h2>
      <form>
        <InputContainer>
          <label>Pick Challenge</label>
          <select>
            <option></option>
            {challengeOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Your Solution:</label>
          <TextArea></TextArea>
        </InputContainer>
        <InputContainer>
          <label>Time Complexity</label>
          <select>
            <option></option>
            {complexityOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Space Complexity</label>
          <select>
            <option></option>
            {complexityOptions}
          </select>
        </InputContainer>
        <InputContainer>
          <label>Solution Notes:</label>
          <TextArea></TextArea>
        </InputContainer>

        <SubmitButton type="submit">Submit Solution</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddSolution;
