import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 30px;
  width: 33%;
  justify-content: space-around;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
  height: 30px;
  color: #fefefe;
  background-color: #131313;
`;

const H3 = styled.h3`
  cursor: pointer;
  font-size: 15px;
  padding: 5px 0 4px 0;
  color: #d4d4d4;
  &:hover {
    color: #fefefe;
  }
`;

const Logo = styled.p`
  margin-left: 4px;
  padding-bottom: 4px;
  font-family: "Modak";
  font-size: 20px;
  color: #05d5fa;
`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function NavBar({ onLogout, user }) {
  return (
    <HeaderContainer>
      <Logo>algoDB!</Logo>
      <NavContainer>
        <H3 onClick={onLogout}>Logout</H3>
        <NavLink to="/new" style={linkStyle} activeStyle={{ color: "red" }}>
          <H3>New</H3>
        </NavLink>
        <NavLink
          to="/challenges"
          style={linkStyle}
          activeStyle={{ color: "red" }}
        >
          <H3>Explore</H3>
        </NavLink>
        <NavLink to="/" style={linkStyle} activeStyle={{ color: "red" }}>
          <H3>{user.username}</H3>
        </NavLink>
      </NavContainer>
    </HeaderContainer>
  );
}

export default NavBar;
