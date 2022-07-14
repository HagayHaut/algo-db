import React, { useState, useEffect } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  width: 50%;
  height: 80vh;
  text-align: center;
  overflow: auto;
  margin: auto;
  background-color: #222;
  border-top: 10px solid #222;
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

const FormTitle = styled.p`
  color: #bbb;
  font-size: 1.5rem;
`;

const Label = styled.label`
  color: #bbb;
  font-size: 0.8rem;
`;

const InputContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  color: white;
  background-color: rgb(57, 57, 57);
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  border: none;
  cursor: pointer;
  background-color: #fdee30;
  padding: 5px;
  font-weight: bold;
  color: black;
`;

function AddSolution({ user }) {
  const initialFormState = {
    user_id: user.id,
    challenge_id: "",
    solution: "",
    time_complexity: "",
    space_complexity: "",
    notes: "",
    language: "",
  };

  const [allChallenges, setAllChallenges] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
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

  const challengeOptions = allChallenges
    .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
    .map((challenge) => (
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
        setErrors([]);
        setFormState(initialFormState);
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <FormContainer>
      <FormTitle>New Solution</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label className="required">Pick Challenge</Label>
          <Select
            value={formState.challenge_id}
            name="challenge_id"
            onChange={handleFormChange}
          >
            <option></option>
            {challengeOptions}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label className="required">Pick Language</Label>
          <Select
            value={formState.language}
            name="language"
            onChange={handleFormChange}
          >
            <option value=""></option>
            <option value="ada">Ada</option>
            <option value="c">C</option>
            <option value="coffeescript">CoffeeScript</option>
            <option value="csharp">C#</option>
            <option value="cpp">C++</option>
            <option value="fortran">Fortran</option>
            <option value="go">Go</option>
            <option value="haskell">Haskell</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="julia">Julia</option>
            <option value="kotlin">Kotlin</option>
            <option value="lisp">Lisp</option>
            <option value="lua">Lua</option>
            <option value="perl">Perl</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="scala">Scala</option>
            <option value="sql">SQL</option>
            <option value="typescript">TypeScript</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label className="required">Your Solution</Label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, solution: e.target.value })
            }
            parentState={formState.solution}
            isNotes={false}
            isCode={true}
          />
        </InputContainer>
        <InputContainer>
          <Label className="required">Time Complexity</Label>
          <Select
            value={formState.time_complexity}
            name="time_complexity"
            onChange={handleFormChange}
          >
            <option></option>
            {complexityOptions}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label className="required">Space Complexity</Label>
          <Select
            value={formState.space_complexity}
            name="space_complexity"
            onChange={handleFormChange}
          >
            <option></option>
            {complexityOptions}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Notes (Markdown Syntax Supported)</Label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, notes: e.target.value })
            }
            parentState={formState.notes}
            isNotes={true}
            isCode={false}
          />
        </InputContainer>
        {errors.length > 0 && (
          <div>
            {errors.map((e, i) => (
              <p style={{ color: `bbb` }} key={i}>
                {e}
              </p>
            ))}
          </div>
        )}
        <SubmitButton type="submit">Submit Solution</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddSolution;
