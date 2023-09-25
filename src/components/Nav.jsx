import { useState } from "react";
import { NavLink } from "react-router-dom";
// Style
import styled from "styled-components";
import { StyleSheetManager } from "styled-components";
import { MdKitchen } from "react-icons/md";

const Nav = () => {
  const [extendNav, setExtendNav] = useState(false);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => !["extendNav"].includes(prop)}
    >
      <StyledNav extendNav={extendNav}>
        <NavInner>
          <div className="left-side">
            <NavLink to={"/"}>
              <MdKitchen className="logo" />
            </NavLink>
          </div>
          <div className="right-side">
            <NavLinks>
              <StyledNavLink to={"/"}>Home</StyledNavLink>
              <StyledNavLink to={"/pantry"}>Pantry</StyledNavLink>
              <StyledNavLink to={"/pantry"}>Recipes</StyledNavLink>
              <StyledNavLink to={"/pantry"}>Manager</StyledNavLink>
              <StyledNavLink to={"/pantry"}>Profile</StyledNavLink>
              <Hamburger
                onClick={() => {
                  setExtendNav(!extendNav);
                }}
              >
                {extendNav ? <>&#10005;</> : <>&#8801;</>}
              </Hamburger>
            </NavLinks>
          </div>
        </NavInner>
        {extendNav && (
          <NavExtension>
            <StyledExtendNavLink
              to={"/"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Home
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/pantry"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Pantry
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/pantry"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Recipes
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/pantry"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Manager
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/pantry"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Profile
            </StyledExtendNavLink>
          </NavExtension>
        )}
      </StyledNav>
    </StyleSheetManager>
  );
};

export default Nav;

const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  background-color: pink;
  margin-bottom: 1rem;
  z-index: 1000;
  width: 100%;
  height: ${(props) => (props.extendNav ? "100vh" : "3.5rem")};
  background-color: pink;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    height: 3.5rem;
  }

  .left-side {
    flex: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    background-color: yellow;

    .logo {
      color: red;
      width: 2rem;
      height: auto;
    }
  }

  .right-side {
    flex: 70%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1rem;
    background-color: green;
  }
`;

const NavInner = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
`;

const NavLinks = styled.div`
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.25rem;
  text-decoration: none;
  margin-left: 1rem;
  color: black;

  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledExtendNavLink = styled(NavLink)`
  font-size: 1.5rem;
  text-decoration: none;
  margin: 10px;
`;

const Hamburger = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

const NavExtension = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
