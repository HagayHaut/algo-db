import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  width: 400px;
  background-color: #222;
  margin: 10px;
  color: #bbb;
`;

const StyledForm = styled.form`
  text-align: center;
`;

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  text-align: center;
  color: #bbb;
  background-color: rgb(57, 57, 57);
  border: none;
  border-radius: 5%;
  padding: 2px;
`;

const SignupTitle = styled.h1`
  color: #bbb;
  margin-bottom: 17px;
`;

const InputContainer = styled.div`
  padding-top: 10px;
`;

const SignupButton = styled.button`
  margin-top: 20px;
  border: none;
  cursor: pointer;
  background-color: #fdee30;
  padding: 5px;
  font-weight: bold;
  color: black;
`;

const Errors = styled.div`
  padding-top: 8px;
`;

const Error = styled.div`
  margin-top: 4px;
  font-size: 13px;
`;

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <SignupTitle>Signup</SignupTitle>
        <div>
          <Input
            type="text"
            placeholder="Enter a username..."
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <InputContainer>
          <Input
            type="password"
            placeholder="Enter a password..."
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            placeholder="Confirm password..."
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </InputContainer>
        <div>
          <SignupButton type="submit">
            {isLoading ? "Loading..." : "Sign Up"}
          </SignupButton>
        </div>
        <Errors>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </Errors>
      </StyledForm>
    </FormContainer>
  );
}

export default Signup;
