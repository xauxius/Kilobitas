import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Catalog from "./Pages/Catalog";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import ItemAdministration from "./Pages/ItemAdministration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Item from "./Pages/Item";
import ItemEdit from "./Pages/ItemEdit";
import ItemCreation from "./Pages/ItemCreation";
import DiskusijosPage from "./Pages/DiskusijosPage";
import DiscussionForm from "./Components/DiscussionForm";

const handleFormSubmit = async (formData) => {
    try {
        const response = await fetch('http://localhost:7259/GetDiscussions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Do something with the new discussion data
        // You might want to redirect the user to the list of discussions or to the newly created discussion
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Katalogas" element={<Catalog />} />
        <Route path="/Krepšelis" element={<Cart />} />
        <Route path="/Profilis" element={<Profile />} />
        <Route path="/Administracinis" element={<Admin />} />
        <Route path="/Registruotis" element={<Register />} />
        <Route path="/Prisijungti" element={<Login />} />
        <Route path="/Prekė/:id" element={<Item />} />
        <Route path="/Prekių-administravimas" element={<ItemAdministration />} />
        <Route path="/Prekės-kūrimas" element={<ItemCreation />} />
        <Route path="/Prekės-redagavimas/:id" element={<ItemEdit />} />
        <Route path="/Diskusijos" element={<DiskusijosPage />} />
        <Route path="/new-discussion" element={<DiscussionForm onSubmit={handleFormSubmit} />} />


      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
