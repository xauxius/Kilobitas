import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import Catalog from "./Pages/Item/Catalog";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import ItemAdministration from "./Pages/Item/ItemAdministration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Item from "./Pages/Item/Item";
import ItemEdit from "./Pages/Item/ItemEdit";
import ItemCreation from "./Pages/Item/ItemCreation";
import Order from "./Pages/order";
import Layout from "./Components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
localStorage.setItem('naudotojas', '731a5d96-75c1-4044-9418-b72e03396625');
root.render(
  <React.StrictMode>
    <Router>
    <Layout>
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
            <Route path="/order" element={<Order />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
