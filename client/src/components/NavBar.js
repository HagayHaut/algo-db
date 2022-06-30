import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid black;
  height: 5vh; ;
`;

const H3 = styled.h3`
  cursor: pointer;
  font-size: 3.5vh;
  margin-left: 1vh;
  margin-right: 3vh;
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function NavBar({ onLogout, user }) {
  return (
    <NavContainer>
      <H3 onClick={onLogout}>Logout</H3>
      <Link to="/new" style={linkStyle}>
        <H3>New</H3>
      </Link>
      <Link to="/challenges" style={linkStyle}>
        <H3>Explore</H3>
      </Link>
      <Link to="/" style={linkStyle}>
        <H3>{user.username}</H3>
      </Link>
    </NavContainer>
  );
}

export default NavBar;
