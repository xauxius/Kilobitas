import React, { useState } from "react";
import "./Styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { username, password });
  };
  const handleLoginWithGoogle = () => {
    console.log("Logging in with Google");
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
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="google-login-container">
        <button type="button" onClick={handleLoginWithGoogle}>
          <img
            src="/Images/Google__G__Logo.svg.png"
            alt="Google Logo"
            className="google-logo"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

function LoginPage() {
  return (
    <div className="Login">
      <Login />
    </div>
  );
}

export default LoginPage;
