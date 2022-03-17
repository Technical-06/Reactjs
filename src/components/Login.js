// import React from "react";

// function Login() {
//   return "hello";
//   // <div>
//   //   <h3> Login </h3>
//   //   <input
//   //     placeholder="Email..."
//   //     onChange={(event) => {
//   //       setLoginEmail(event.target.value);
//   //     }}
//   //   />
//   //   <input
//   //     type="password"
//   //     placeholder="Password..."
//   //     // onChange={(event) => {
//   //     //   setLoginPassword(event.target.value);
//   //     // }}
//   //   />

//   //   <button onClick={login}> Login</button>
//   // </div>
// }

// export default Login;
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import jwt from "jwt-decode";

function Login() {
  const [getToken, setToken] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if (getToken !== null) {
      navigate("/");
    }
  }, [getToken, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/users/login", qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        const userData = jwt(res.data.token);
        localStorage.setItem("userName", userData.userName);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <h1>Email address</h1>
        <input type="email" placeholder="Enter email" ref={emailRef} />
      </div>

      <div>
        <h1>Password</h1>
        <input type="password" placeholder="Password" ref={passwordRef} />
      </div>
      <p className="text-center">
        Don't have an account,{" "}
        <a href="/register" style={{ textDecoration: "none" }}>
          Create one
        </a>
      </p>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
