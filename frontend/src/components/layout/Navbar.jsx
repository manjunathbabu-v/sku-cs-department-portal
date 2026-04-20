import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear context + localStorage
    navigate("/login");
  };

  const role = user?.role?.toLowerCase(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          SKU Computer Science & Technology
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

  
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/faculty">Faculty</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold ${
                  user ? "text-success" : "text-danger"
                }`}
                to="/dashboard"
              >
                {user ? "Dashboard" : "Login"}
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item ms-3">
                  <span className="nav-link fw-semibold text-dark">
                    Welcome, {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;