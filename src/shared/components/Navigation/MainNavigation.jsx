import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop/Backdrop";

function MainNavigation(props) {
  const [drowerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drowerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {drowerIsOpen && (
        <SideDrawer onClick={closeDrawerHandler} show={drowerIsOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
          <Link to="/">Playgrounder</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
