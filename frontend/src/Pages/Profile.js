// src/pages/ProfilePage.js

import React from "react";
import "./Styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <img
          src={"https://placekitten.com/200/200"}
          alt="Profile"
          className="profile-picture"
        />
        <div className="user-details">
          <p>
            <strong>Name:</strong> Jonas Jonauskas
          </p>
          <p>
            <strong>Email:</strong> Jonas.Jonulis@gmail.com
          </p>
          <p>
            <strong>Role:</strong> User
          </p>
        </div>
      </div>
      <button
        className="edit-profile-button"
        onClick={() => console.log("Edit Profile clicked")}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
