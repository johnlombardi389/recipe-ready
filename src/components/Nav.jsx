import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
// Style
import styled from "styled-components";
import { StyleSheetManager } from "styled-components";
import { MdKitchen } from "react-icons/md";

const Nav = () => {
  const [extendNav, setExtendNav] = useState(false);

  const { isLoggedIn } = useAuth();

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
              <StyledNavLink to={"/recipe-ready/pantry"}>Pantry</StyledNavLink>
              <StyledNavLink to={"/recipe-ready/recipes"}>
                Recipes
              </StyledNavLink>
              <StyledNavLink to={"/recipe-ready/shopping-list"}>
                Shopping List
              </StyledNavLink>
              {isLoggedIn ? (
                <>
                  <StyledNavLink to={"/recipe-ready"}>Log Out</StyledNavLink>
                </>
              ) : (
                <>
                  <StyledNavLink to={"/recipe-ready"}>Log In</StyledNavLink>
                </>
              )}
              <Hamburger
                onClick={() => {
                  setExtendNav(!extendNav);
                }}
              >
                {extendNav ? (
                  <span className="close">&#10005;</span>
                ) : (
                  <span className="burg">&#8801;</span>
                )}
              </Hamburger>
            </NavLinks>
          </div>
        </NavInner>
        {extendNav && (
          <NavExtension>
            <StyledExtendNavLink
              to={"/recipe-ready/pantry"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Pantry
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/recipe-ready/recipes"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Recipes
            </StyledExtendNavLink>
            <StyledExtendNavLink
              to={"/recipe-ready/shopping-list"}
              onClick={() => {
                setExtendNav(!extendNav);
              }}
            >
              Shopping List
            </StyledExtendNavLink>
            {isLoggedIn ? (
              <>
                <StyledExtendNavLink
                  to={"/recipe-ready"}
                  onClick={() => {
                    setExtendNav(!extendNav);
                  }}
                >
                  Log Out
                </StyledExtendNavLink>
              </>
            ) : (
              <>
                <StyledExtendNavLink
                  to={"/recipe-ready"}
                  onClick={() => {
                    setExtendNav(!extendNav);
                  }}
                >
                  Log In
                </StyledExtendNavLink>
              </>
            )}
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
  background-color: #f97b22;
  margin-bottom: 1rem;
  z-index: 1000;
  width: 100%;
  height: ${(props) => (props.extendNav ? "40vh" : "3.5rem")};
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

    .logo {
      color: white;
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
  font-size: 1.15rem;
  text-decoration: none;
  margin-left: 1.2rem;
  color: white;
  font-family: "Mukta Vaani", sans-serif;
  font-weight: 400;

  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledExtendNavLink = styled(NavLink)`
  font-size: 1.2rem;
  text-decoration: none;
  margin: 0.5rem 0;
  font-family: "Mukta Vaani", sans-serif;
  font-weight: 400;
  color: white;
`;

const Hamburger = styled.button`
  background: none !important;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 0.5rem;

  .burg {
    font-size: 2.2rem;
  }

  .close {
    font-size: 1.5rem;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const NavExtension = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 1rem 1rem 0 0;

  @media (min-width: 700px) {
    display: none;
  }
`;
