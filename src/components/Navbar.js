import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Home from "../screens/Home";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container-fluid">
        <Link class="navbar-brand fs-2 fst-italic" style={{ "fontFamily": "cursive" }} to="/">
          Tasty Waves
        </Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2">
            <li class="nav-item">
              <Link class="nav-link active fs-5" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li class="nav-item">
                <Link class="nav-link active fs-5" to="/">My Orders</Link>
              </li> :
              ""}

          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className="d-flex">
              <Link class="btn bg-white text-success mx-2" to="/login">Login</Link>
              <Link class="btn bg-white text-success mx-2" to="/createuser">Sign Up</Link>
            </div>
            :
            <div className="d-flex">
              <div>
                <Link class="btn bg-white text-success mx-2">Cart</Link>
              </div>
              <div>
                <Link class="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          }


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
