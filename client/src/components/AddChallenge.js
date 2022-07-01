import React, { useState } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const FormContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  width: 50%;
  text-align: center;
  margin: auto;
  background-color: white;
`;

const categories = [
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

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  text-align: center;
  color: white;
  background-color: rgb(57, 57, 57);
`;

const Select = styled.select`
  color: white;
  background-color: rgb(57, 57, 57);
`;

const InputContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
`;

function AddChallenge() {
  const initialFormState = {
    title: "",
    description: "",
    external_url: "",
    category_id: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [newChallenge, setNewChallenge] = useState({});
  const [errors, setErrors] = useState([]);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleCategoryChange(e) {
    const category_id = categories.indexOf(e.target.value) + 1;
    setFormState({ ...formState, category_id });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = { ...formState, category_id: parseInt(formState.category_id) };
    fetch("/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setNewChallenge(data);
          setErrors([]);
          setFormState(initialFormState);
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <FormContainer>
      <h2>Add a New Challenge</h2>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <label>Challenge Title</label>
          <Input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleFormChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <label>Challenge Description (Markdown Syntax Supported)</label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            parentState={formState.description}
            isNotes={false}
            isCode={false}
          />
        </InputContainer>
        <InputContainer>
          <label>External URL (optional)</label>
          <Input
            type="text"
            name="external_url"
            value={formState.external_url}
            onChange={handleFormChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <label>Challenge Category</label>
          <Select
            value={formState.category}
            name="category"
            onChange={handleCategoryChange}
          >
            <option val=""></option>
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
            <option value="two-pinter">Two Pointer</option>
          </Select>
        </InputContainer>
        {errors.length > 0 && (
          <div>
            {errors.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </div>
        )}
        <SubmitButton type="submit">Submit Challenge</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddChallenge;
