import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

function NavLinks(props) {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users" exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/:userId/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">New Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
