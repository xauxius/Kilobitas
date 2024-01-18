import React, { useState } from "react";
import userClient from "../Services/userService";

import "./Styles/Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await userClient.post("/auth/register", {
        username,
        password,
        email,
        Role: "Naudotojas", // Default role for new users
        Blocked: false, // Default blocked status for new users
        Image: "https://placekitten.com/200/200", // Default image for new users
      });

      if (response.status === 200) {
        // Registration successful, handle success (e.g., redirect to login page)
        console.log("Registration successful!");
        alert("Registration successful!"); // Show success message
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field
        setEmail(""); // Clear email field
        setConfirmPassword(""); // Clear confirm password field
      } else {
        // Registration failed, handle error
        setError(response.data.message); // Assuming your API sends error messages in the response
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
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
        <label>
          Re-enter Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
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
