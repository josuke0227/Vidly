import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              Movies
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/rentals">
              Rentals
            </Link>
          </li>
          {!user && (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  {user.name}
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/logout">
                  logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
