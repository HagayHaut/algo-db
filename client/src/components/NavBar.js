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

const H3 = styled.p`
  cursor: pointer;
  font-size: 12px;
  padding: 7px 0 4px 0;
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
          <p style={{ fontSize: "12px" }}>{user.username}</p>
        </NavLink>
        <NavLink to="/new" className="link">
          <p style={{ fontSize: "12px" }}>Add</p>
        </NavLink>
        <NavLink to="/users" className="link">
          <p style={{ fontSize: "12px" }}>Users</p>
        </NavLink>
        <NavLink to="/explore" className="link">
          <p style={{ fontSize: "12px" }}>Explore</p>
        </NavLink>
      </NavContainer>
    </HeaderContainer>
  );
}

export default NavBar;
