import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "./Styles/Login.css";
import { useNavigate } from "react-router-dom";

const clientId =
  "819508509253-5u3c94a6icjq6qfdpg3npbrrf70176l2.apps.googleusercontent.com";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      navigate("/"); // Redirect to home page
    } else {
      console.log("Login failed");
      // Here you can handle a failed login. For example, you can show an error message.
    }
  };
  const responseGoogle = (response) => {
    if (response?.error) {
      if (response.error === "popup_closed_by_user") {
        console.log("Google login popup closed by the user");
        // Redirect to the main page or handle it as needed
        navigate("/");
      } else {
        console.error("Google login failed:", response.error);
        // Handle other specific Google login errors here
      }
    } else if (response?.tokenId) {
      console.log("Google login successful");
      // Redirect to main page on successful login
      navigate("/");
    }
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
