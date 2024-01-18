import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import naudotojasClient from "../Services/naudotojasService";
import "./Styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [naudotojas, setNaudotojas] = useState(null);
  useEffect(() => {
    const fetchNaudotojas = async () => {
      try {
        const response = await naudotojasClient.getNaudotojas(
          "f2ba770b-4225-ff4d-b8bd-d9a5a91b19f4"
        ); // replace 'some-id' with actual id
        setNaudotojas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNaudotojas();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {naudotojas ? (
        <div className="profile-info">
          <img
            src={naudotojas.picture || "https://placekitten.com/200/200"}
            alt="Profile"
            className="profile-picture"
          />
          <div className="user-details">
            <p>
              <strong>Username:</strong> {naudotojas.username}
            </p>
            <p>
              <strong>Name:</strong> {naudotojas.name}
            </p>
            <p>
              <strong>LastName:</strong> {naudotojas.lastname}
            </p>
            <p>
              <strong>Phone:</strong> {naudotojas.phone}
            </p>
            <p>
              <strong>BirthDate:</strong> {naudotojas.birthDate}
            </p>
            <p>
              <strong>Email:</strong> {naudotojas.email}
            </p>
            <p>
              <strong>Role:</strong> {naudotojas.userType}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button
        className="edit-profile-button"
        onClick={() => navigate("/Redaguoti-Profili")}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
