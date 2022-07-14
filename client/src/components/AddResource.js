import React, { useState } from "react";
import TextareaInput from "./TextareaInput";
import styled from "styled-components";

const RESOURCE_CATEGORIES = [
  "Challenges",
  "Course",
  "Blog",
  "Book/PDF",
  "Video",
  "Tutorial",
  "GitHub",
];

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

const FormTitle = styled.p`
  color: #bbb;
  font-size: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: #bbb;
`;

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  border: none;
  text-align: left;
  color: white;
  background-color: rgb(57, 57, 57);
`;

const Checkbox = styled.input`
  margin: 8px;
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

const IsFreeContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  display: block;
  margin: auto;
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

function AddResource() {
  const initialFormState = {
    title: "",
    description: "",
    external_url: "",
    resource_category_id: "",
    is_free: false,
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res_cat_id =
      RESOURCE_CATEGORIES.indexOf(formState.resource_category_id) + 1;
    const body = { ...formState, resource_category_id: res_cat_id };
    fetch("/resources", {
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
      <FormTitle>New Resource</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label className="required">Resource Title</Label>
          <Input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label className="required">Resource Category</Label>
          <Select
            name="resource_category_id"
            value={formState.resource_category_id}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Blog">Blog</option>
            <option value="Book/PDF">Book/PDF</option>
            <option value="Challenges">Challenges</option>
            <option value="Course">Course</option>
            <option value="GitHub">GitHub</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Video">Video</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label className="required">Resource Link</Label>
          <Input
            type="text"
            name="external_url"
            value={formState.external_url}
            onChange={handleChange}
          ></Input>
        </InputContainer>
        <InputContainer>
          <Label className="required">
            Resource Description (Markdown Syntax Supported)
          </Label>
          <TextareaInput
            parentState={formState.description}
            isNotes={true}
            isCode={false}
            onTextChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          />
        </InputContainer>
        <IsFreeContainer>
          <Checkbox
            type="checkbox"
            name="is_free"
            checked={formState.is_free}
            onChange={() =>
              setFormState({ ...formState, is_free: !formState.is_free })
            }
          />
          <Label className="required">Free Resource?</Label>
        </IsFreeContainer>
        {errors.length > 0 && (
          <div>
            {errors.map((e, i) => (
              <p style={{ color: `bbb` }} key={i}>
                {e}
              </p>
            ))}
          </div>
        )}
        <SubmitButton type="submit">Submit Resource</SubmitButton>
      </form>
    </FormContainer>
  );
}

export default AddResource;
