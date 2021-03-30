import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Button from "../FormElements/Button";

import "./NavLinks.css";

function NavLinks(props) {
  const appStateContext = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users" exact>
          All Users
        </NavLink>
      </li>
      {appStateContext.isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${appStateContext.userId}/places`}>My Places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">New Place</NavLink>
          </li>
          <li>
            <Button onClick={appStateContext.logout}>Logout</Button>
          </li>
        </>
      )}
      {!appStateContext.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
