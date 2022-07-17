import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 30px;
  width: 40%;
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
  color: #fefefe;
`;

const Logo = styled.p`
  margin-left: 4px;
  padding-bottom: 4px;
  font-family: "Modak";
  font-size: 20px;
  color: #05d5fa;
`;

function NavBar({ onLogout, user }) {
  return (
    <HeaderContainer>
      <Logo>algoDB</Logo>
      <NavContainer>
        <H3 onClick={onLogout}>Logout</H3>
        <NavLink to="/" className="link">
          <h3>{user.username}</h3>
        </NavLink>
        <NavLink to="/explore" className="link">
          <h3>Explore</h3>
        </NavLink>
        <NavLink to="/users" className="link">
          <h3>Users</h3>
        </NavLink>
        <NavLink to="/new" className="link">
          <h3>Add</h3>
        </NavLink>
      </NavContainer>
    </HeaderContainer>
  );
}

export default NavBar;
