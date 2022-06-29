import React from "react";
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

function AddChallenge() {
  return (
    <FormContainer>
      <h2>Add a New Challenge</h2>
      <form>
        <InputContainer>
          <label>Challenge Title</label>
          <Input type="text"></Input>
        </InputContainer>
        <InputContainer>
          <label>Challenge Description</label>
          <TextareaInput></TextareaInput>
        </InputContainer>
        <InputContainer>
          <label>External URL (optional)</label>
          <Input type="text"></Input>
        </InputContainer>
        <InputContainer>
          <label>Challenge Category</label>
          <select>
            <option></option>
            <option>Array</option>
            <option>Hash Map</option>
            <option>Linked List</option>
            <option>Binary Tree</option>
            <option>Graph</option>
            <option>Two Pointer</option>
            <option>Sliding Window</option>
            <option>Set</option>
            <option>Sort</option>
            <option>Stack/Queue</option>
            <option>Recursion</option>
            <option>String</option>
          </select>
        </InputContainer>

        <SubmitButton type="submit">Submit Challenge</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddChallenge;
