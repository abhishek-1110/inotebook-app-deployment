import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  // use location can be used to highlight the active link in Navbar
  let location = useLocation();

  React.useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
 
  let navigate = useNavigate();
  const handleLogout =  () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem('token') ? <div className="d-flex">
            <Link type="button" className="btn btn-secondary mx-2" to="/login">
              Login
            </Link>
            <Link type="button" className="btn btn-primary" to="/signup">
              Sign up
            </Link>
          </div>
          : <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>} 
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
