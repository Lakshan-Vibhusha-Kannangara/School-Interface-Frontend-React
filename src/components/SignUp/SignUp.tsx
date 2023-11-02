import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import InputField from "../InputField/InputField";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signup-box">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="username"
          value={username}
          label="Username"
          onChange={handleInputChange}
          required={true}
        />

        <InputField
          type="email"
          name="email"
          value={email}
          label="Email"
          onChange={handleInputChange}
          required={true}
        />

        <InputField
          type="password"
          name="password"
          value={password}
          label="Password"
          onChange={handleInputChange}
          required={true}
        />

        <button type="submit"  style={{left:'30%' ,position:'relative'}}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign Up
        </button>
        <Link to="/login">Already have an account? Login</Link>
      </form>

    </div>
  );
}

export default SignUp;
