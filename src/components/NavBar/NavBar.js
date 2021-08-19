import React, { useState } from "react";
import "./NavBar.css";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer.js";
import PropTypes from 'prop-types';

const NavBar = ({header}) =>  {
  return (
    <nav className="navbar">
      <SidebarDrawer/>
      <h2> {header} </h2>
    </nav>
  );
};

NavBar.propTypes = {
  header: PropTypes.string
}

export default NavBar;


