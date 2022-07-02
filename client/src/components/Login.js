import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  border-radius: 5%;
  width: 400px;
  color: #fefefe;
  background-color: #151515;
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

const LoginButton = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background-color: #05d5fa;
  padding: 5px;
  font-weight: bold;
  color: black;
`;

const LoginTitle = styled.h1`
  color: white;
  margin-bottom: 17px;
`;

const Errors = styled.div``;

const Error = styled.div`
  margin-top: 4px;
`;

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
        <LoginTitle>Login</LoginTitle>
        <div>
          <Input
            type="text"
            placeholder="Enter your username..."
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <InputContainer>
          <Input
            type="password"
            placeholder="Enter your password..."
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <div>
          <LoginButton variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </LoginButton>
        </div>
        {errors.length > 0 && (
          <Errors>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </Errors>
        )}
      </StyledForm>
    </FormContainer>
  );
}

export default Login;
