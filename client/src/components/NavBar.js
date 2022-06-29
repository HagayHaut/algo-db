import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const H3 = styled.h3`
  cursor: pointer;
  font-size: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function NavBar({ onLogout, user }) {
  return (
    <NavContainer>
      <Link to="/" style={linkStyle}>
        <H3>{user.username}</H3>
      </Link>
      <Link to="/challenges" style={linkStyle}>
        <H3>Search</H3>
      </Link>
      <Link to="/new" style={linkStyle}>
        <H3>New</H3>
      </Link>
      <H3 onClick={onLogout}>Logout</H3>
    </NavContainer>
  );
}

export default NavBar;
