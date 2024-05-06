import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://personal-budget-back.onrender.com/api/v1/users/login", inputFields)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // value.toast.push({status: "success", msg:"User signed up successfully"})
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("isAuthenticated", "true");
          // value.token = res.data.accessToken;
          // value.isAuthenticated = true;
          // value.user = res.data.user;
          navigate("/dashboard");
        } else {
          const errorData = res.data.message;
          console.error("Error signing the user:", errorData.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <label for="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2 signin" type="submit">
          Sign in
        </button>
        <p style={{color:"white"}}>
          Create an account here <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
