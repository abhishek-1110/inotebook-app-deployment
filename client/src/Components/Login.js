import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
// useHistoy has been changed with useNavigate
const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.successfulLogin) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Successfull Login", "success");
      navigate("/Home");
    } else {
      alert("Invalid credentials");
      props.showAlert("Invalid credentials", "danger");
    }
    setIsLoading(false);
  };

  const onChange = (e) => {
    // spread
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-form">
      <h4 className="mb-2 mt-2">Login in Here:</h4>
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

        <button
          type="submit"
          className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </>
  );
};

export default Login;
