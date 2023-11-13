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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Item from "./Pages/Item";

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
        <Route path="/Prekė" element={<Item />} />
      </Routes>
      {}
      <Link to="http://127.0.0.1:5500/Kilobitas-main/frontend/Diskusijos/forums.html">
        <button>Go to Forums</button>
      </Link>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
