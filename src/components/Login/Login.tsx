import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import InputField from "../InputField/InputField";

function Login() {
  const [username, setUsername] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [token, setToken] = useState<string>(""); 
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleLogin = async () => {
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
  
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="justify-content-center" >
    <div className="col justify-content-center">
    <InputField
          type="text"
          name="username"
          value={username}
          label="Username"
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

   
        <div className="box" style={{position:'relative',left:'30%'}}>  <Link to="/student-register">   <h5 style={{color:'white'}}>Submit</h5></Link> </div>
        <Link to="/signup">Don't have an account? Login</Link>
    </div>
      </form>
    </div>
  );
}

export default Login;
