import React, { useState } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  width: 50%;
  height: 80vh;
  overflow: auto;
  text-align: center;
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

const categories = [
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

const FormTitle = styled.p`
  color: #bbb;
  font-size: 1.5rem;
`;

const Label = styled.label`
  color: #bbb;
  font-size: 0.8rem;
`;

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  text-align: left;
  color: #bbb;
  background-color: rgb(57, 57, 57);
  border: none;
  border-radius: 5%;
  padding: 2px;
`;

const Select = styled.select`
  color: #bbb;
  background-color: rgb(57, 57, 57);
`;

const InputContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
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

function AddChallenge() {
  const initialFormState = {
    title: "",
    description: "",
    external_url: "",
    category_id: "",
  };

  const [formState, setFormState] = useState(initialFormState);
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
        r.json().then(() => {
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
      <FormTitle>New Challenge</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label className="required">Challenge Title</Label>
          <Input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleFormChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label className="required">
            Challenge Description (Markdown Syntax Supported)
          </Label>
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
          <Label>External URL</Label>
          <Input
            type="text"
            name="external_url"
            value={formState.external_url}
            onChange={handleFormChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label className="required">Challenge Category</Label>
          <Select
            value={formState.category}
            name="category"
            onChange={handleCategoryChange}
          >
            <option val=""></option>
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
            <option value="two-pinter">Two Pointer</option>
          </Select>
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
        <SubmitButton type="submit">Submit Challenge</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddChallenge;
