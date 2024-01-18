import React, { useState, useEffect } from "react";
import naudotojasClient from "../Services/naudotojasService";
import "./Styles/Profile.css";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [naudotojas, setNaudotojas] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNaudotojas = async () => {
      try {
        const response = await naudotojasClient.getNaudotojas(
          "f2ba770b-4225-ff4d-b8bd-d9a5a91b19f4"
        );
        setNaudotojas(response.data);
        setUsername(response.data.username);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNaudotojas();
  }, []);

  const saveProfile = async () => {
    try {
      // Fetch the existing user data
      const existingUserData = naudotojas;

      // Create a new Naudotojas object with the updated username and phone
      const updatedNaudotojas = { ...existingUserData, username, phone };

      // Update the user using the new object
      await naudotojasClient.updateNaudotojas(
        "f2ba770b-4225-ff4d-b8bd-d9a5a91b19f4",
        updatedNaudotojas
      );

      // Fetch the updated data again
      const response = await naudotojasClient.getNaudotojas(
        "f2ba770b-4225-ff4d-b8bd-d9a5a91b19f4"
      );
      setNaudotojas(response.data);
      setUsername(response.data.username);
      setPhone(response.data.phone);

      navigate("/Profilis");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

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
              <strong>Username:</strong>{" "}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p>
              <strong>Name:</strong> {naudotojas.name}
            </p>
            <p>
              <strong>LastName:</strong> {naudotojas.lastname}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
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
      <button className="edit-profile-button" onClick={saveProfile}>
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
