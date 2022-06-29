import React, { useState } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const FormContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  width: 50%;
  text-align: center;
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
];

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

function AddChallenge() {
  const initialFormState = {
    title: "",
    description: "",
    external_url: "",
    category_id: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleCategoryChange(e) {
    const category_id = categories.indexOf(e.target.value) + 1;
    setFormState({ ...formState, category_id });
  }

  return (
    <FormContainer>
      <h2>Add a New Challenge</h2>
      <form>
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
          <label>Challenge Description</label>
          <TextareaInput
            onTextChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          ></TextareaInput>
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
          <select
            value={formState.category}
            name="category"
            onChange={handleCategoryChange}
          >
            <option val=""></option>
            <option value="array">Array</option>
            <option value="hashmap">Hash Map</option>
            <option value="linked-list">Linked List</option>
            <option value="binary-tree">Binary Tree</option>
            <option value="graph">Graph</option>
            <option value="two-pinter">Two Pointer</option>
            <option value="sliding-window">Sliding Window</option>
            <option value="set">Set</option>
            <option value="stack-queue">Stack/Queue</option>
            <option value="sort">Sort</option>
            <option value="string">Recursion</option>
            <option value="recursion">String</option>
          </select>
        </InputContainer>

        <SubmitButton type="submit">Submit Challenge</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddChallenge;
