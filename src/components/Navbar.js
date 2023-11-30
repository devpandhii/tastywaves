import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Home from "../screens/Home";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container-fluid">
        <Link class="navbar-brand fs-2 fst-italic" style={{"fontFamily": "cursive"}} to="/">
          Tasty Waves
        </Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/login">Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/createuser">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
