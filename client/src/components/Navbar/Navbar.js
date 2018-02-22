import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          Pathfinder Scraper
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/about"
              ? "active"
              : ""
          }
        >
          <Link to="/">About</Link>
        </li>
        <li
          className={window.location.pathname === "/classes" ? "active" : ""}
        >
          <Link to="/classes">Classes</Link>
        </li>
        <li className={window.location.pathname === "/character" ? "active" : ""}>
          <Link to="/character">Character</Link>
        </li>
      </ul>
    </div>
  </nav>;

export default Navbar;
