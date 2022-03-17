// import React, { useRef } from "react";
// import axios from "axios";
// import qs from "qs";
// import jwt from "jwt-decode";

// function Register() {
//   const emailRef = useRef("");
//   const passwordRef = useRef("");
//   const userNameRef = useRef("");
//   const register = (e) => {
//     e.preventDefault();
//     const data = {
//       name: userNameRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };

//     axios
//       .post("/users/", qs.stringify(data), {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((res) =>
//         console.log({ userInfo: jwt(res.data.token), token: res.data.token })
//       );
//   };

//   return (
//     <>
//       <form onSubmit={register}>
//         <h3> Register User </h3>
//         <input placeholder="Name..." ref={userNameRef} />
//         <input placeholder="Email..." ref={emailRef} />
//         <input placeholder="Password..." ref={passwordRef} />

//         <button type="submit"> Create User</button>
//       </form>
//     </>
//   );
// }

// export default Register;
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Register() {
  const [getToken, setToken] = useState(null);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken !== null) {
      navigate("/");
    }
  }, [getToken, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/users/", qs.stringify(data), {
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
