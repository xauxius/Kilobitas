import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "./Styles/Login.css";
const clientId =
  "819508509253-5u3c94a6icjq6qfdpg3npbrrf70176l2.apps.googleusercontent.com";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log("Logged in successfully");
      // Here you can handle a successful login. For example, you can redirect the user to another page.
    } else {
      console.log("Login failed");
      // Here you can handle a failed login. For example, you can show an error message.
    }
  };
  const responseGoogle = (response) => {
    console.log(response);
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
        <GoogleLogin
          clientId={clientId}
          buttonText="Continue with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
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
