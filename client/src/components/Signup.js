import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  width: 400px;
  background-color: #151515;
  color: #fefefe;
  border-radius: 5%;
  margin: 10px;
`;

const StyledForm = styled.form`
  text-align: center;
`;

const Input = styled.input`
  display: block;
  height: 50%;
  width: 100%;
  margin: 7px 0 7px 0;
  text-align: center;
`;

const InputContainer = styled.div`
  padding-top: 10px;
`;

const SignupButton = styled.button`
  margin-top: 7px;
  cursor: pointer;
  background-color: #05d5fa;
  padding: 4px;
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
        <h1 style={{ marginBottom: "17px" }}>Signup</h1>
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
        <div>
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      </StyledForm>
    </FormContainer>
  );
}

export default Signup;
