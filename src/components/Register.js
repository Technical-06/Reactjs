import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";

import { useNavigate } from "react-router-dom";

function Register() {
  const [getName, setName] = useState(null);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getName !== null) {
      navigate("/");
    }
  }, [getName, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      userName: userNameRef.current.value,
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

    const response = await fetch("http://localhost:6200/register", options);
    const responseObj = await response.json();

    if (responseObj.Error === "User already Exists") {
      alert("User already Exists, Change your email");
    } else {
      localStorage.setItem("userName", responseObj.userName);
      setName(responseObj.userName);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>

      <div>
        <h1>Enter full name</h1>
        <input
          type="text"
          placeholder="Enter your full name"
          ref={userNameRef}
        />
      </div>

      <div>
        <h1>Email address</h1>
        <input type="email" placeholder="Enter email" ref={emailRef} />
      </div>

      <div>
        <h1>Password</h1>
        <input type="password" placeholder="Password" ref={passwordRef} />
      </div>
      <p className="text-center">
        Have an account,{" "}
        <a href="/login" style={{ textDecoration: "none" }}>
          Login
        </a>
      </p>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default Register;
