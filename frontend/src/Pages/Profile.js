import React, { useState, useEffect } from "react";

import "./Styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Replace with your actual fetch logic
      const response = await fetch("http://localhost:7259/api/user");
      const data = await response.json();

      setUser(data);
    };

    fetchUser();
  }, []);
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div className="profile-info">
          <img
            src={user.picture || "https://placekitten.com/200/200"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="user-details">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
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
