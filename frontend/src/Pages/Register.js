import React, { useState } from "react";
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Register in with:", { username, password });
  };
  const handleContinueWithGoogle = () => {
    console.log("Continue with Google");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Re-enter Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <div className="google-login-container">
        <button type="button" onClick={handleContinueWithGoogle}>
          <img src="/Images/Google__G__Logo.svg.png" className="google-logo" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

function RegisterPage() {
  return (
    <div className="Login">
      <Register />
    </div>
  );
}

export default RegisterPage;
