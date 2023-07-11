import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Signup.css';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password, confirmpassword } = credentials;
    if (password.length < 5) {
      props.showAlert("Password length should be greater than 5", "danger");
      setIsLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      props.showAlert(
        "Password and confirm password doesn't matches. Please check",
        "danger"
      );
      setIsLoading(false);
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Successful Signup", "success");
      navigate("/Home");
    } else {
      props.showAlert("User already exists", "danger");
    }
    setIsLoading(false);
  };

  const onChange = (e) => {
    // spread
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ paddingTop: "15px" }}>
      <h4 className="mb-2">Sign Up Here:</h4>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            value={credentials.confirmpassword}
            name="confirmpassword"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></div>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
