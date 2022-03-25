import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";

function Login() {
  const [getName, setName] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if (getName !== null) {
      navigate("/");
    }
  }, [getName, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      userEmail: emailRef.current.value,
      userPassword: passwordRef.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("http://localhost:6200/login", options);
    const responseObj = await response.json();

    if (responseObj.Error === "Login Failed") {
      alert("Check your Passwword or Email");
    } else {
      localStorage.setItem("userName", responseObj.userName);
      setName(responseObj.userName);
    }
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
